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

eel.start('index.html')