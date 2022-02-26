#TRADUZIONE FATTA CON TEXTBLOB
from textblob import TextBlob
from pyspeak import *
speak = pySpeak("it")
blob = TextBlob('in 133 meters, head north on via giacomo leopardi')
text = blob.translate(from_lang='en', to='it')
text = str(text)
speak.Speak(text=text)

#TRADUZIONE FATTA CON API GOOGLE
# from googletrans import Translator
# from pyspeak import *
# text = 'in 133 meters, head north on via giacomo leopardi'
# translator = Translator()
# result = translator.translate(text , dest ='it', src='en').text
# speak.Speak(text=result)
# print(result)
