// RCD Equipo 3 - Dashboard PC7
// Fuente de la version con 'TCP RX', 'ULTIMO' y 'ALERTA DETECTADA' probada 8-nov-2026.
var server;
var history = [];
var latest = "";
var alerts = [];
var count = 0;
var connections = 0;
function setup() {
    Serial.println("=== RCD DASHBOARD PC7 ===");
    server = new TCPServer();
    server.onNewClient = function(client) {
        connections++;
        Serial.println("CLIENTE TCP CONECTADO #" + connections);
        var buffer = "";
        client.onReceive = function(data) {
            var recibido = String(data);
            Serial.println("TCP RX: " + recibido);
            buffer += recibido;
            var lines = buffer.split("\n");
            buffer = lines.pop();
            for (var i = 0; i < lines.length; i++) {
                var lectura = lines[i];
                if (lectura.length === 0) continue;
                latest = lectura;
                count++;
                history.push(latest);
                if (history.length > 10) history.shift();
                if (latest.indexOf("alerta=") >= 0 && latest.indexOf("alerta=SIN_ALERTA") < 0) {
                    alerts.push(latest);
                    if (alerts.length > 10) alerts.shift();
                    Serial.println("ALERTA DETECTADA: " + latest);
                }
                Serial.println("ULTIMO: " + latest);
                if (count % 10 === 0) {
                    Serial.println("=== HISTORIAL CORTO ===");
                    for (var j = 0; j < history.length; j++) Serial.println(history[j]);
                }
            }
        };
    };
    server.listen(5001);
    Serial.println("DASHBOARD: ESCUCHA SOLICITADA TCP 5001");
}
function loop() { delay(100); }
