#include <Boards.h>

unsigned long lastTurnOrder;
unsigned long lastSensorValue;
const int basePin = 2;
const int pingPin = 7;
long duration, cm;
int ok;
void setup() {
  Serial.begin(9600); 
  pinMode(basePin, OUTPUT);
}

void loop() {

  if (Serial.available() > 0) {
    ok = Serial.read();
    analogWrite(basePin, 255);
    lastTurnOrder = millis();
  }

  unsigned long now = millis();
  
  if((now - lastTurnOrder) > 500){
    analogWrite(basePin, 0);
  }
  if((now - lastSensorValue) > 150 || (now < lastSensorValue)){
    pinMode(pingPin, OUTPUT);
    digitalWrite(pingPin, LOW);
    delayMicroseconds(3);
    
    digitalWrite(pingPin, HIGH);
    delayMicroseconds(3);
    digitalWrite(pingPin, LOW);
    
    pinMode(pingPin, INPUT);
    duration = pulseIn(pingPin, HIGH);
    
    cm = duration/ 29 / 2;
    Serial.println(cm);
    
    lastSensorValue = millis();
  }
}

