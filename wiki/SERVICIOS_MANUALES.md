# Operación y reproducción

Los servicios DNS, HTTP/HTTPS y los programas Tracker ya están cargados en el .pkt.

## Web y DNS

En DNS_Server > Services > DNS revisar mvydjdr.net y www.mvydjdr.net. En Web_Server > Services > HTTP revisar HTTP/HTTPS e index.html. La dirección IPv6 del Web es 2001:1200:EC13:10::80. La resolución A y AAAA se prueba con `nslookup mvydjdr.net`.

## Reiniciar Tracker

Detener los programas de prueba si están activos. Para la **versión BLE final**, iniciar primero RCD Dashboard en PC7, después RCD Tracker en Tracker_Server, luego RCD Bluetooth Test (puente BLE/TCP) en PC4 y por último RCD Beacon en Beacon_Employee. **No ejecutar simultáneamente el antiguo RCD Sender**. Observar el ACK de Tracker_Server, la recepción en PC7 y las dos alertas. Las secuencias pueden variar. Véase el [protocolo y procedencia de las fuentes](../tracker/PROTOCOLO.md).

## SNMP — pruebas realizadas y alcance

**Actualización 08/11/2026:** desde Bogotá PC4 hubo GET/SET a R1_BOG y bloqueo desde PC1. Desde Madrid PC7 se completó GET/SET sobre **R2_ESP (`10.3.200.1`)**, y PC5 invitado obtuvo timeout. La consulta directa desde PC7 a **MLSW_MAD (`10.3.81.1`)** continuó sin respuesta en las pruebas documentadas: NO se marca como aprobada. Ver [capturas y diagnóstico](EVIDENCIAS_VALIDACION_2026-11-08.md). Los pasos siguientes son receta de reproducción y NO resultados nuevos.


1. PC4 > Desktop > MIB Browser: agente R1, 10.3.80.1, versión v2c, RO=RCD3-RO y RW=RCD3-RW.
2. GET sysName.0, OID 1.3.6.1.2.1.1.5.0.
3. SET sysLocation.0, OID 1.3.6.1.2.1.1.6.0, tipo Octet String, valor BOG-RCD3.
4. Repetir GET para confirmar la escritura.
5. Desde PC7, usar R2_ESP (`10.3.200.1`) para contrastar los resultados de Madrid. Tratar una consulta a MLSW_MAD (`10.3.81.1`) como diagnóstico separado.
6. Repetir desde PC1 y PC5; UDP/161 debe bloquearse.
7. Capturar respuestas y decisiones ACL en Simulation Mode. Registrar resultado real en XLSX.

No marcar esta prueba aprobada si solo se observa la comunidad en running-config.
