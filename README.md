# Proyecto Final RCD — Equipo 3 (`mvydjdr.net` · $X = 3$)

**Asignatura:** Redes y Comunicación de Datos (2026-2)  
**Integrantes:** Juan David Rubio · Yeison David Niño · Miguel Medina  
**Estado del Proyecto:** ✅ Flujo Employee Tracker probado · ⚠️ diferencias de diseño y documentación delimitadas (8 de noviembre de 2026)

---

## Estado de cierre 08/11/2026 — versión del equipo

**Archivo de entrega:** [`Proyecto_RCD_Final.pkt`](Proyecto_RCD_Final.pkt) (no sustituye las copias históricas del repositorio). El archivo funcional incorpora enlace Bluetooth real entre `Beacon_Employee` y PC4, reenvío TCP a Tracker_Server y Dashboard PC7, y ambas alertas demostradas por el equipo. No se debe confundir con una afirmación de conformidad total de todos los requisitos.

- [Informe técnico completo](wiki/README.md)
- [Cierre funcional y estado real de pruebas](wiki/CIERRE_FUNCIONAL_2026-11-08.md)
- [Evidencias con capturas del 08/11/2026](wiki/EVIDENCIAS_VALIDACION_2026-11-08.md)
- [Matriz final y reservas de cumplimiento](ESTADO_FINAL_2026-11-08.md)

### Limitaciones declaradas

Se comprobó IPsec ESP para tráfico **IPv4**, no el cifrado del túnel IPv6 (protocolo 41). El Tracker aún utiliza IPv4 en la DMZ. SNMP Madrid se validó contra `R2_ESP`, no contra `MLSW_MAD`. El relay DHCPv6 central y la persistencia de todos los atributos IPv6 tras reabrir quedan sin verificación individual.

---

## Informe técnico del proyecto

👉 **Ir al informe técnico completo con capturas y tablas: [`wiki/README.md`](wiki/README.md)**

El informe técnico en Markdown se organiza según las secciones 2, 3 y 4 del enunciado:
1. **Síntesis de la metodología estructurada** y tabla comparativa de decisiones de diseño.
2. **Esquema de direccionamiento IPv4 e IPv6 ($X=3$)** con tablas completas de subredes WAN (`/30`), LAN/DMZ (`/64` y `/24`) e inventario de equipos.
3. **Respuestas detalladas a todas las preguntas guía** de la sección de Procedimiento (numerales 3 al 8).
4. **Resultados y Análisis de la experimentación** (numerales 1 al 4), incluyendo:
   * Evaluación del flujo bidireccional del **Employee Tracker** (`PC4` $\rightarrow$ `Tracker_Server` $\rightarrow$ `PC7`) con capturas históricas y transcripciones de la variante BLE de las alertas `CAMBIO_BRUSCO` y `ZONA_RESTRINGIDA` ($\ge 60\text{ s}$).
   * Evaluación del flujo bidireccional **SNMP (`GET` y `SET`)** desde la red interna (`PC4`) y demostración de bloqueo (`SNMP request timed out`) desde la VLAN de invitados (`PC1`).
5. **Retos técnicos por capas TCP/IP**, conclusiones, recomendaciones y **referencias en formato IEEE**.
6. **Roles, actas y matriz de contribuciones verificables** de cada integrante ([`actas/ACTA_01.md`](actas/ACTA_01.md) y [`actas/MATRIZ_CONTRIBUCIONES.md`](actas/MATRIZ_CONTRIBUCIONES.md)).
7. **Declaración obligatoria de uso de IA** con el enlace de la sesión de trabajo y validación empírica ([`DECLARACION_IA.md`](DECLARACION_IA.md)).

---

## 📂 Estructura de Entregables del Repositorio

* **[Montaje final](Proyecto_RCD_Final.pkt)** y **[manifiesto SHA-256 de la actualización](MANIFIESTO_SHA256.txt)**. Se conservan [la copia anterior del Equipo 3](Proyecto_Final_RCD_Equipo3.pkt) y [la copia histórica alternativa](Proyecto_FINAL.pkt).
* **[`wiki/README.md`](wiki/README.md)**: Informe técnico navegable desde GitHub.
* **[`direccionamiento_y_rubrica.xlsx`](direccionamiento_y_rubrica.xlsx)**: Libro Excel con las hojas `Resumen`, `Direccionamiento`, `WAN`, `Inventario`, `Pruebas` y `Rubrica`.
* **[`configuraciones/`](configuraciones)**: Exportaciones históricas de 13 routers y switches. Véase el [inventario y alcance de las exportaciones](configuraciones/README.md).
* **[`evidencias/`](evidencias)**: Capturas de pantalla auténticas de SNMP (`GET`, `SET`, `Timeout`), consolas en vivo del Employee Tracker, trazas de *Simulation Mode*, contadores IPsec y matriz de ACLs.
* **[`tracker/`](tracker)**: Cuatro [fuentes JavaScript reconstruidas](tracker/PROTOCOLO.md) y prototipos históricos.
* **[`actas/`](actas)**: Actas de reunión y evaluación del equipo (`ACTA_01.md`) y matriz de contribuciones (`MATRIZ_CONTRIBUCIONES.md`).
* **[`DECLARACION_IA.md`](DECLARACION_IA.md)**: Registro transparente de herramientas de IA consultadas, enlace de conversación y pruebas de validación.

---

## Credenciales del laboratorio

Las contraseñas administrativas, comunidades SNMP y llaves precompartidas no deben publicarse en un repositorio público. Consultar la configuración de laboratorio en un canal autorizado. Si las claves ya se publicaron, evitar reutilizarlas fuera del simulador.

`MANIFEST_SHA256.txt` e `INTEGRIDAD.json` corresponden al registro histórico. `MANIFIESTO_SHA256.txt` registra el montaje y los archivos de la actualización incorporados a esta entrega.
