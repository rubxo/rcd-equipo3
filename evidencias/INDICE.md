# Índice de Evidencias de Verificación — Equipo 3

[Validación del 8 de noviembre](../wiki/EVIDENCIAS_VALIDACION_2026-11-08.md) · [Cierre BLE/TCP](../wiki/CIERRE_FUNCIONAL_2026-11-08.md) · [Índice de capturas y hashes](../INDICE_CAPTURAS.csv)

Evidencia real capturada en Cisco Packet Tracer 9.0.1 (cortes del 2 y 7 de noviembre de 2026).

| Archivo en `evidencias/` | Descripción y Alcance de la Prueba |
|---|---|
| `final_topologia.png` | Captura general de la topología de 32 dispositivos y 32 enlaces en Packet Tracer. |
| `snmp_get_pc4.jpg` | **Prueba SNMP GET exitosa** desde `PC4` (VLAN 80 Internal Bogotá) hacia `R1_BOG` (`10.3.80.1`) obteniendo `sysName.0 = R1_BOG`. |
| `snmp_set_pc4.jpg` | **Prueba SNMP SET y confirmación GET exitosa** desde `PC4` hacia `R1_BOG` modificando `sysLocation.0 = Sede_Bogota_RCD3`. |
| `snmp_get_pc1_bloqueado.png` | Intento de consulta SNMP desde `PC1` (VLAN 35 Guest) sin respuesta en la tabla de resultados. |
| `snmp_timeout_bloqueado_pc1.jpg`| **Confirmación de bloqueo SNMP por ACL (`SNMP-INTERNAL`)** desde `PC1` (Guest) mostrando `SNMP Command Error: SNMP request timed out`. |
| `tracker_pc4_running.jpg` | Consola de `PC4` (`RCD Sender`) transmitiendo tramas cada segundo a `10.3.10.50:5000` y recibiendo `ACK|...|RECIBIDO`. |
| `tracker_server_running.jpg` | Consola de `Tracker_Server` (`RCD Tracker`) recibiendo telemetría, disparando `alerta=CAMBIO_BRUSCO` en secuencia 4 y contando tiempo en `(90,90)`. |
| `tracker_zona_restringida.jpg` | Consola de `Tracker_Server` disparando **`alerta=ZONA_RESTRINGIDA`** al superar 60 segundos continuos en la coordenada `(90,90)`. |
| `tracker_dashboard_pc7.jpg` | Consola de `PC7` en Madrid (`RCD Dashboard`, puerto TCP `5001`) mostrando el último registro en tiempo real, el historial corto y las alertas. |
| `final_matriz_acl.txt` | Verificación de las 8 combinaciones HTTP (80) y HTTPS (443) desde Guest e Internal de Bogotá y Madrid. |
| `final_web_clientes.txt` | Recuperación de la página HTML personalizada desde los clientes autorizados y resolución DNS `mvydjdr.net`. |
| `final_ipsec_antes.txt` / `final_ipsec_despues.txt` | Salida de `show crypto isakmp sa` y `show crypto ipsec sa` evidenciando el incremento de paquetes cifrados/descifrados (`ESP`). |
| `final_simulacion.txt` | Traza de 81 eventos en *Simulation Mode* detallando el recorrido por capas TCP/IP, 802.1Q, routing, ESP y entrega final. |
| `vlans_*.txt` | Estado real de las VLANs `35, 40, 80, 99` en los 7 switches de la topología. |
| `../configuraciones/*_running.txt`| Transcripciones completas de `show running-config` de los 13 equipos de red (routers y switches). |
