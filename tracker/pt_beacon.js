// RCD Equipo 3 - Beacon_Employee (JavaScript)
// Fuente reconstruida de la version funcional probada el 8-nov-2026.
// Datos sintéticos originados EN EL BEACON y enviados por Bluetooth a PC4.
var servicio;
var MAC_PC4 = "0005.5EA9.8827";
var UUID_BEACON = "{00000000-0000-0000-0000-000000000031}";
var UUID_PC4 = "{00000000-0000-0000-0000-000000000032}";
var seq = 0;
function setup() {
    Bluetooth.init();
    servicio = new BluetoothService();
    var iniciado = servicio.start(UUID_BEACON);
    Serial.println("BEACON EMP-001");
    Serial.println("SERVICIO INICIADO=" + iniciado);
    Serial.println("DESTINO PC4=" + MAC_PC4);
}
function loop() {
    delay(1000);
    seq++;
    var x, y, actividad;
    if (seq <= 80) {
        x = seq >= 6 ? 90 : 20;
        y = x;
        if (seq < 4) actividad = "En reposo";
        else if (seq === 4) actividad = "Alta actividad";
        else actividad = "En movimiento";
    } else {
        x = Math.floor(Math.random() * 101);
        y = Math.floor(Math.random() * 101);
        var actividades = ["En reposo", "En movimiento", "Alta actividad"];
        actividad = actividades[Math.floor(Math.random() * 3)];
    }
    var lectura = "EMP-001|" + seq + "|" + Date.now() + "|" + x + "|" + y + "|" + actividad;
    servicio.send(MAC_PC4, UUID_PC4, lectura);
    if (seq % 5 === 0) Serial.println("BEACON TX " + lectura);
}
