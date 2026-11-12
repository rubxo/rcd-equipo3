// Packet Tracer Programming: RCD Tracker (JavaScript)
// Fuente compartida por el usuario el 8-nov-2026. Tracker_Server TCP 5000 -> PC7 TCP 5001.
var server;
var dashboard;
var previous = null;
var since = null;
var lastSeq = 0;
var retryAt = 0;
var connectSince = 0;
function setup() {
    dashboard = new TCPClient();
    dashboard.connect("10.3.81.17", 5001);
    connectSince = Date.now();
    server = new TCPServer();
    server.onNewClient = function(client) {
        var buffer = "";
        client.onReceive = function(data) {
            buffer += String(data);
            var lines = buffer.split("\n");
            buffer = lines.pop();
            for (var i = 0; i < lines.length; i++) {
                if (lines[i]) receive(client, lines[i]);
            }
        };
    };
    server.listen(5000);
    Serial.println("TRACKER_LISTEN TCP 5000; relay TCP 5001");
}
function receive(client, data) {
    var p = data.split("|");
    if (p.length !== 6) return;
    var seq = Number(p[1]), x = Number(p[3]), y = Number(p[4]);
    if (p[0] !== "EMP-001" || isNaN(x) || isNaN(y) || isNaN(seq) || x < 0 || x > 100 || y < 0 || y > 100 || seq <= lastSeq) return;
    if (p[5] !== "En reposo" && p[5] !== "En movimiento" && p[5] !== "Alta actividad") return;
    var now = Date.now(), alerts = [];
    if (x >= 80 && y >= 80) {
        if (since === null) since = now;
    } else since = null;
    var seconds = since === null ? 0 : Math.floor((now - since) / 1000);
    if (seconds >= 60) alerts.push("ZONA_RESTRINGIDA");
    if (previous === "En reposo" && p[5] === "Alta actividad") alerts.push("CAMBIO_BRUSCO");
    previous = p[5];
    lastSeq = seq;
    var alert = alerts.length ? alerts.join(",") : "SIN_ALERTA";
    var record = data + "|zona=" + seconds + "|alerta=" + alert;
    var dashboardStatus = dashboard.state();
    if (seq % 5 === 0) Serial.println("DEBUG DASHBOARD STATE=" + dashboardStatus);
    if (dashboardStatus === 3) dashboard.send(record + "\n");
    client.send("ACK|" + seq + "|RECIBIDO|" + alert + "\n");
    if (seq % 5 === 0 || alerts.length) Serial.println(record);
}
function loop() {
    delay(100);
    var now = Date.now(), status = dashboard.state();
    if (status === 1 && now - connectSince > 10000) {
        dashboard.close();
        dashboard = new TCPClient();
        status = 0;
    }
    if (status === 0 && now >= retryAt) {
        retryAt = now + 1000;
        dashboard.connect("10.3.81.17", 5001);
        connectSince = now;
    }
}
