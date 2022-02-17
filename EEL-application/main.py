import eel
from pygps import *
import json

eel.init('web')

gps = pygps('COM5')
gps.Start()

#metodo richiamato da javascript per ottenere la posizione
@eel.expose    
def GetPosition():
    return json.dumps(gps.GetLastKnownPosition())

eel.start('index.html')