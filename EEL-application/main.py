from turtle import position
import eel
from pygps import *
from pyspeak import *
from pydistance import *
import json
from textblob import TextBlob

gps_connected = False
gps = None

distance_connected = False
distance = None

eel.init('web')

speechsynthetizer = pySpeak(language='it')

#inizializzazione del modulo gps(se connesso)
try:
    gps = pygps()
    gps.Start()
    gps_connected = True
except:
    gps_connected = False

#inizializzazione di arduino per il rilevamento degli ostacoli (se connesso)
try:
    distance = pydistance()
    distance_connected = True
except:
    distance_connected = False

#metodo richiamato da javascript per ottenere la posizione
@eel.expose    
def GetPosition():
    global gps_connected
    global gps
    if  gps_connected:
        survey = gps.GetLastKnownPosition()
        survey["gps_connected"] = True
        jsonString = json.dumps(survey)
        return jsonString
    else:
        try:
            gps = pygps()
            gps.Start()
            gps_connected = True
        except:
            gps_connected = False

        response = dict()
        response["gps_connected"] = False
        jsonString = json.dumps(response)
        return jsonString

#metodo richiamato da javascript per fare pronunciare una frase a python
@eel.expose   
def Speak(text):
    #traduco il comando in italiano
    blob = TextBlob(str(text))
    print(str(text))
    text = blob.translate(from_lang='en', to='it')
    #pronuncio la frase
    speechsynthetizer.Speak(str(text))

#metodo richiamato da javascript per traddurre il testo
@eel.expose
def Translate(text):
    blob = TextBlob(str(text))
    text = str(blob.translate(from_lang='en', to='it'))
    #cerco di risolvere le pecche del traduttore
    text = text.replace("Turn Sharp", "Girare")
    return text

#metodo richiamato da javascript per ottenere le distanze rilevate dai sensori ad ultrasuoni
@eel.expose
def GetDistances():
    global distance
    global distance_connected
    if distance_connected == True:
        return distance.ReadDistance()
    else:
        try:
            distance = pydistance()
            distance_connected = True
        except:
            distance_connected = False
        response = dict()
        response["connected"] = False
        jsonString = json.dumps(response)
        return jsonString

eel.start('index.html')