from opcode import opname
from turtle import position
import eel
from matplotlib.font_manager import json_dump
from pygps import *
from pyspeak import *
from pydistance import *
import json
from textblob import TextBlob
import os
from detect import Detect
from pyBeep import *

gps_connected = False
gps = None

distance_connected = False
distance = None

eel.init('web')

speechsynthetizer = pySpeak(language='it')

detector = Detect(1,0)

#inizializzazione del modulo gps(se connesso)
try:
    gps = pygps()
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
        try:
            survey = gps.GetPosition()
            survey["gps_connected"] = True
            jsonString = json.dumps(survey)
            return jsonString
        except:
            gps_connected = False
            response = dict()
            response["gps_connected"] = False
            jsonString = json.dumps(response)
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
        try:
            return distance.ReadDistance()
        except:
            distance_connected = False
            response = dict()
            response["connected"] = False
            jsonString = json.dumps(response)
            return jsonString
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

@eel.expose
def UpdateSettings(server_url, distances, useCameras, beep):
    settings_dict = dict()
    settings_dict["server_url"] = server_url
    settings_dict["distances"] = json.loads(distances)
    settings_dict["useCamera"] = useCameras
    settings_dict["beep"] = beep
    #salvo la stringa json con le impostazioni nel file
    settings_file = open('settings.json','w')
    settings_file.write(json.dumps(settings_dict))
    settings_file.close()

@eel.expose
def GetSettings():
    try:
        settings_json = ''
        settings_file = open('settings.json','r')
        settings_json = settings_file.read()
        settings_file.close()
        if not (settings_json == ''):
            response = json.loads(settings_json)
            response["valid"] = True
            return json.dumps(response)
        else:
            response = dict()
            response["valid"] = False
            return json.dumps(response)
    except:
        response = dict()
        response["valid"] = False
        return json.dumps(response)

@eel.expose
def UpdateCredentials(userId, username, accessToken):
    credentials_dict = dict()
    credentials_dict['user_id'] = userId
    credentials_dict['username'] = username
    credentials_dict['access_token'] = accessToken
    credentials_file = open('credentials.json','w')
    credentials_file.write(json.dumps(credentials_dict))
    credentials_file.close()

@eel.expose
def GetCredentials():
    try:
        credentials_json = ''
        credentials_file = open('credentials.json','r')
        credentials_json = credentials_file.read()
        credentials_file.close()
        if not (credentials_json == ''):
            response = json.loads(credentials_json)
            response["valid"] = True
            return json.dumps(response)
        else:
            response = dict()
            response["valid"] = False
            return json.dumps(response)
    except:
        response = dict()
        response["valid"] = False
        return json.dumps(response)

@eel.expose
def Logout():
    os.remove('credentials.json')

@eel.expose
def Restart():
    os.system("shutdown /r /t 1")

@eel.expose
def GetCamerasImages():
    return json.dumps(detector.GetBase64Images())

@eel.expose
def GetObstacles():
    return json.dumps(detector.DetectAll())

@eel.expose
def Beep(count):
    MakeBeep(count=count)

def CloseCallback():
    try:
        global gps
        gps.CloseSerial()
    except:
        pass

eel.start('index.html', allowed_prefixs=['start-with-me'],close_callback=CloseCallback)
