from turtle import position
import eel
from pygps import *
from pyspeak import *
import json
from textblob import TextBlob

eel.init('web')

speechsynthetizer = pySpeak(language='it')

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
    #traduco il comando in italiano
    blob = TextBlob(str(text))
    text = blob.translate(from_lang='en', to='it')
    #pronuncio la frase
    speechsynthetizer.Speak(str(text))

eel.start('index.html')