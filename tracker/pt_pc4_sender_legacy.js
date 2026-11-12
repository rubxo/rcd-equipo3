// Packet Tracer Programming: RCD Sender (JavaScript), PC4.
// Deterministic demonstration: sudden activity at seq 4, restricted zone seq 6..80.
var client, seq=0, x=20, y=20, activity="En reposo", nextSend=0, connectSince=0;
function setup(){
    client=new TCPClient();
    client.onReceive=function(data){Serial.println(String(data));};
    client.connect("10.3.10.50",5000);
    connectSince=Date.now();
    Serial.println("EMP-001 connected to tracker:5000");
}
function loop(){
    if(client.state()===1&&Date.now()-connectSince>10000)client.close();
    if(client.state()===0){client.connect("10.3.10.50",5000);connectSince=Date.now();}
    if(client.state()!==3){delay(100);return;}
    delay(20);var now=Date.now();if(now<nextSend)return;nextSend=now+1000;seq++;
    activity=seq<=80?(seq<4?"En reposo":seq===4?"Alta actividad":"En movimiento"):
        ["En reposo","En movimiento","Alta actividad"][Math.floor(Math.random()*3)];
    x=seq<=80?(seq>=6?90:20):Math.floor(Math.random()*101);
    y=seq<=80?x:Math.floor(Math.random()*101);
    var line="EMP-001|"+seq+"|"+Date.now()+"|"+x+"|"+y+"|"+activity;
    client.send(line+"\n");
    if(seq%5===0)Serial.println("TX "+line);
}
