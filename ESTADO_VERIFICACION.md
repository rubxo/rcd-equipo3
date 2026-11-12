> **Nota histórica:** este estado representa verificaciones anteriores a la integración BLE final. Consulte [ESTADO_FINAL_2026-11-08.md](ESTADO_FINAL_2026-11-08.md) para resultados posteriores y reservas explícitas.

# Estado de Verificación Final — 7 de noviembre de 2026

## 1. Resumen de Pruebas Verificadas en Cisco Packet Tracer 9.0.1

| Prueba / Requerimiento | Resultado Observado y Evidencia | Estado |
|---|---|---|
| **Inventario y Topología** | 32 dispositivos y 32 enlaces (`Proyecto_Final_RCD_Equipo3.pkt` / `Proyecto_FINAL.pkt`) | ✅ Verificado |
| **Salud Física y Lógica** | 0 enlaces caídos, 0 direcciones IPv4 duplicadas (`evidencias/final_cierre_salud.txt`) | ✅ Verificado |
| **WAN IPv4 (`EIGRP 3` / `OSPF 3`)** | 7 enlaces `/30`, redistribución en `ISP_FL` con `distance ospf external 175`, ping `R1`$\leftrightarrow$`R2` 5/5 | ✅ Verificado |
| **Conectividad Inter-Sede (`PC4` $\leftrightarrow$ `PC7`)** | 4/4 respuestas en ambos sentidos con ruta específica `10.3.81.0/24` en `R2_ESP` | ✅ Verificado |
| **Túnel IPv6 (`Tunnel0`) y `OSPFv3`** | Vecindades `FULL` en `Tunnel0` y tránsito `R2_ESP`–`MLSW_MAD`; ping `PC7`$\rightarrow$`Web_Server` IPv6 4/4 | ✅ Verificado |
| **VPN `IPsec` (`AES-256 / SHA-1`)** | Asociación `ESP` activa entre `86.106.79.1` y `86.106.79.26`; incremento de `#pkts encaps/decaps` | ✅ Verificado |
| **Servicios DMZ (`DNS` y `Web`)** | `nslookup mvydjdr.net` resuelve `10.3.10.80` (`A`) y `2001:1200:EC13:10::80` (`AAAA`); HTML personalizado | ✅ Verificado |
| **Matriz ACL Web (`WEB-DMZ`)** | Guest (`VLAN 35`): permite HTTP 80 y bloquea HTTPS 443 · Internal (`VLAN 80`): permite HTTPS 443 y bloquea HTTP 80 | ✅ Verificado |
| **Gestión `SNMP GET` (Internal VLAN 80)**| `PC4` (`10.3.80.14`) $\rightarrow$ `R1_BOG` (`10.3.80.1`): `GET sysName.0` devuelve `R1_BOG` (`evidencias/snmp_get_pc4.jpg`) | ✅ Verificado |
| **Gestión `SNMP SET` (Internal VLAN 80)**| `PC4` $\rightarrow$ `R1_BOG`: `SET sysLocation.0` actualiza a `Sede_Bogota_RCD3` (`evidencias/snmp_set_pc4.jpg`) | ✅ Verificado |
| **Bloqueo `SNMP` (Guest VLAN 35)** | `PC1` (`10.3.35.11`) $\rightarrow$ `R1_BOG`: bloqueado por `SNMP-INTERNAL` (`SNMP request timed out`, `evidencias/snmp_timeout_bloqueado_pc1.jpg`) | ✅ Verificado |
| **Employee Tracker (`PC4` $\rightarrow$ `Server` $\rightarrow$ `PC7`)** | Envío TCP `5000`, `ACK`, reenvío TCP `5001` a `PC7`, alertas `CAMBIO_BRUSCO` (sec. 4) y `ZONA_RESTRINGIDA` ($\ge 60\text{ s}$) (`evidencias/tracker_*.jpg`) | ✅ Verificado |
| **Configuraciones Exportadas (`.txt`)** | 13 archivos `configuraciones/*_running.txt` actualizados incluyendo las comunidades SNMP en `SW1_BOG`, `R2_ESP` y `MLSW_MAD` | ✅ Verificado |
| **Documentación Wiki, Actas y Declaración IA**| `wiki/README.md`, `actas/ACTA_01.md`, `actas/MATRIZ_CONTRIBUCIONES.md` y `DECLARACION_IA.md` completos | ✅ Verificado |
