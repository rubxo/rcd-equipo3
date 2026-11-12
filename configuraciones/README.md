# Exportaciones de configuración

## Routers y switches

Se conservan 13 archivos históricos `*_running.txt` de IOS y sus archivos de referencia `.txt`. El ZIP del 8 de noviembre no incluye exportaciones nuevas. Los scripts `*_mcp.js` son automatizaciones del montaje.

- [ISP_BOG](ISP_BOG_running.txt)
- [ISP_ESP](ISP_ESP_running.txt)
- [ISP_FL](ISP_FL_running.txt)
- [ISP_NET](ISP_NET_running.txt)
- [MLSW_MAD](MLSW_MAD_running.txt)
- [R1_BOG](R1_BOG_running.txt)
- [R2_ESP](R2_ESP_running.txt)
- [SW1_BOG](SW1_BOG_running.txt)
- [SW2_BOG](SW2_BOG_running.txt)
- [SW3_BOG](SW3_BOG_running.txt)
- [SW4_MAD](SW4_MAD_running.txt)
- [SW5_MAD](SW5_MAD_running.txt)
- [SW_DMZ](SW_DMZ_running.txt)

La excepción SNMP de retorno descrita en las [pruebas de Madrid](../wiki/EVIDENCIAS_VALIDACION_2026-11-08.md#3-snmp-v2-operaciones-y-acceso-en-madrid) figura en la documentación de la sesión. El volcado histórico de MLSW_MAD no contiene `SNMP-R2-RETURN`. Cotejar cada equipo con el montaje final antes de identificarlo como exportación de entrega.

## Servidores

El [inventario histórico de topología](../evidencias/final_exportacion.txt) registra las IP de Web_Server, DNS_Server, DHCP_Server y Tracker_Server. [Servicios](../evidencias/final_servicios.txt), [página Web](../web/index.html) y [código de referencia](../tracker/PROTOCOLO.md) complementan el registro histórico. Falta obtener del montaje final la configuración de IP y Services de los cuatro servidores (DNS A/AAAA, HTTP/HTTPS, pools DHCP y Programming del Tracker), mediante las opciones de exportación o capturas que admita Packet Tracer.

Para la entrada de configuraciones en Teams, abrir una copia de trabajo de [Proyecto_RCD_Final.pkt](../Proyecto_RCD_Final.pkt), exportar `show running-config` de los 13 equipos IOS y registrar la configuración de los servidores. Identificar la fecha y el SHA-256 del archivo de origen. Los archivos existentes incluyen parámetros y credenciales del laboratorio.
