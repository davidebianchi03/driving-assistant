from turtle import position
import eel
from pygps import *
from pyspeak import *
import json

eel.init('web')

speechsynthetizer = pySpeak(language='en')

gps = pygps()
gps.Start()

#metodo richiamato da javascript per ottenere la posizione
@eel.expose    
def GetPosition():
    survey = gps.GetLastKnownPosition()
    jsonString = json.dumps(survey)
    return jsonString

#metodo richiamato da javascript per fare pronunciare una frase a python
@eel.expose   
def Speak(text):
    speechsynthetizer.Speak(text)

eel.start('index.html')