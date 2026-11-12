# Employee Tracker implementado en Packet Tracer

Montaje de referencia: [Proyecto_RCD_Final.pkt](../Proyecto_RCD_Final.pkt). Las fuentes son reconstrucciones a partir de la sesión de pruebas. Su coincidencia exacta con la pestaña Programming queda por cotejar en Packet Tracer.

| Equipo | Fuente de referencia | Función |
|---|---|---|
| Beacon_Employee | [pt_beacon.js](pt_beacon.js) | Genera lecturas sintéticas y las transmite por Bluetooth. |
| PC4 | [pt_pc4.js](pt_pc4.js) | Valida las lecturas BLE, las pone en cola y las reenvía por TCP. |
| Tracker_Server | [pt_server.js](pt_server.js) | Calcula alertas, confirma recepción a PC4 y reenvía a PC7 si el socket está conectado. |
| PC7 | [pt_pc7.js](pt_pc7.js) | Recibe los eventos y muestra historial y alertas. |

El [emisor histórico de PC4](pt_pc4_sender_legacy.js) generaba coordenadas sin recibirlas del beacon.

PC4 transmite a 10.3.10.50:5000:
`EMP-001|secuencia|timestamp|x|y|actividad\n`.

El servidor responde en el mismo socket:
`ACK|secuencia|RECIBIDO|alerta\n`.

El relay mantiene una conexión TCP a 10.3.81.17:5001 y añade:
`|zona=<segundos>|alerta=<estado>`.

Se utiliza delimitación por salto de línea y secuencia creciente. Las coordenadas admitidas están entre 0 y 100. El tiempo de zona se calcula con Date.now del servidor, no con el timestamp del cliente. Al salir de zona se reinicia. El límite de alarma es 60 segundos continuos. La transición En reposo→Alta actividad genera alerta inmediata.

La escena de demostración permite verificar ambas alarmas; tras secuencia 80 las coordenadas y actividad son aleatorias. El planificador intenta una emisión cada 1000 ms de reloj. El simulador puede introducir retardo, por lo que no se promete temporización de tiempo real estricto.

PC7 muestra el último registro, un historial de hasta diez registros y las alertas en Programming. Para reiniciar la demostración, detener los programas y arrancar PC7 → Tracker_Server → PC4 → Beacon_Employee. La [validación del equipo](../wiki/CIERRE_FUNCIONAL_2026-11-08.md) documenta recepción BLE, ACK y alertas.

Los scripts Python incluidos son prototipos de escritorio y no se usan para demostrar ejecución en PT.
