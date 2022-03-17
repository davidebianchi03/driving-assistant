#include <ArduinoJson.h>

#define pinEchoBL 2
#define pinTriggerBL 3
#define pinEchoBM 4
#define pinTriggerBM 5
#define pinEchoBR 6
#define pinTriggerBR 7
#define pinEchoFR 8
#define pinTriggerFR 9
#define pinEchoFM 10
#define pinTriggerFM 11
#define pinEchoFL 12
#define pinTriggerFL 13

#define S_NUM 6


/*
  F -> FRONT | B -> BACK
  L -> SINISTRA | R -> DESTRA | M -> CENTRO
  ORDINE SENSORI
  back-left
  back-middle
  back-right
  front-right
  front-middle
  front-left
*/

int pinsTrigger[] = {pinTriggerBL, pinTriggerBM, pinTriggerBR, pinTriggerFR, pinTriggerFM, pinTriggerFL};
int pinsEcho[] = {pinEchoBL, pinEchoBM, pinEchoBR, pinEchoFR, pinEchoFM, pinEchoFL};

void setup()
{
  for (int i = 0; i < S_NUM; i++) {
    pinMode(pinsTrigger[i], OUTPUT);
    pinMode(pinsEcho[i], INPUT);
  }

  Serial.begin(115200);
}


void loop()
{
  if (Serial.available() > 0) {
    Serial.read();
    double distances[S_NUM];

    for (int i = 0; i < S_NUM; i++) {
      distances[i] = calcDistance(pinsTrigger[i], pinsEcho[i]);
//      delay(5);
    }
    String jsonString = toJSON(distances[0], distances[1], distances[2], distances[3], distances[4], distances[5]);
    Serial.println(jsonString);
  }
}

double calcDistance(int pinTrigger, int pinEcho) {
  digitalWrite(pinTrigger, LOW);
  digitalWrite(pinTrigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(pinTrigger, LOW);

  long durata = pulseIn(pinEcho, HIGH);
  double distance = durata / 29 / 2;
  return distance;
}

String toJSON(double bl, double bm, double br, double fr, double fm, double fl) {
  StaticJsonDocument<200> doc;
  doc["fl"] = fl;
  doc["fm"] = fm;
  doc["fr"] = fr;
  doc["bl"] = bl;
  doc["bm"] = bm;
  doc["br"] = br;

  String jsonData;
  serializeJson(doc, jsonData);
  return jsonData;
}
