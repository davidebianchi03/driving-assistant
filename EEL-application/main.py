import eel
from pygps import *
from pyspeak import *
import json

eel.init('web')

speechsynthetizer = pySpeak(language='en')

gps = pygps('COM10')
gps.Start()

#metodo richiamato da javascript per ottenere la posizione
@eel.expose    
def GetPosition():
    return json.dumps(gps.GetLastKnownPosition())

#metodo richiamato da javascript per fare pronunciare una frase a python
@eel.expose   
def Speak(text):
    speechsynthetizer.Speak(text)



eel.start('index.html')