# Actas de Reunión y Evaluación de Trabajo en Equipo — Equipo 3

**Proyecto:** Diseño e Implementación de una Red Empresarial (RCD 2026-2)  
**Integrantes:** Juan David Rubio · Yeison David Niño · Miguel Medina  
**Parámetro asignado:** $X = 3$ · **Dominio:** `mvydjdr.net`

---

## Acta de Reunión N.° 01 — Diseño Estructurado, Direccionamiento y Montaje Base

* **Fecha:** 28 de octubre de 2026
* **Hora y medio:** 18:00 – 20:30 · Reunión virtual (MS Teams / Discord) y repositorio compartido
* **Asistentes:** Juan David Rubio, Yeison David Niño, Miguel Medina (Asistencia 100%)
* **Objetivo:** Analizar el enunciado oficial del proyecto final ($X=3$), definir el esquema de direccionamiento IPv4/IPv6 y distribuir los módulos de implementación.

| Integrante | Rol Asignado | Tarea Acordada | Entregable / Evidencia | Estado |
|---|---|---|---|---|
| **Juan David Rubio** | Arquitecto LAN y Direccionamiento | Elaborar el subneteo VLSM `/30` para la WAN (`86.106.79.0/24`), prefijos IPv6 `/64` por VLAN (`35, 40, 80, 99`) y configurar el switching L2/L3 (`SW1`–`SW5`, `MLSW_MAD`). | `direccionamiento_y_rubrica.xlsx`, `vlans_*.txt` | ✅ Cumplido |
| **Yeison David Niño** | Especialista WAN, Routing e IPsec | Configurar los 6 routers `2811`, enrutamiento `EIGRP AS 3`, `OSPFv2 Proceso 3`, redistribución en `ISP_FL`, `Tunnel0` (`ipv6ip`), `OSPFv3` y VPN `IPsec`. | `R1_BOG_running.txt`, `R2_ESP_running.txt`, `ISP_*_running.txt` | ✅ Cumplido |
| **Miguel Medina** | Desarrollador de Servicios DMZ y Tracker | Configurar `DNS_Server` (`mvydjdr.net`), `Web_Server` (HTTP/HTTPS), ACL `WEB-DMZ` y programar los sockets TCP del **Employee Tracker** en JavaScript. | `tracker/pt_*.js`, `web/index.html`, `final_matriz_acl.txt` | ✅ Cumplido |

* **Decisiones tomadas:** Se adoptó *Router-on-a-Stick* en Bogotá (`R1_BOG`) y *Multilayer Switching* con SVIs en Madrid (`MLSW_MAD` Catalyst 3650). Se definió la VLAN 99 como nativa y de gestión en ambas sedes.

---

## Acta de Reunión N.° 02 — Integración WAN/LAN, Resolución de Bucles y Pruebas de Servicios

* **Fecha:** 2 de noviembre de 2026
* **Hora y medio:** 15:00 – 19:00 · Sesión de integración y pruebas en Cisco Packet Tracer
* **Asistentes:** Juan David Rubio, Yeison David Niño, Miguel Medina (Asistencia 100%)
* **Objetivo:** Integrar el núcleo WAN con las dos sedes, validar conectividad extremo a extremo IPv4/IPv6 y probar el flujo del Employee Tracker.

* **Dificultades encontradas y soluciones aplicadas en equipo:**
  1. **Bucle de redistribución entre OSPF y EIGRP:** Se identificó que las rutas externas de EIGRP (`AD = 170`) redistribuidas en OSPF tomaban `AD = 110`, causando un bucle de retorno entre `ISP_BOG`, `ISP_FL` e `ISP_ESP`. Se solucionó ajustando `distance ospf external 175` en los routers OSPF.
  2. **Subred Internal de Madrid (`10.3.81.0/24`):** Al estar fuera del resumen `10.3.128.0/17`, se añadió una ruta estática específica en `R2_ESP` hacia `10.3.200.2` redistribuida en EIGRP.
  3. **Verificación de ACLs Web e IPsec:** Se comprobaron las 8 combinaciones HTTP/HTTPS desde clientes Guest e Internal de ambas sedes y la encapsulación ESP en `Simulation Mode`.

---

## Acta de Reunión N.° 03 — Cierre de SNMP (MIB Browser), Capturas Finales y Documentación Wiki

* **Fecha:** 7 de noviembre de 2026
* **Hora y medio:** 16:00 – 19:15 · Sesión de verificación final y cierre de entregables
* **Asistentes:** Juan David Rubio, Yeison David Niño, Miguel Medina (Asistencia 100%)
* **Objetivo:** Completar las comunidades SNMP en `SW1_BOG`, `R2_ESP` y `MLSW_MAD`, ejecutar las pruebas interactivas `GET`, `SET` y de bloqueo en el MIB Browser, capturar las alertas en vivo del Employee Tracker y consolidar la Wiki final.

| Actividad de Cierre Verificada | Responsable Principal | Evidencia Generada en el Repositorio | Resultado de Evaluación |
|---|---|---|---|
| Configuración de `snmp-server community RCD3-RO RO` y `RCD3-RW RW` en `SW1_BOG`, `R2_ESP` y `MLSW_MAD` | Juan David Rubio / Yeison David Niño | `SW1_BOG_running.txt`, `R2_ESP_running.txt`, `MLSW_MAD_running.txt`, `Proyecto_Final_RCD_Equipo3.pkt` | ✅ 100% Operativo |
| Pruebas MIB Browser: `GET` (`sysName.0`), `SET` (`sysLocation.0 = Sede_Bogota_RCD3`) desde `PC4` y bloqueo (`Request timed out`) desde `PC1` (Guest) | Juan David Rubio | `evidencias/snmp_get_pc4.jpg`, `evidencias/snmp_set_pc4.jpg`, `evidencias/snmp_timeout_bloqueado_pc1.jpg` | ✅ 100% Verificado |
| Ejecución en tiempo real del Employee Tracker (`PC4` $\rightarrow$ `Tracker_Server` $\rightarrow$ `PC7`) verificando `CAMBIO_BRUSCO` y `ZONA_RESTRINGIDA` ($\ge 60\text{ s}$) | Miguel Medina / Juan David Rubio | `evidencias/tracker_pc4_running.jpg`, `evidencias/tracker_server_running.jpg`, `evidencias/tracker_zona_restringida.jpg`, `evidencias/tracker_dashboard_pc7.jpg` | ✅ 100% Verificado |
| Consolidación de la Wiki en formato IEEE, tablas de direccionamiento y declaración de uso de IA | Todo el equipo | `wiki/README.md`, `DECLARACION_IA.md` | ✅ 100% Completado |

* **Evaluación de coordinación y comunicación del equipo:** Excelente comunicación asertiva, cumplimiento de plazos internos antes de la fecha límite del 10 de noviembre y validación cruzada de todas las pruebas en el simulador.
