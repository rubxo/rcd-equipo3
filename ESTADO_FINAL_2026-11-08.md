# Estado real de cierre — RCD Equipo 3 (08/11/2026)

**Archivo de entrega:** `Proyecto_RCD_Final.pkt`. Este reporte sustituye la conclusión global del estado histórico 07/11, sin borrar las evidencias de ese día.

| Punto | Estado | Evidencia |
|---|---|---|
| Topología, WAN y VLAN | Construido, comprobaciones previas | `configuraciones/`, `evidencias/` históricos |
| DNS/Web/ACL Web IPv4 e IPv6 | Validado en matriz de 16 casos | `wiki/EVIDENCIAS_VALIDACION_2026-11-08.md` |
| SNMP GET/SET Bogotá; Guest bloqueado | Probado anteriormente | `wiki/README.md`, `evidencias/snmp_*` |
| SNMP GET/SET Madrid a R2_ESP; PC5 Guest timeout | Probado | `wiki/EVIDENCIAS_VALIDACION_2026-11-08.md` |
| SNMP acceso directo a MLSW_MAD | No demostrado como operativo | Captura de timeout en carpeta diagnóstica |
| SLAAC/IPv6 y ping Web de 8 PCs | Conectividad confirmada en sesión | `evidencias/validacion_2026-11-08/05_tracker_bluetooth/ipv6_pc2_y_resumen_8pc.txt` |
| Employee Tracker BLE→PC4→Tracker→PC7 | Funciona tras reabrir simulador | `wiki/CIERRE_FUNCIONAL_2026-11-08.md` + transcripciones |
| `CAMBIO_BRUSCO` y `ZONA_RESTRINGIDA` | Ambas observadas | Logs de PC4 y Dashboard |
| VPN IPsec ESP IPv4 BOG↔MAD | SA entrada/salida activa y cifrado medido | `r1_ipsec_esp_activa.txt` |
| Protección IPsec del túnel IPv6 (protocolo 41) | No demostrada | Reservar la afirmación; no confundir con cifrado IPv4 |
| DMZ estrictamente IPv6 | No demostrado: Tracker usa IPv4 | Diferencia de diseño documentada |
| Coincidencia de exports de dispositivos con el `.pkt` final | Por verificar | Véase el [inventario de exportaciones](configuraciones/README.md) |
| Sustentación de 10 minutos | Pendiente de realizar | Preparar guion y participación de equipo |
| Entrega en Teams | Acción del equipo | El equipo debe registrar el repositorio o informe y las exportaciones vigentes en entradas separadas |

**Fecha límite del enunciado:** 10 de noviembre de 2026 a las 23:00. Sustentación en clase el 11 de noviembre de 2026 a las 09:00.
