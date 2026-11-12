# Evidencias de validación del 10 de noviembre de 2026

## Origen y procedimiento

Repositorio solicitado [YeisonD6/rcd-equipo3](https://github.com/YeisonD6/rcd-equipo3). Commit descargado `496b854d92cc93a61e9839dcc1413ae44e6e9be9`, fechado el 8 de noviembre de 2026 a las 20:11:04 -05:00. Archivo de origen `Proyecto_RCD_Final.pkt`, 236470 bytes.

SHA-256 de la copia extraída directamente del commit y comprobada al cierre `88f9c1db62a63d8a099c6921d10f8322506e1b26955ad7d2b5f0b3a47fcd8285`.

Todas las horas de las tablas son del 10 de noviembre de 2026, zona America/Bogota, UTC−05:00. Corresponden a la escritura de cada captura o exportación.

Las imágenes se tomaron directamente de ventanas de dispositivos, ventanas PDU o del panel de simulación de Packet Tracer mediante captura X11, en PNG a resolución nativa. Se ajustó el tamaño de algunas ventanas para mostrar sus campos completos. Los PNG conservan el resultado directo de la captura. El panel flotante permitió aislar la Event List del resto de la pantalla.

El MCP de Packet Tracer no tenía canal activo en esta sesión. Se utilizó la interfaz real de la aplicación para ejecutar las pruebas y leer las consolas. Las operaciones IOS fueron enable y comandos show. Los programas se ejecutaron desde Programming y el único cambio de valor de prueba fue el Set SNMP solicitado.

## Capturas solicitadas

| Archivo | Dispositivo o panel | Hora | Qué se ve |
|---|---|---|---|
| [a1_beacon_emitiendo.png](a1_beacon_emitiendo.png) | Beacon_Employee | 22:12:54 | Programming en Realtime. Consola con BEACON TX, secuencia, timestamp, coordenadas y actividad. |
| [a2_pc4_ble_rx_tcp_tx_ack.png](a2_pc4_ble_rx_tcp_tx_ack.png) | PC4 | 22:13:13 | Programming en Realtime. BLE RECIBIDO, BLE RX, TCP TX y ACK de aplicación recibidos. |
| [a3_server_cambio_brusco.png](a3_server_cambio_brusco.png) | Tracker_Server | 22:13:29 | CAMBIO_BRUSCO en secuencia 4. Se ven recepción TCP y estado de dashboard 3. |
| [a4_server_zona_restringida.png](a4_server_zona_restringida.png) | Tracker_Server | 22:13:37 | ZONA_RESTRINGIDA con zona superior a 60 segundos continuos y dashboard conectado. |
| [a5_pc7_dashboard_alertas.png](a5_pc7_dashboard_alertas.png) | PC7 | 22:14:30 | ULTIMO, HISTORIAL CORTO y alertas CAMBIO_BRUSCO en la consola de Programming. |
| [b1_filtro_tcp.png](b1_filtro_tcp.png) | Simulation Panel | 21:57:40 | Filtro visible únicamente TCP y Event List. Captura de la primera apertura. |
| [b2_pdu_pc4_a_server_osi.png](b2_pdu_pc4_a_server_osi.png) | PC4 | 21:58:01 | OSI Model. Origen PC4, destino 10.3.10.50 y puerto TCP destino 5000. |
| [b3_pdu_pc4_a_server_outbound.png](b3_pdu_pc4_a_server_outbound.png) | PC4 | 21:58:02 | Misma PDU que b2, Outbound PDU Details. IPv4 10.3.80.14→10.3.10.50, TCP 1025→5000. |
| [b4_pdu_en_r1_bog.png](b4_pdu_en_r1_bog.png) | R1_BOG | 21:58:16 | OSI Model del flujo PC4→Tracker. Recepción por FastEthernet0/0 y salida por FastEthernet0/1. |
| [b5_pdu_server_a_pc7_osi.png](b5_pdu_server_a_pc7_osi.png) | Tracker_Server | 22:16:20 | OSI Model. IPv4 10.3.10.50→10.3.81.17 y TCP 1025→5001. |
| [b6_pdu_en_r1_bog_esp.png](b6_pdu_en_r1_bog_esp.png) | R1_BOG | 22:16:38 | Outbound PDU Details del reenvío a PC7. HDLC, IPv4 exterior 86.106.79.1→86.106.79.26, PRO 0x32 y ESP Header con SPI y secuencia. |
| [b7_pdu_llega_pc7.png](b7_pdu_llega_pc7.png) | PC7 | 22:17:05 | OSI Model del mismo flujo. Puerto destino TCP 5001 y decisión de capa 7 que indica recepción del mensaje TCP. |
| [b8_ack_server_a_pc4.png](b8_ack_server_a_pc4.png) | Tracker_Server | 22:15:50 | OSI Model del retorno a PC4. IPv4 10.3.10.50→10.3.80.14 y TCP 5000→1025. Los ACK de aplicación también se observan en a2. |
| [b9_event_list_completa.png](b9_event_list_completa.png) | Simulation Panel | 22:17:35 | Event List completa del intercambio capturado, desde 1.602 hasta 1.701 s. Incluye PC4→Tracker, retorno a PC4, Tracker→PC7 y retorno PC7→Tracker. Panel ampliado a 1100×1060 antes de capturarlo. |
| [c1_pc4_get_sysname_r1.png](c1_pc4_get_sysname_r1.png) | PC4 / R1_BOG | 21:54:10 | MIB Browser, Get de .1.3.6.1.2.1.1.5.0 contra 10.3.80.1. Respuesta R1_BOG, OctetString. |
| [c2_pc4_set_syslocation_r1.png](c2_pc4_set_syslocation_r1.png) | PC4 / R1_BOG | 21:55:21 | MIB Browser, Set de .1.3.6.1.2.1.1.6.0 aceptado con RCD3_VALIDACION_2026-11-10. |
| [c3_pc4_get_syslocation_verificacion.png](c3_pc4_get_syslocation_verificacion.png) | PC4 / R1_BOG | 21:55:38 | MIB Browser, operación Get posterior al Set. Devuelve RCD3_VALIDACION_2026-11-10. |
| [c4_pc1_get_timeout.png](c4_pc1_get_timeout.png) | PC1 | 21:56:42 | Diálogo nativo SNMP command Error con SNMP request timed out. Intento Get de sysName.0 contra 10.3.80.1 desde Guest. |
| [d1_filtro_snmp.png](d1_filtro_snmp.png) | Simulation Panel | 22:01:56 | Filtro visible únicamente SNMP y Event List del Get de PC4 con ida y vuelta a R1. |
| [d2_get_request_pc4.png](d2_get_request_pc4.png) | PC4 | 22:02:29 | Outbound PDU Details de la solicitud generada mediante Get de sysName.0. IPv4 hacia 10.3.80.1, UDP destino 161 y bloque SNMP. Limitación de campos descrita abajo. |
| [d3_get_response_r1.png](d3_get_response_r1.png) | R1_BOG | 22:02:53 | Outbound PDU Details de la respuesta a ese Get. IPv4 10.3.80.1→10.3.80.14, UDP 161 y bloque SNMP. |
| [d4_set_request_pc4.png](d4_set_request_pc4.png) | PC4 | 22:03:34 | Outbound PDU Details de la solicitud generada mediante Set de sysLocation.0 con el valor de laboratorio. IPv4 hacia R1, UDP destino 161 y bloque SNMP. |
| [d5_set_response_r1.png](d5_set_response_r1.png) | R1_BOG | 22:03:45 | Outbound PDU Details de la respuesta al Set, IPv4 de R1 hacia PC4 y bloque UDP/SNMP. |
| [d6_pc1_descartada_r1.png](d6_pc1_descartada_r1.png) | R1_BOG | 22:06:28 | OSI Model, capa 3. Origen 10.3.35.11 y destino 10.3.80.1. Motivo explícito de descarte por deny udp any any eq snmp en SNMP-INTERNAL. |

## Exportaciones de texto

Las salidas IOS se copiaron de las consolas vivas, avanzando toda la paginación. Se verificó el comienzo de show running-config, el marcador end y el retorno al prompt en los 13 archivos. Las marcas de paginación se retiraron al unir las páginas copiadas.

| Archivo | Dispositivo | Hora | Qué se ve |
|---|---|---|---|
| [R1_BOG_running.txt](../../configuraciones/2026-11-10/R1_BOG_running.txt) | R1_BOG | 22:18:55 | Salida completa de show running-config. |
| [R2_ESP_running.txt](../../configuraciones/2026-11-10/R2_ESP_running.txt) | R2_ESP | 21:51:31 | Salida completa de show running-config. |
| [ISP_BOG_running.txt](../../configuraciones/2026-11-10/ISP_BOG_running.txt) | ISP_BOG | 21:51:38 | Salida completa de show running-config. |
| [ISP_NET_running.txt](../../configuraciones/2026-11-10/ISP_NET_running.txt) | ISP_NET | 21:51:45 | Salida completa de show running-config. |
| [ISP_FL_running.txt](../../configuraciones/2026-11-10/ISP_FL_running.txt) | ISP_FL | 21:51:52 | Salida completa de show running-config. |
| [ISP_ESP_running.txt](../../configuraciones/2026-11-10/ISP_ESP_running.txt) | ISP_ESP | 21:52:00 | Salida completa de show running-config. |
| [SW1_BOG_running.txt](../../configuraciones/2026-11-10/SW1_BOG_running.txt) | SW1_BOG | 21:52:37 | Salida completa de show running-config. |
| [SW2_BOG_running.txt](../../configuraciones/2026-11-10/SW2_BOG_running.txt) | SW2_BOG | 21:52:56 | Salida completa de show running-config. |
| [SW3_BOG_running.txt](../../configuraciones/2026-11-10/SW3_BOG_running.txt) | SW3_BOG | 21:53:04 | Salida completa de show running-config. |
| [SW_DMZ_running.txt](../../configuraciones/2026-11-10/SW_DMZ_running.txt) | SW_DMZ | 21:52:08 | Salida completa de show running-config. |
| [SW4_MAD_running.txt](../../configuraciones/2026-11-10/SW4_MAD_running.txt) | SW4_MAD | 21:53:11 | Salida completa de show running-config. |
| [SW5_MAD_running.txt](../../configuraciones/2026-11-10/SW5_MAD_running.txt) | SW5_MAD | 21:53:19 | Salida completa de show running-config. |
| [MLSW_MAD_running.txt](../../configuraciones/2026-11-10/MLSW_MAD_running.txt) | MLSW_MAD | 21:52:48 | Salida completa de show running-config. |
| [e1_r1_ipsec_sa.txt](e1_r1_ipsec_sa.txt) | R1_BOG | 22:19:34 | Salida completa de show crypto ipsec sa después de observar el flujo a PC7. |

## Incidencias conservadas y límites

1. En la primera apertura detuve PC7 involuntariamente durante el arranque y después lo reanudé. El servidor quedó mostrando DASHBOARD STATE=0 y PC7 carecía de registros. Se conservó la captura de ese intento. Para verificar el procedimiento se extrajo una segunda copia limpia del mismo commit y se arrancaron una sola vez PC7, Tracker_Server, PC4 y Beacon_Employee, en ese orden. La segunda ejecución mostró dashboard conectado, registros y alertas. Las cinco capturas A, las capturas B5 a B9 y las últimas exportaciones de R1 corresponden a esa segunda apertura. B1 a B4, C, D y las exportaciones de los otros doce equipos corresponden a la primera apertura.
2. Al intentar reabrir desde la primera sesión, Packet Tracer guardó involuntariamente el estado de la copia temporal de trabajo en /tmp/rcd-evidencias-20261110-yeison/Proyecto_RCD_Final.pkt. Esa copia temporal pasó a SHA-256 97388a306410239afc8ad5ce0d15ad9a870beeb9f29d8cec87b54432d059c3b0. Las evidencias de esa primera apertura se habían tomado antes de ese guardado. Se preservó dicha copia temporal y se extrajo el blob original a /tmp/rcd-validacion-limpia-20261110/Proyecto_RCD_Final.pkt para la segunda apertura. El repositorio remoto y los archivos originales del usuario se preservaron. El SHA-256 de la segunda copia al cierre coincide con el archivo del commit.
3. Hubo un intento SNMP de simulación con un OID concatenado accidentalmente en el campo del MIB Browser. Devolvió No such name error. Se conserva como incidencia de entrada de prueba. Se repitió la solicitud con el OID correcto, sin cambiar configuración de red.
4. Packet Tracer deja vacíos varios campos del bloque SNMP de Outbound PDU Details, incluidos PDU Type, Request Identifier, Error Status y variable bindings. En D2–D5 se conservan esos campos tal como aparecen. La clasificación Get/Set se basa en la operación ejecutada en MIB Browser y su secuencia de solicitud/respuesta. La comunidad que muestra el simulador en esos detalles es RCD3-RW, incluso en el intercambio generado desde Get. Los puertos y direcciones visibles se conservaron sin alteración.
5. El Set autorizado utilizó el OID sysLocation.0, tipo OctetString y valor RCD3_VALIDACION_2026-11-10. C2 y C3 documentan su aceptación y lectura en la primera apertura. Al abrir de nuevo la copia de origen, el estado volvió al contenido de ese archivo.
6. B6 muestra ESP para el flujo IPv4 del Tracker hacia PC7. El destino de aplicación es 10.3.81.17 y las direcciones exteriores son 86.106.79.1 y 86.106.79.26. El alcance de esa evidencia es ese flujo observado.
7. La Event List de B9 incluye copias del flooding hacia Web_Server y DNS_Server además del recorrido del Tracker. Se conservaron los eventos tal como los presenta Packet Tracer.

| Captura adicional de incidencia | Dispositivo | Hora | Qué se ve |
|---|---|---|---|
| [fallo_pc7_sin_registros.png](fallo_pc7_sin_registros.png) | PC7 | 22:07:30 | Primer intento interrumpido y reanudado. Consola sin ULTIMO ni historial recibido. |
| [fallo_snmp_sim_no_such_name.png](fallo_snmp_sim_no_such_name.png) | PC4 / MIB Browser | 22:01:11 | Diálogo de error del intento con OID concatenado accidentalmente. |

## Capturas faltantes

Se obtuvieron los 24 PNG solicitados con sus nombres exactos. Se incluyen además dos PNG de incidencias, las 13 exportaciones IOS y e1_r1_ipsec_sa.txt. Los límites de representación SNMP y las incidencias operativas se detallan arriba.

