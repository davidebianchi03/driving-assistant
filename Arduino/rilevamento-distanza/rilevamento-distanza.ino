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

int pinsTrigger[] = {3, 5, 7, 9, 11, 13};
int pinsEcho[] = {2, 4, 6, 8, 10, 12};

void setup()
{
  for (int i = 0; i < S_NUM; i++) {
    pinMode(pinsTrigger[i], OUTPUT);
    pinMode(pinsEcho[i], INPUT);
  }

  Serial.begin(9600);
}


void loop()
{ /*
    double[] distances = {}
    for (int i = 0; i < S_NUM; i++) {
     double distance = calcDistance(pinsTrigger[i], pinsEcho[i]);
     Serial.print(String(i) + " --");
     //Serial.println(distance);
     Serial.println(toJSON(

    }
    calcDistance(pinTriggerFL, pinEchoFL);*/
  double distances[6];

  for (int i = 0; i < 6; i++) {
    distances[i] = calcDistance(pinsTrigger[i], pinsEcho[i]);
    delay(10);
  }
  String jsonString = toJSON(distances[0], distances[1], distances[2], distances[3], distances[4], distances[5]);

}

double calcDistance(int pinTrigger, int pinEcho) {
  digitalWrite(pinTrigger, LOW);
  digitalWrite(pinTrigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(pinTrigger, LOW);

  long durata = pulseIn(pinEcho, HIGH);
  double distance = durata / 58.31;
  return distance;
}


String toJSON(double bl, double bm, double, br, double fr, double fm, double fl) {
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
