# Cierre funcional y estado verificable — 8 de noviembre de 2026

> **Versión de referencia:** `Proyecto_RCD_Final.pkt` recibido del equipo el 8 de noviembre de 2026. El archivo es binario de Cisco Packet Tracer: este informe se basa en pruebas interactivas comunicadas por el equipo y no equivale a una auditoría interna automatizada de todas sus configuraciones. La página histórica `wiki/README.md` debe interpretarse junto con este cierre.

## 1. Arquitectura verificada del Employee Tracker

```text
Beacon_Employee (Thing, BluetoothService.send)
    -> PC4 (BluetoothService.onReceive; RCD Bluetooth Test)
    -> TCP IPv4 10.3.10.50:5000 (Tracker_Server)
    -> TCP IPv4 10.3.81.17:5001 (PC7 RCD Dashboard)
       + ACK al PC4 desde Tracker_Server
```

El beacon **genera lecturas sintéticas dentro de Packet Tracer** y las transmite por Bluetooth. No se presenta como un sensor físico de posición. PC4 ya **no inventa las coordenadas**: procesa el mensaje recibido por BLE y lo envía por TCP. El servidor valida `EMP-001|secuencia|timestamp|x|y|actividad`, genera `CAMBIO_BRUSCO` al cambiar de `En reposo` a `Alta actividad`, y `ZONA_RESTRINGIDA` si el punto permanece dentro de la región x≥80, y≥80 durante al menos 60 s. PC7 recibe el último evento y conserva historial rotativo de 10 registros.

**Pruebas positivas** (transcripciones entregadas por el equipo):

- Comunicación BLE efectiva: `BEACON|EMP-001|TEST-1` emitido en el beacon y `PC4 RECIBIO: BEACON|EMP-001|TEST-1` en PC4. [Registro BLE](../evidencias/validacion_2026-11-08/05_tracker_bluetooth/bluetooth_beacon_pc4.txt).
- Reenvío: `BLE RX` y `TCP TX` en PC4; respuesta `ACK|100|RECIBIDO|SIN_ALERTA`. [Registro PC4](../evidencias/validacion_2026-11-08/05_tracker_bluetooth/pc4_tcp_ack_cambio_brusco.txt).
- Alerta por actividad: `ACK|109|RECIBIDO|CAMBIO_BRUSCO` y `ACK|797|RECIBIDO|CAMBIO_BRUSCO`. [Registro PC4](../evidencias/validacion_2026-11-08/05_tracker_bluetooth/pc4_tcp_ack_cambio_brusco.txt).
- Alerta por zona: `ULTIMO: EMP-001|60|...|90|90|En movimiento|zona=97|alerta=ZONA_RESTRINGIDA`. [Registro Dashboard](../evidencias/validacion_2026-11-08/05_tracker_bluetooth/pc7_dashboard_zona_restringida.txt).

## 2. Incidencia resuelta durante la validación

El Tracker seguía devolviendo ACK, pero PC7 no recibía nuevos registros. En la consola del Tracker se observó `DEBUG DASHBOARD STATE=1`; el servicio TCP de PC7 respondía localmente, mientras que desde Tracker_Server una prueba TCP hacia el puerto 5001 terminaba por timeout. En R1_BOG, la simulación trataba ese flujo como tráfico interesante para IPsec. En un momento, el selector IPv4 `10.3.0.0/17` → `10.3.81.0/24` no mostraba asociaciones ESP activas. Se guardó, cerró completamente y reabrió Packet Tracer; se ejecutaron nuevamente los programas en el orden PC7 → Tracker → PC4 → Beacon. El flujo se recuperó.

**Causa raíz no demostrada.** El restablecimiento es consistente con un estado transitorio de sesión TCP o IPsec en Packet Tracer, pero no permite identificar cuál de los dos fue la causa única. Se debe evitar atribuir el fallo a PC7 o a un router como hecho definitivo.

## 3. Pruebas de red y seguridad

| Verificación | Resultado respaldado | Alcance / reserva |
|---|---|---|
| IPv6 | El equipo confirmó ping al Web IPv6 `2001:1200:EC13:10::80` desde 8 PCs; PC2 4/4, prefijo SLAAC `2001:1200:EA13:80::/64`, DNS IPv6 correcto | La persistencia tras reinicio de todos los clientes no está documentada individualmente |
| Web y ACL IPv4/IPv6 | Matriz de 16 pruebas en PC1, PC4, PC5 y PC7; invitados HTTP sí/HTTPS no, internos HTTPS sí/HTTP no | [Página con capturas](EVIDENCIAS_VALIDACION_2026-11-08.md) |
| SNMP Bogotá | GET, SET y denegación invitado documentados anteriormente | Véanse capturas históricas en `wiki/` y `evidencias/` |
| SNMP Madrid | PC7 → R2_ESP `10.3.200.1`: GET/SET correcto, PC5 invitado: timeout | PC7 → MLSW_MAD `10.3.81.1`: timeout pendiente de explicar; ver [capturas](EVIDENCIAS_VALIDACION_2026-11-08.md) |
| IPsec tráfico IPv4 | R1_BOG selector hacia `10.3.81.0/24`: `125` cifrados, `81` descifrados, SA ESP de entrada y salida `ACTIVE` | No demuestra protección del protocolo 41 ni de tráfico IPv6 encapsulado |
| Employee Tracker | Comunicación completa BLE + TCP, ACK, historial y dos alertas | Capturas históricas + transcripciones de la nueva ejecución |

[Registro resumido de IPv6](../evidencias/validacion_2026-11-08/05_tracker_bluetooth/ipv6_pc2_y_resumen_8pc.txt) · [IPsec IPv4](../evidencias/validacion_2026-11-08/05_tracker_bluetooth/r1_ipsec_esp_activa.txt)

## 4. Diferencias de alcance que deben declararse sin sobreprometer

1. **DMZ IPv6:** la infraestructura ofrece IPv6, pero el servicio Tracker actual utiliza también IPv4 (`10.3.10.50`). La afirmación «DMZ exclusivamente IPv6» no está demostrada por este flujo.
2. **IPsec / túnel IPv6:** se ha comprobado ESP para tráfico IPv4 hacia Madrid, no que el túnel `ipv6ip` (protocolo 41) esté cifrado.
3. **SNMP Madrid:** GET/SET exitoso contra `R2_ESP` y no contra el propio MLSW_MAD. La diferencia es relevante al describir el control de gestión.
4. **DHCPv6 central:** cliente PC2 muestra DNS/sufijo y dirección SLAAC, pero esto por sí solo no acredita relay DHCPv6 central.
5. **Persistencia:** existe evidencia de reapertura de Packet Tracer y del restablecimiento del Tracker. No equivale a una nueva captura de cada atributo IPv6 de los 8 PCs tras reiniciar.

Estas reservas no deshacen los resultados que sí se observaron; delimitan las conclusiones para que la sustentación sea técnicamente defendible. No se deben introducir modificaciones de red de último momento sin respaldo.

## 5. Fuentes de código y evidencias

- [Beacon JavaScript](../tracker/pt_beacon.js)
- [PC4 — puente BLE/TCP](../tracker/pt_pc4.js)
- [Tracker_Server](../tracker/pt_server.js)
- [PC7 — Dashboard](../tracker/pt_pc7.js)
- [Capturas IPv6, ACL y SNMP](EVIDENCIAS_VALIDACION_2026-11-08.md)
- [Transcripciones BLE/TCP/IPsec/IPv6](../evidencias/validacion_2026-11-08/05_tracker_bluetooth/)

Los cuatro JavaScript se reconstruyeron a partir de los códigos compartidos y ensayados por el equipo. Los logs respaldan el flujo, con diferencias de secuencias y mensajes respecto de las fuentes de referencia. **No fueron extraídos automáticamente del `.pkt` binario**; comparar con la pestaña Programming si se requiere certificar coincidencia carácter por carácter.

## 6. Observaciones para la entrega académica

La documentación completa de metodología, direcciones, procedimientos, resultados, retos, conclusiones, roles y referencias IEEE permanece en [el informe principal](README.md). Esta actualización añade evidencia verificable y corrige el estado de la implementación posterior. Debe enlazarse desde la portada del proyecto y revisarse antes de la entrega a Teams.

**IA utilizada:** ChatGPT fue empleado para diagnóstico iterativo de scripts y redes, preparación de documentación y clasificación de evidencias. Se validaron las propuestas en Packet Tracer con salidas de consola, respuestas de cliente TCP, registros SNMP, ping IPv6 e IPsec. Algunas propuestas iniciales (`BluetoothService.connect()` y comandos `clear crypto`) resultaron incompatibles o no resolvieron el problema y fueron sustituidas por pruebas funcionales; este historial es parte de la validación crítica. Mantener la declaración detallada en [la declaración de IA](../DECLARACION_IA.md), donde se registra el enlace compartido por el equipo y las comprobaciones aplicadas.

## Referencias

[1] Cisco Networking Academy, *Cisco Packet Tracer*, documentación de la herramienta de simulación y sus servicios de red.

[2] S. Thomson, T. Narten y T. Jinmei, “IPv6 Stateless Address Autoconfiguration,” RFC 4862, Sep. 2007. [En línea]. Disponible: https://www.rfc-editor.org/rfc/rfc4862

[3] S. Kent y K. Seo, “Security Architecture for the Internet Protocol,” RFC 4301, Dec. 2005. [En línea]. Disponible: https://www.rfc-editor.org/rfc/rfc4301

[4] J. Case, R. Mundy, D. Partain y B. Stewart, “Introduction to Version 3 of the Internet-standard Network Management Framework,” RFC 3410, Dec. 2002. [En línea]. Disponible: https://www.rfc-editor.org/rfc/rfc3410
