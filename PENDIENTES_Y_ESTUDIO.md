# Continuar el proyecto RCD Equipo 3

> **Guía histórica.** Para el montaje de entrega y el estado actualizado consulte [el cierre del 8 de noviembre](ESTADO_FINAL_2026-11-08.md).

Guía de transferencia preparada el 6 de noviembre de 2026 para Juan David Rubio, Yeison David Niño, Miguel Medina y la persona que continúe la implementación.

## Punto de partida

La red está construida y el paquete incluye configuraciones, fuentes del Tracker, direccionamiento y evidencia de pruebas. Queda trabajo técnico para cerrar los requisitos y trabajo del equipo para entregar y sustentar. La matriz de la rúbrica representa una autoevaluación de avance.

La evidencia funcional incluida corresponde al 2 de noviembre. El `.pkt` principal se copió del archivo local más reciente, modificado el 4 de noviembre. Esa copia posterior requiere repetir las pruebas de apertura y conectividad. Los TXT de configuración reflejan las exportaciones del 2 de noviembre y deben actualizarse después de comprobar el `.pkt` actual.

## Abrir y recuperar la demostración

1. Clonar el repositorio y conservar una copia del `.pkt` antes de editar.
2. Abrir `Proyecto_Final_RCD_Equipo3.pkt` con Cisco Packet Tracer. Registrar versión y sistema operativo en la nueva evidencia.
3. Esperar convergencia de STP y routing. Revisar que estén los 32 dispositivos y 32 enlaces. Dos dispositivos son unidades eléctricas automáticas.
4. Si se usa MCP, activar `Extensions > MCP BUILDER`, comprobar `pt_bridge_status` y consultar `pt_query_topology` antes de cualquier cambio. Tener una sola instancia de PT para evitar que compitan por el bridge.
5. Ejecutar el contenido de `configuraciones/inicializar_proyecto_mcp.js` con `pt_send_raw`, usando `wait_result=true`. El motor espera JavaScript en una sola línea. El archivo utiliza comentarios de bloque, por lo que se pueden reemplazar sus saltos de línea por espacios.
6. Ese inicializador aplica IPv6 estática de compatibilidad a PC1–PC8 y reinicia las aplicaciones en orden PC7, Tracker_Server, PC4. Revisar las direcciones después de ejecutarlo.
7. Sin MCP, introducir las IPv6 y gateways de los ocho PCs desde Desktop > IP Configuration usando la tabla siguiente. Iniciar los programas desde Programming en ese mismo orden.
8. Comprobar ping PC4→10.3.81.17 y PC7→2001:1200:EC13:10::80. Después revisar los ACK en PC4 y los registros recibidos en PC7.

| PC | IPv6 de compatibilidad /64 | Gateway |
|---|---|---|
| PC1 | 2001:1200:EA13:35::11 | 2001:1200:EA13:35::1 |
| PC2 | 2001:1200:EA13:80::12 | 2001:1200:EA13:80::1 |
| PC3 | 2001:1200:EA13:80::13 | 2001:1200:EA13:80::1 |
| PC4 | 2001:1200:EA13:80::14 | 2001:1200:EA13:80::1 |
| PC5 | 2001:1200:EB23:35::15 | 2001:1200:EB23:35::1 |
| PC6 | 2001:1200:EB23:80::16 | 2001:1200:EB23:80::1 |
| PC7 | 2001:1200:EB23:80::17 | 2001:1200:EB23:80::1 |
| PC8 | 2001:1200:EB23:35::18 | 2001:1200:EB23:35::1 |

DNS IPv6 para los PCs `2001:1200:EC13:10::53`. El procedimiento de compatibilidad permite retomar las pruebas mientras se resuelve SLAAC.

## Mapa rápido de lo construido

| Parte | Implementación |
|---|---|
| WAN IPv4 | Siete enlaces /30 desde 86.106.79.0/30 hasta 86.106.79.24/30 |
| Bogotá | R1_BOG y SW1_BOG–SW3_BOG, router-on-a-stick |
| Madrid | R2_ESP, MLSW_MAD y SW4_MAD–SW5_MAD, SVIs en el 3650 |
| VLAN | 35 Guest, 80 Internal, 40 Services, 99 Native/Management |
| Routing IPv4 | EIGRP AS 3, OSPF proceso 3, redistribución OSPF/EIGRP en ISP_FL |
| Routing IPv6 | OSPFv3 proceso 3 por Tunnel0 y R2–MLSW |
| DMZ | Web ::80, DNS ::53 y Tracker ::50 en 2001:1200:EC13:10::/64 |
| Túnel | R1–R2, IPv6 sobre IPv4, prefijo 2001:1200:ED13:300::/64 |
| Tracker | PC4→servidor TCP 5000, servidor→PC7 TCP 5001 y ACK hacia PC4 |

La DMZ conserva IPv4 10.3.10.0/24. Bogotá Internal usa 10.3.80.0/24 y Madrid Internal 10.3.81.0/24. Madrid Internal queda fuera del resumen 10.3.128.0/17 y necesita la ruta específica existente.

## Pendientes técnicos por prioridad

### P0. Validar el archivo recibido

- [ ] Abrir la copia principal y registrar versión de PT, fecha, topología y configuración actual.
- [ ] Aplicar el inicializador y verificar ping IPv4 entre sedes y ping IPv6 hacia DMZ.
- [ ] Comparar configuraciones vivas con `configuraciones/*_running.txt` y registrar diferencias.
- [ ] Repetir DNS, Web, matriz ACL y Tracker antes de cambiar el diseño.

Se considera cerrado cuando la persona que recibe el repositorio reproduce los resultados desde un clon nuevo y deja evidencia identificada con su fecha y versión.

### P1. Resolver IPv6 automática y persistencia

**Estado observado.** Al guardar y reabrir mediante la API, los PCs perdieron sus IPv6. Las direcciones de servidores persistieron. Se observaron direcciones SLAAC durante la construcción. La solución actual requiere aplicar direcciones estáticas con el inicializador.

**Trabajo concreto.** Probar primero la apertura normal desde la interfaz de PT y compararla con `pt_open_project`. Revisar Auto Config en PCs, IPv6 habilitado, anuncios RA, prefijo /64, flags A/M/O, gateway y anuncios después de converger STP. Capturar RS/RA e Information-request/Reply en Simulation Mode. Revisar si falla la red, la serialización del archivo o el acceso por la API antes de atribuir una causa definitiva.

**Qué estudiar.** IPv6 global y link-local, NDP, RS/RA, SLAAC, DAD, diferencia entre asignar dirección y entregar opciones DNS, DHCPv6 stateless y stateful, puertos UDP 546/547 y relay DHCPv6. El gateway IPv6 se aprende mediante RA.

**Cierre.** Los ocho PCs obtienen su configuración prevista al abrir el `.pkt` y conservan conectividad sin inicialización manual. Guardar, cerrar, reabrir y repetir la prueba.

### P1. Llevar DHCPv6 al servidor central

**Estado observado.** Las opciones DHCPv6 se configuraron en los gateways. El servidor central tiene pools DHCPv4 y las VLAN usan relays IPv4. El relay DHCPv6 central previsto queda pendiente.

**Trabajo concreto.** Confirmar qué soporte tiene Server-PT y el IOS de los modelos usados. Si la función está disponible, configurar el servicio central y relay desde las VLAN de usuarios. Mantener SLAAC para direcciones y comprobar DNS `2001:1200:EC13:10::53` y dominio `mvydjdr.net`. Si existe una limitación reproducible del simulador, conservar la evidencia y acordar con el docente la alternativa.

**Cierre.** Registrar intercambio real de mensajes por sede, lectura de DNS/dominio en clientes y resolución del AAAA después de reabrir.

### P1. Probar y ajustar SNMP GET/SET

**Estado observado.** Existen comunidades RO/RW y ACL por origen. Faltan las respuestas y bloqueos capturados con MIB Browser. Se retiraron filtros IPv4 de algunas interfaces internas porque interferían con respuestas IPv6 en las pruebas.

**Trabajo concreto.** En un PC Internal de cada sede, abrir Desktop > MIB Browser, seleccionar la dirección de gestión del equipo, SNMPv2c y comunidad correspondiente. Consultar `sysName.0`, OID `1.3.6.1.2.1.1.5.0`. Con RW intentar un SET de `sysLocation.0`, OID `1.3.6.1.2.1.1.6.0`, usando un valor de laboratorio. Confirmar con otro GET. Revisar tipos de dato y soporte del OID si el agente devuelve error. Repetir desde Guest y comprobar timeout junto con la ACL. Si MIB Browser requiere IPv4, utilizar la superposición local documentada.

**Qué estudiar.** Manager/agente, MIB/OID, GET/SET, comunidades RO/RW, UDP 161, tipos ASN.1 y dirección/sentido de ACL. Revisar acceso a agentes en la misma VLAN y entre VLAN, incluyendo equipos de gestión y el caso SW_DMZ.

**Cierre.** Cuatro pruebas positivas, GET y SET desde Bogotá y Madrid Internal, y sus intentos equivalentes bloqueados desde Guest. Probar también orígenes Services y Management para cubrir la condición de acceso exclusivo desde VLAN 80. Guardar capturas y contadores. Repetir la regresión IPv6 después de tocar ACL.

### P1. Resolver la protección del túnel IPv6

**Estado observado.** Tunnel0 funciona en modo `ipv6ip`. Se registró IPsec AES-256/SHA para tráfico IPv4. El cifrado del protocolo 41 queda sin demostrar. El intento anterior con GRE perdió la vecindad OSPFv3.

**Trabajo concreto.** Trabajar en una copia. Comprobar alcance IPv4 entre 86.106.79.1 y 86.106.79.26. Revisar IKE, PSK, transform-set, crypto map y ACL de tráfico interesante. Aislar una prueba de protocolo 41 y medir contadores antes y después, sin Tracker u otros flujos IPv4 concurrentes. Si se prueba GRE, comprobar primero transporte y routing del túnel, después protección y finalmente OSPFv3. Dejar un punto de retorno antes de cada cambio.

**Qué estudiar.** Encapsulación IPv6-in-IPv4, protocolo 41, GRE protocolo 47, ESP protocolo 50, IKE, asociaciones de seguridad, selectores de tráfico y crypto map sobre WAN. Entender qué paquete ve la ACL en cada etapa y la diferencia entre túnel operativo y paquete cifrado.

**Cierre.** Tráfico IPv6 BOG–MAD funcional y evidencia que vincule ese flujo con ESP e incremento de contadores. Si el simulador impide la combinación, documentar versión, configuración mínima, fallo y alternativa aceptada por el docente. Mantener el túnel funcional mientras se investiga.

### P2. Ajustar diferencias del diseño

| Pendiente | Trabajo y criterio de cierre | Tema de estudio |
|---|---|---|
| DMZ exclusivamente IPv6 | Evaluar dependencias IPv4 de DNS, Tracker y clientes. Migrar y repetir servicios, ACL y retornos antes de retirar la superposición | Dual stack, AAAA, sockets IPv6, dependencias de aplicaciones |
| OSPFv3 pasivo en LAN/DMZ | Aplicar condición pasiva solo donde corresponda. Mantener Tunnel0 y tránsito R2–MLSW con vecindades FULL y conservar rutas /64 | Interfaces pasivas, anuncios de prefijos y adyacencias |
| ACL Web IPv4 de MAD Guest | Investigar el fallo documentado si se mantiene IPv4 de compatibilidad. Capturar ambos sentidos y repetir HTTP/HTTPS | Routing de retorno, ACL, IPsec y TCP |
| Beacon | Contrastar el requisito con el docente y la capacidad real de Thing/PC4. Registrar cómo se originan coordenadas y actividad | BLE, simulación IoT y generación de datos |
| Vista web bonus | Evaluar un dispositivo con HTTPServer soportado. PC-PT rechazó el servidor HTTP de Programming | TCP, HTTP y servicios disponibles por dispositivo |

### P2. Repetir y cerrar la evidencia del Tracker

Los fuentes cargados están en `tracker/pt_pc4.js`, `pt_server.js` y `pt_pc7.js`. Los `.py` son prototipos para Python de escritorio. Los programas de PT utilizan sus APIs `TCPClient`, `TCPServer`, `Serial`, `setup` y `loop`.

- [ ] Capturar TX y ACK en PC4 y el mismo registro recibido en PC7.
- [ ] Comprobar secuencias y timestamps de mensajes aproximadamente cada segundo.
- [ ] Reiniciar PC7, Tracker_Server y PC4 en ese orden.
- [ ] Capturar CAMBIO_BRUSCO en secuencia 4.
- [ ] Observar coordenadas 90,90 desde secuencia 6 y esperar más de 60 segundos reales.
- [ ] Capturar ZONA_RESTRINGIDA en servidor, ACK de PC4 y dashboard PC7 antes de que rote el historial.
- [ ] Salir de zona y comprobar reinicio del tiempo. Ensayar desconexión y reconexión.

**Qué estudiar.** TCP como flujo de bytes, delimitación por salto de línea, buffers, callbacks, estados de socket, reintentos, timestamp, máquina de estados y temporización continua de 60 segundos.

## Regresión después de cada cambio importante

| Prueba | Resultado que debe quedar registrado |
|---|---|
| Inventario y puertos | Equipos/enlaces esperados y ausencia de fallos físicos inesperados |
| VLAN/trunks | VLAN 35/40/80/99 presentes y transportadas. Revisar estado vivo con `show interfaces trunk` |
| WAN IPv4 | Conectividad extremo a extremo, rutas EIGRP/OSPF y redistribución sin bucles |
| OSPFv3 | Vecinos FULL en enlaces activos y prefijos de ambas sedes |
| IPv6 | Ping entre sedes y a Web/DNS/Tracker |
| ACL Web | Guest permite 80 y bloquea 443. Internal permite 443 y bloquea 80, en ambas sedes |
| DNS y Web | A/AAAA según diseño final y página personalizada desde los clientes autorizados |
| IPsec | SA, contadores y traza vinculados al flujo bajo prueba |
| SNMP | GET/SET y controles negativos por origen |
| Tracker | TX, ACK, reenvío y ambas alertas |
| Persistencia | Guardar, cerrar, reabrir y repetir una muestra de todas las funciones |

En IOS sirven como puntos de inspección `show ip route`, `show ipv6 route`, `show ip eigrp neighbors`, `show ip ospf neighbor`, `show ipv6 ospf neighbor`, `show interfaces tunnel 0`, `show crypto isakmp sa`, `show crypto ipsec sa`, `show access-lists`, `show ipv6 access-list` y `show running-config`. Confirmar los comandos disponibles en la versión simulada.

Guardar evidencia nueva con fecha, equipo, origen, destino, comando o acción, resultado esperado y resultado real. En Simulation Mode capturar también las decisiones por capa. Después actualizar la hoja Pruebas, la Wiki y ESTADO_VERIFICACION.md.

## Entrega académica pendiente

- [ ] Revisar cada indicador oficial de `fuentes/Rubricas_PF_RCD_262.xlsx` frente a evidencia funcional.
- [ ] Completar actas, roles y contribuciones con hechos, fechas y participantes reales.
- [ ] Revisar conclusiones, recomendaciones, referencias IEEE y preguntas de la guía de clase. Obtener la guía si hay preguntas adicionales.
- [ ] Revisar la declaración de IA y añadir las nuevas intervenciones y validaciones.
- [ ] Ensayar el guion de diez minutos con participación equilibrada.
- [ ] Grabar con cámaras según lo exigido y verificar reproducción y duración del video.
- [ ] Publicar la Wiki o acordar si el docente acepta la documentación Markdown del repositorio. La carpeta `wiki/` ya está disponible, falta confirmar el formato final exigido.
- [ ] Revisar acceso al repositorio y a los enlaces del video desde otra cuenta.
- [ ] Empaquetar la versión definitiva, comprobar sus archivos y registrar el commit entregado.
- [ ] Entregar en Teams el 10 de noviembre de 2026 antes de las 23:00 y preparar la sustentación del 11 de noviembre a las 09:00, según el enunciado incluido.

## Ruta de estudio propuesta

| Orden | Estudiar | Ejercicio para demostrar comprensión |
|---|---|---|
| 1 | IPv4, /30, /24, /17, IPv6 /64 y gateways | Explicar por qué Madrid 10.3.81.0/24 necesita una ruta específica |
| 2 | VLAN, access/trunk, VLAN nativa, STP, subinterfaces y SVI | Seguir un paquete de PC4 hasta R1 y uno de PC7 hasta R2 |
| 3 | EIGRP, OSPFv2/v3, distancia administrativa y redistribución | Dibujar el bucle anterior y explicar la distancia externa OSPF 175 |
| 4 | NDP/SLAAC/DHCPv6 y persistencia en PT | Capturar RA y obtención de DNS después de reabrir |
| 5 | SNMP y ACL | Ejecutar GET/SET permitido y demostrar bloqueo desde Guest |
| 6 | Túneles, GRE, IKE, ESP y selectores | Explicar las cabeceras visibles antes y después de cifrar el flujo |
| 7 | JavaScript y sockets TCP de PT | Seguir una secuencia desde PC4 hasta el ACK y el dashboard |
| 8 | Método de pruebas y sustentación | Reproducir una prueba positiva y una negativa, mostrando su recorrido |

Usar el material de clase y la ayuda oficial instalada de Packet Tracer para los comandos y APIs de esa versión. Para los fundamentos consultar [SLAAC, RFC 4862](https://www.rfc-editor.org/rfc/rfc4862), [DHCPv6, RFC 9915](https://www.rfc-editor.org/rfc/rfc9915.html), [OSPFv3, RFC 5340](https://www.rfc-editor.org/rfc/rfc5340.html), [arquitectura IPsec, RFC 4301](https://www.rfc-editor.org/rfc/rfc4301) y [operaciones SNMPv2, RFC 3416](https://www.rfc-editor.org/rfc/rfc3416.html).

## Colaborar sin perder cambios

El repositorio es público. Para trabajar desde otra cuenta se puede hacer un fork y abrir un pull request. Para escribir directamente, Juan debe añadir esa cuenta como colaboradora desde Settings > Collaborators.

```bash
git clone https://github.com/rubxo/rcd-equipo3.git
cd rcd-equipo3
git switch -c codex/cierre-snmp
```

El `.pkt` es binario. Coordinar quién lo edita y guardar versiones antes de mezclar cambios. Cada pull request debería incluir el `.pkt` actualizado, fuentes si cambiaron, exportaciones IOS y evidencia de la función corregida. Registrar el resultado real de las pruebas en el MD.

## Primera sesión de trabajo sugerida

Abrir el `.pkt`, recuperar la demostración, tomar una línea base y empezar por SNMP con MIB Browser. Después resolver SLAAC/persistencia y DHCPv6 central. Aislar el trabajo de IPsec en una copia y reservar tiempo para la regresión y la grabación.
