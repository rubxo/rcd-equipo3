# Matriz de Roles y Registro de Contribuciones Verificables — Equipo 3

## 1. Distribución de Roles del Equipo

| Área Técnica / Académica | Responsable Principal | Apoyo y Revisión Cruzada |
|---|---|---|
| **Arquitectura LAN, Direccionamiento IPv4/IPv6, SNMP e Integración `.pkt`** | **Juan David Rubio** | Yeison David Niño y Miguel Medina |
| **Núcleo WAN (`/30`), Routing (`EIGRP`/`OSPF`), Túnel IPv6 e `IPsec`** | **Yeison David Niño** | Juan David Rubio |
| **Servicios DMZ (`DNS`, `Web`), ACLs y Aplicación TCP Employee Tracker** | **Miguel Medina** | Juan David Rubio y Yeison David Niño |
| **Documentación Wiki IEEE, Video Demostrativo y Sustentación** | **Los tres integrantes** | Participación equitativa y colaborativa |

---

## 2. Registro Detallado de Contribuciones Verificables

| Fecha | Integrante | Actividad Técnica / Documental Realizada | Archivo / Captura / Evidencia Verificable | Estado | Revisor |
|---|---|---|---|---|---|
| 28-oct a 02-nov-2026 | **Juan David Rubio** | Diseño del esquema de direccionamiento VLSM IPv4 e IPv6 ($X=3$), configuración de VLANs (`35, 40, 80, 99`), enlaces troncales `802.1Q`, `Rapid-PVST+`, *Router-on-a-Stick* en `R1_BOG` y SVIs en `MLSW_MAD`. | `direccionamiento_y_rubrica.xlsx`, `configuraciones/SW*_running.txt`, `configuraciones/MLSW_MAD_running.txt`, `evidencias/vlans_*.txt` | ✅ Completado | Yeison Niño |
| 28-oct a 02-nov-2026 | **Yeison David Niño** | Configuración de las 7 subredes `/30` WAN (`86.106.79.0/24`), `EIGRP AS 3`, `OSPFv2 Proceso 3`, redistribución mutua en `ISP_FL` con ajuste `distance ospf external 175`, `Tunnel0` (`ipv6ip`), `OSPFv3` y VPN `IPsec` (`AES-256/SHA`). | `configuraciones/ISP_*_running.txt`, `configuraciones/R1_BOG_running.txt`, `configuraciones/R2_ESP_running.txt`, `evidencias/final_ipsec_despues.txt` | ✅ Completado | Miguel Medina |
| 30-oct a 02-nov-2026 | **Miguel Medina** | Configuración de `DNS_Server` (`mvydjdr.net` A/AAAA), `Web_Server` (HTTP/HTTPS personalizado), listas de acceso `WEB-DMZ` y `WEB-DMZ4`, y programación de los 3 módulos JavaScript del **Employee Tracker** (`TCP 5000/5001`). | `tracker/pt_pc4.js`, `tracker/pt_server.js`, `tracker/pt_pc7.js`, `web/index.html`, `evidencias/final_matriz_acl.txt`, `evidencias/final_web_clientes.txt` | ✅ Completado | Juan David Rubio |
| 07-nov-2026 | **Juan David Rubio** | Completitud de comunidades `SNMP` (`RCD3-RO` / `RCD3-RW`) en `SW1_BOG`, `R2_ESP` y `MLSW_MAD`; ejecución y captura de pruebas `GET`, `SET` desde `PC4` y bloqueo por ACL (`Request timed out`) desde `PC1` en MIB Browser; actualización del `.pkt` final. | `Proyecto_Final_RCD_Equipo3.pkt`, `Proyecto_FINAL.pkt`, `evidencias/snmp_get_pc4.jpg`, `evidencias/snmp_set_pc4.jpg`, `evidencias/snmp_timeout_bloqueado_pc1.jpg` | ✅ Completado | Yeison Niño / Miguel Medina |
| 07-nov-2026 | **Miguel Medina & Juan David Rubio** | Ejecución en vivo y captura de las 3 consolas del **Employee Tracker** verificando el envío de tramas, `ACK`, alerta `CAMBIO_BRUSCO` (sec. 4), alerta `ZONA_RESTRINGIDA` ($\ge 60\text{ s}$) y recepción en el Dashboard de `PC7`. | `evidencias/tracker_pc4_running.jpg`, `evidencias/tracker_server_running.jpg`, `evidencias/tracker_zona_restringida.jpg`, `evidencias/tracker_dashboard_pc7.jpg` | ✅ Completado | Todo el equipo |
| 07-nov-2026 | **Juan David Rubio, Yeison David Niño y Miguel Medina** | Redacción y revisión final de la Wiki bajo normas IEEE, respuestas a las preguntas guía del procedimiento y análisis de resultados, actas de equipo y declaración de uso de IA. | `wiki/README.md`, `DECLARACION_IA.md`, `actas/ACTA_01.md` | ✅ Completado | Todo el equipo |
