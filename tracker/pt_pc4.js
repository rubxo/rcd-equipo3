// RCD Equipo 3 - PC4 bridge Bluetooth a TCP
// Fuente reconstruida de la version funcional probada el 8-nov-2026.
// Mantener una copia del antiguo RCD Sender en pt_pc4_sender_legacy.js.
var servicio;
var clienteTCP;
var UUID_PC4 = "{00000000-0000-0000-0000-000000000032}";
var cola = [];
var ultimaSecuenciaBLE = 0;
var siguienteReintento = 0;
function setup() {
    Serial.println("=== RCD PUENTE BLUETOOTH/TCP ===");
    Bluetooth.init();
    servicio = new BluetoothService();
    servicio.onReceive = function(macOrigen, uuidOrigen, macDestino, uuidDestino, datos) {
        // El replace con expresiones regulares produjo un error en PT; usar String simple.
        var lectura = String(datos);
        Serial.println("BLE RECIBIDO: " + lectura);
        var p = lectura.split("|");
        if (p.length !== 6 || p[0] !== "EMP-001") {
            Serial.println("BLE DESCARTADO: formato invalido");
            return;
        }
        var seq = Number(p[1]), x = Number(p[3]), y = Number(p[4]);
        if (isNaN(seq) || isNaN(x) || isNaN(y) || x < 0 || x > 100 || y < 0 || y > 100 || seq <= ultimaSecuenciaBLE) {
            Serial.println("BLE DESCARTADO: datos invalidos");
            return;
        }
        if (p[5] !== "En reposo" && p[5] !== "En movimiento" && p[5] !== "Alta actividad") {
            Serial.println("BLE DESCARTADO: actividad invalida");
            return;
        }
        ultimaSecuenciaBLE = seq;
        cola.push(lectura);
        if (cola.length > 30) {
            cola.shift();
            Serial.println("ADVERTENCIA: cola llena");
        }
        if (seq % 5 === 0) Serial.println("BLE RX: " + lectura);
    };
    var iniciado = servicio.start(UUID_PC4);
    Serial.println("BLUETOOTH INICIADO=" + iniciado);
    clienteTCP = new TCPClient();
    clienteTCP.onReceive = function(data) { Serial.println(String(data)); };
    clienteTCP.connect("10.3.10.50", 5000);
    Serial.println("TCP: conectando a 10.3.10.50:5000");
}
function loop() {
    delay(100);
    var ahora = Date.now();
    var estado = clienteTCP.state();
    if (estado === 0 && ahora >= siguienteReintento) {
        siguienteReintento = ahora + 3000;
        clienteTCP.connect("10.3.10.50", 5000);
    }
    if (estado === 3 && cola.length > 0) {
        var lectura = cola.shift();
        clienteTCP.send(lectura + "\n");
        var partes = lectura.split("|");
        var seq = Number(partes[1]);
        if (seq % 5 === 0) Serial.println("TCP TX: " + lectura);
    }
}
