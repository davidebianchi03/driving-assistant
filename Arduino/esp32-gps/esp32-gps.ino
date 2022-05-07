#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include <TinyGPS.h>

//modulo gps
TinyGPS gps;//GPS
SoftwareSerial softSerial(16, 17); // rx, tx

void setup() {
  Serial.begin(115200);
  //inizializzazione del modulo gps
  softSerial.begin(9600);
}

bool gpsPositionValid = false;
float latitude, longitude, speed, bearing;

void loop() {
  bool newData = false;

  if (Serial.available()) {
    Serial.read();
    //rispondo con i dati dell'ultima rilevazione GPS se disponibili
    StaticJsonDocument<200> doc;

    if (gpsPositionValid) {
      doc["latitude"] = latitude;
      doc["longitude"] = longitude;
      doc["speed"] = speed;
      doc["bearing"] = bearing;
      doc["valid"] = true;
    }
    else {
      doc["valid"] = false;
    }

    String jsonData;
    serializeJson(doc, jsonData);
    Serial.println(jsonData);
  }

  //quando rilevo qualcosa in arrivo da seriale faccio l'update della posizione
  while (softSerial.available()) {
    char c = softSerial.read();
    if (gps.encode(c)) {
      newData = true;
    }
  }

  if (newData) {
    gpsPositionValid = true;
    float flat, flon;
    unsigned long age;
    gps.f_get_position(&flat, &flon, &age);
    //Serial.print("LAT=");
    latitude = flat == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : flat, 6;
    //Serial.println(latitude);
    //Serial.print("LON=");
    longitude = flon == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : flon, 6;
    //Serial.println(longitude);
    //Serial.print("SPEED=");
    speed = gps.f_speed_kmph();
    //Serial.println(speed);
    //Serial.print("BEARING=");
    bearing = gps.f_course();
    //Serial.println(bearing);
  }


}
