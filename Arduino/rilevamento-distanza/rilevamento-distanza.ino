//F -> FRONT | B -> BACK
//L -> SINISTRA | R -> DESTRA | M -> CENTRO
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
{
  for (int i = 0; i < S_NUM; i++) {
    double distance = calcDistance(pinsTrigger[i], pinsEcho[i]);
    Serial.print(String(i) + " --");
    Serial.println(distance);

  }
  calcDistance(pinTriggerFL, pinEchoFL);
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


class Rilevazione {
  public:
    String sensorName;
    double sensorDistance;
    Rilevazione(String name, double distance);

  private:
}
