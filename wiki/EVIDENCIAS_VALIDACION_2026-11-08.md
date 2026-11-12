# Evidencias de validación — RCD Equipo 3 (8 de noviembre de 2026)

> **Alcance.** Este complemento se construyó con las capturas originales obtenidas durante la validación interactiva de `RCD_CORRECCIONES.pkt`. No sustituye las capturas anteriores que ya existían en el repositorio. Las imágenes están copiadas sin alterar su contenido. Las pruebas negativas (timeout) deben interpretarse junto con el estado de las ACL y, cuando corresponda, los contadores de denegación.

## 1. Direccionamiento IPv6

En PC4 (Bogotá, VLAN 80), la pantalla **IP Configuration** muestra el modo IPv6 **Automatic**, una dirección del prefijo `2001:1200:EA13:80::/64`, puerta de enlace IPv6 de vínculo local y DNS `2001:1200:EC13:10::53`. El [resumen de la sesión](../evidencias/validacion_2026-11-08/05_tracker_bluetooth/ipv6_pc2_y_resumen_8pc.txt) registra conectividad desde ocho PCs. La persistencia individual tras reabrir queda sin evidencia para el conjunto.

![IPv6 automático en PC4, Bogotá](../evidencias/validacion_2026-11-08/01_ipv6/pc4_slaac_ipv6_automatico.png)

*IPv6 automático en PC4, Bogotá.*

## 2. ACL web IPv4 e IPv6: matriz de 16 pruebas

| Equipo | Perfil | HTTP IPv4 | HTTPS IPv4 | HTTP IPv6 | HTTPS IPv6 | Resultado |
|---|---|---|---|---|---|---|
| PC1 | Invitados Bogotá (VLAN 35) | Permitido | Bloqueado | Permitido | Bloqueado | Conforme |
| PC4 | Internos Bogotá (VLAN 80) | Bloqueado | Permitido | Bloqueado | Permitido | Conforme |
| PC5 | Invitados Madrid (VLAN 35) | Permitido | Bloqueado | Permitido | Bloqueado | Conforme |
| PC7 | Internos Madrid (VLAN 80) | Bloqueado | Permitido | Bloqueado | Permitido | Conforme |

**Destinos usados:** HTTP/HTTPS a `10.3.10.80` (IPv4) y `2001:1200:EC13:10::80` (IPv6). En casos autorizados se observó el contenido de la web `mvydjdr.net`; en los denegados, `Request Timeout`. El informe del equipo menciona la inspección de contadores `WEB-DMZ4` y `WEB-DMZ` durante la sesión. Las capturas adjuntas corresponden a los navegadores de los clientes.

### 2.1. Invitados — Madrid (PC5)

![PC5: HTTP IPv4 permitido](../evidencias/validacion_2026-11-08/02_acl_web/pc5_mad_invitado_http_ipv4_permitido.png)

*PC5: HTTP IPv4 permitido.*
![PC5: HTTPS IPv4 bloqueado](../evidencias/validacion_2026-11-08/02_acl_web/pc5_mad_invitado_https_ipv4_bloqueado.png)

*PC5: HTTPS IPv4 bloqueado.*
![PC5: HTTP IPv6 permitido](../evidencias/validacion_2026-11-08/02_acl_web/pc5_mad_invitado_http_ipv6_permitido.png)

*PC5: HTTP IPv6 permitido.*
![PC5: HTTPS IPv6 bloqueado](../evidencias/validacion_2026-11-08/02_acl_web/pc5_mad_invitado_https_ipv6_bloqueado.png)

*PC5: HTTPS IPv6 bloqueado.*

### 2.2. Internos — Madrid (PC7)

![PC7: HTTP IPv4 bloqueado](../evidencias/validacion_2026-11-08/02_acl_web/pc7_mad_interno_http_ipv4_bloqueado.png)

*PC7: HTTP IPv4 bloqueado.*
![PC7: HTTPS IPv4 permitido](../evidencias/validacion_2026-11-08/02_acl_web/pc7_mad_interno_https_ipv4_permitido.png)

*PC7: HTTPS IPv4 permitido.*
![PC7: HTTP IPv6 bloqueado](../evidencias/validacion_2026-11-08/02_acl_web/pc7_mad_interno_http_ipv6_bloqueado.png)

*PC7: HTTP IPv6 bloqueado.*
![PC7: HTTPS IPv6 permitido](../evidencias/validacion_2026-11-08/02_acl_web/pc7_mad_interno_https_ipv6_permitido.png)

*PC7: HTTPS IPv6 permitido.*

### 2.3. Internos — Bogotá (PC4)

![PC4: HTTP IPv4 bloqueado](../evidencias/validacion_2026-11-08/02_acl_web/pc4_bog_interno_http_ipv4_bloqueado.png)

*PC4: HTTP IPv4 bloqueado.*
![PC4: HTTPS IPv4 permitido](../evidencias/validacion_2026-11-08/02_acl_web/pc4_bog_interno_https_ipv4_permitido.png)

*PC4: HTTPS IPv4 permitido.*
![PC4: HTTP IPv6 bloqueado](../evidencias/validacion_2026-11-08/02_acl_web/pc4_bog_interno_http_ipv6_bloqueado.png)

*PC4: HTTP IPv6 bloqueado.*
![PC4: HTTPS IPv6 permitido](../evidencias/validacion_2026-11-08/02_acl_web/pc4_bog_interno_https_ipv6_permitido.png)

*PC4: HTTPS IPv6 permitido.*

### 2.4. Invitados — Bogotá (PC1)

![PC1: HTTP IPv4 permitido](../evidencias/validacion_2026-11-08/02_acl_web/pc1_bog_invitado_http_ipv4_permitido.png)

*PC1: HTTP IPv4 permitido.*
![PC1: HTTPS IPv4 bloqueado](../evidencias/validacion_2026-11-08/02_acl_web/pc1_bog_invitado_https_ipv4_bloqueado.png)

*PC1: HTTPS IPv4 bloqueado.*
![PC1: HTTP IPv6 permitido](../evidencias/validacion_2026-11-08/02_acl_web/pc1_bog_invitado_http_ipv6_permitido.png)

*PC1: HTTP IPv6 permitido.*
![PC1: HTTPS IPv6 bloqueado](../evidencias/validacion_2026-11-08/02_acl_web/pc1_bog_invitado_https_ipv6_bloqueado.png)

*PC1: HTTPS IPv6 bloqueado.*

## 3. SNMP v2: operaciones y acceso en Madrid

**Corrección registrada en la sesión:** la ACL `SNMP-INTERNAL` en `MLSW_MAD` tenía `deny udp any any eq snmp` aplicado al enlace de entrada desde `R2_ESP` (GigabitEthernet1/0/1). Se incorporó una nueva ACL `SNMP-R2-RETURN` en esa interfaz con una excepción específica para la respuesta UDP SNMP de `10.3.200.1` a `10.3.81.17`. Después del cambio, PC7 pudo completar el GET y SET que antes terminaban en timeout. La ACL original `SNMP-INTERNAL` permanece en las interfaces de las VLAN no internas.

**No confundir los destinos:** la prueba exitosa fue **PC7 → R2_ESP (`10.3.200.1`)**, *no* PC7 → `MLSW_MAD` (`10.3.81.1`), que continúa sin respuesta SNMP documentada.

### 3.1. SNMP GET: sysName en R2_ESP

![PC7 obtiene sysName.0 = R2_ESP mediante SNMP GET](../evidencias/validacion_2026-11-08/03_snmp/pc7_get_sysname_r2_esp_exitoso.png)

*PC7 obtiene sysName.0 = R2_ESP mediante SNMP GET.*

### 3.2. SNMP SET: sysLocation en R2_ESP

![GET inicial de sysLocation.0 sin ubicación configurada](../evidencias/validacion_2026-11-08/03_snmp/pc7_get_syslocation_inicial_vacio.png)

*GET inicial de sysLocation.0 sin ubicación configurada.*
![SET sobre sysLocation.0 con el texto Madrid - RCD Equipo 3](../evidencias/validacion_2026-11-08/03_snmp/pc7_set_syslocation_r2_esp_exitoso.png)

*SET sobre sysLocation.0 con el texto Madrid - RCD Equipo 3.*
![GET posterior confirma Madrid - RCD Equipo 3](../evidencias/validacion_2026-11-08/03_snmp/pc7_get_syslocation_verificacion.png)

*GET posterior confirma Madrid - RCD Equipo 3.*

> **Estado residual controlado:** el navegador MIB de Packet Tracer rechazó restaurar un valor vacío (`Value for set dialog cannot be empty`). Por ello, `sysLocation` se mantiene con la ubicación descriptiva `Madrid - RCD Equipo 3`; no implica cambio en las interfaces o rutas.

### 3.3. SNMP denegado: invitado PC5

![PC5 invitado: SNMP GET hacia R2_ESP termina en timeout](../evidencias/validacion_2026-11-08/03_snmp/pc5_mad_invitado_get_r2_esp_timeout.png)

*PC5 invitado: SNMP GET hacia R2_ESP termina en timeout.*

La salida de consola de `MLSW_MAD` mostró:

```ios
MLSW_MAD#show ip access-lists SNMP-INTERNAL
Extended IP access list SNMP-INTERNAL
    permit udp 10.3.80.0 0.0.0.255 any eq snmp
    permit udp 10.3.81.0 0.0.0.255 any eq snmp
    deny udp any any eq snmp (7 match(es))
    permit ip any any (254 match(es))
```

La existencia de coincidencias en la regla `deny` respalda que hubo bloqueo de tráfico SNMP. **No se atribuyen las siete coincidencias exclusivamente a la prueba de PC5**, ya que no se registró un contador justo antes del ensayo.

### 3.4. Ensayo anterior al ajuste de retorno

![PC7 hacia R2_ESP antes del ajuste de retorno](../evidencias/validacion_2026-11-08/04_diagnostico_snmp/pc7_r2_esp_get_timeout_antes_aclaracion.png)

## 4. Diagnóstico — consulta directa a MLSW_MAD pendiente

La consulta PC7 → `MLSW_MAD` (`10.3.81.1`) terminó en timeout tanto con GET como con GET BULK. La prueba en modo Simulation muestra el paquete SNMPv2 desde `10.3.81.17`, UDP/161, comunidad `RCD3-RO`, llegando por `GigabitEthernet1/0/3`; la inspección OSI mostró desencapsulación UDP sin respuesta saliente visible. **Esto no prueba la causa raíz ni autoriza a afirmar que el switch carece de SNMP.**

![Recorrido de la PDU desde PC7 hasta MLSW_MAD](../evidencias/validacion_2026-11-08/04_diagnostico_snmp/simulacion_trayecto_snmp_pc7_mlsw.png)

![PDU SNMP llega a MLSW_MAD desde PC7, puerto UDP 161](../evidencias/validacion_2026-11-08/04_diagnostico_snmp/pdu_pc7_llega_mlsw_osi.png)

*PDU SNMP llega a MLSW_MAD desde PC7, puerto UDP 161.*
![Detalles SNMPv2 y comunidad RCD3-RO](../evidencias/validacion_2026-11-08/04_diagnostico_snmp/pdu_pc7_mlsw_comunidad_correcta.png)

*Detalles SNMPv2 y comunidad RCD3-RO.*
![Último mensaje OSI observado: desencapsulación UDP](../evidencias/validacion_2026-11-08/04_diagnostico_snmp/pdu_pc7_mlsw_ultima_capa_osi.png)

*Último mensaje OSI observado: desencapsulación UDP.*
![Consulta directa a MLSW_MAD: timeout](../evidencias/validacion_2026-11-08/04_diagnostico_snmp/pc7_mlsw_get_timeout.png)

*Consulta directa a MLSW_MAD: timeout.*

## 5. VPN IPsec y túnel IPv6 — resultados documentados sin captura adjunta

Durante esta sesión se consultaron `show crypto ipsec sa` y `show access-lists 141` en `R1_BOG`:

- Un ensayo de tráfico IPv4 hacia Madrid incrementó los contadores de la primera asociación IPsec de **6 a 10 paquetes cifrados** y de **36 a 40 descifrados**, con SAs ESP activas y transformación `esp-aes 256 esp-sha-hmac`.
- Una prueba posterior de conectividad IPv6 no modificó los contadores IPsec observados (10/40 y 4/110 para las dos asociaciones, respectivamente).
- La ACL de interés 141 selecciona redes IPv4 privadas y no contiene una regla explícita para los extremos exteriores `86.106.79.1` ↔ `86.106.79.26`, protocolo IPv4 41.
- **Interpretación prudente:** la VPN IPv4 quedó demostrada con contadores; el cifrado de los paquetes del túnel IPv6 sobre IPv4 **no está demostrado**. No presentar las dos tecnologías como un único túnel IPsec cifrado sin evidencia.

No hay capturas gráficas de estos comandos entre los adjuntos recuperados; para anexos del docente debe generarse una captura directa de CLI si es requerida.

## 6. Alcance pendiente de validación

- La causa del timeout directo a MLSW_MAD queda abierta.
- El [cierre funcional](CIERRE_FUNCIONAL_2026-11-08.md) añade transcripciones BLE/TCP y ambas alertas. Las capturas del Tracker en el [informe principal](README.md) pertenecen a la variante anterior.
- El tráfico IPv4 del Tracker y el acceso Web IPv4 muestran que la DMZ mantiene doble pila. El cifrado del protocolo 41 queda sin demostrar.
- La [revisión de exportaciones](../configuraciones/README.md) describe los archivos históricos y las comprobaciones pendientes sobre el montaje de entrega.

[Índice de nombres originales y SHA-256 de capturas](../INDICE_CAPTURAS.csv)
