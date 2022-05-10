from gtts import gTTS
import os
import playsound

"""
    Classe che serve per fare parlare python in modo da dare le indicazioni stradali
"""

class pySpeak:

    #lingua della frase da pronunciare
    language = None

    def __init__(self, language):
        self.language = language

    #metodo usato per parlare
    def Speak(self, text):
        #sintetizzo il testo e lo salvo in un file mp3
        obj = gTTS(text=text, lang=self.language, slow=False)
        obj.save('output.mp3')
        #riproduco il file mp3
        # mixer.init()
        # mixer.music.load('output.mp3')
        # mixer.music.play() 
        # while mixer.music.get_busy():
        #     continue
        # #una volta finista la riproduzione carico un file vuoto ed elimino il file con l'istruzione
        # mixer.music.load("empty.mp3")#c
        playsound.playsound('output.mp3')
        os.remove('output.mp3')

