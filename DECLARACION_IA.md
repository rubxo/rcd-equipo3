# Declaración Obligatoria de Uso de Inteligencia Artificial (Sección 4.6)

## 1. Herramientas de IA Consultadas
* **ChatGPT / OpenAI Codex (con integración MCP de Cisco Packet Tracer)**
* **Google Gemini (Asistente de programación y documentación en el entorno de trabajo local)**



## 3. Validación de la Veracidad y Aplicación a la Solución Alcanzada
El equipo contrastó las propuestas seleccionadas en las pruebas históricas directamente dentro de **Cisco Packet Tracer 9.0.1**:

1. **Validación de Enrutamiento y Redistribución:** Se verificó con `show ip route` y pruebas de `ping` bidireccional entre `PC4` (Bogotá) y `PC7` (Madrid) que el ajuste de distancia administrativa (`distance ospf external 175` en `ISP_FL`, `ISP_BOG` e `ISP_ESP`) eliminó el bucle de redistribución entre `EIGRP 3` y `OSPF 3`, y que la ruta estática específica hacia `10.3.81.0/24` en `R2_ESP` resolvió el retorno fuera del bloque sumarizado `/17`.
2. **Validación de Sintaxis IOS y Pruebas SNMP en MIB Browser:** Durante la configuración final en el CLI de `SW1_BOG`, `MLSW_MAD` y `R2_ESP`, el equipo detectó que el IOS simulado del switch 2960 rechazaba el parámetro de ACL al final del comando `snmp-server community RCD3-RO RO 80` (`% Invalid input detected at '^' marker`). Se corrigió aplicando la sintaxis estándar soportada (`snmp-server community RCD3-RO RO` y `snmp-server community RCD3-RW RW`) y delegando el filtrado por origen a la ACL extendida `SNMP-INTERNAL`. Posteriormente, se comprobó en el **MIB Browser**:
   * Lectura exitosa (`GET`) de `sysName.0` (`R1_BOG`) desde `PC4` (`evidencias/snmp_get_pc4.jpg`).
   * Escritura exitosa (`SET`) de `sysLocation.0` (`Sede_Bogota_RCD3`) desde `PC4` (`evidencias/snmp_set_pc4.jpg`).
   * Timeout compatible con el bloqueo configurado (`SNMP request timed out`) al consultar desde `PC1` en la VLAN 35 Guest (`evidencias/snmp_timeout_bloqueado_pc1.jpg`).
3. **Validación en Tiempo Real del Employee Tracker:** Se ejecutaron en orden las aplicaciones JavaScript en `PC7` (`RCD Dashboard`), `Tracker_Server` (`RCD Tracker`) y `PC4` (`RCD Sender`), verificando el envío de tramas TCP por el puerto `5000`, la respuesta `ACK`, el disparo de la alerta `CAMBIO_BRUSCO` en la secuencia 4, el disparo de la alerta `ZONA_RESTRINGIDA` al superar los 60 segundos continuos en la coordenada `(90,90)` y la recepción en el Dashboard de `PC7` por el puerto `5001`.


## 4. Auditoría del 8 de noviembre

**Herramientas.** El equipo utilizó ChatGPT para diagnosticar Bluetooth, sockets TCP, SLAAC, SNMP e IPsec y para organizar las evidencias.

**Registro de consultas.** [Conversación de auditoría compartida por el equipo](https://chatgpt.com/share/6af11005-fd58-83e9-b77f-858093f84483). Las consultas históricas anteriores permanecen en la sección 2. La conversación de auditoría se referencia con la URL facilitada por el equipo.

| Asistencia | Comprobación y aplicación |
|---|---|
| Recepción Bluetooth | Se observó el mensaje emitido por el beacon en la consola de PC4. El equipo reportó que la propuesta inicial con `BluetoothService.connect()` era incompatible y usó envío mediante `BluetoothService.send()` y recepción por evento. |
| Relay TCP y alertas | Se contrastaron el ACK de Tracker_Server y los registros independientes de PC7. La reapertura y el arranque ordenado restablecieron el flujo. Los intentos con `clear crypto` no resolvieron el problema según el informe del equipo. |
| SLAAC e IPsec | Se cotejó la configuración automática de PC4 y la conectividad IPv6 reportada con los contadores ESP del selector IPv4. El alcance del cifrado del protocolo 41 sigue abierto. |
| SNMP | Se distinguió el GET/SET a R2_ESP del timeout directo al switch multicapa y se conservó el diagnóstico de la PDU. |
| Cierre documental | Codex cotejó los archivos con el manifiesto del ZIP y revisó la sintaxis de los cuatro JavaScript y las rutas de las evidencias. La correspondencia exacta con Programming requiere comparación directa en el simulador. |

[Evidencias de validación](wiki/EVIDENCIAS_VALIDACION_2026-11-08.md) · [Transcripciones y alcance](wiki/CIERRE_FUNCIONAL_2026-11-08.md)
