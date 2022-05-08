import base64
import cv2
from matplotlib import pyplot as plt
import numpy as np

class Detect:

    # dispositivo di cattura video anteriore
    frontCap = None
    # dispositivo di cattura video posteriore
    backCap = None
    # thread che processa il video
    videoProcessingThread = None
    # ultima immagine catturata dalla telecamera anteriore
    lastFrontImage = None
    # oggetto utilizzato per l'identificazione degli ostacoli che sono persone
    hog = None

    def __init__(self, frontCapDevice, backCapDevice ):
        self.frontCap = cv2.VideoCapture(frontCapDevice)
        self.backCap = cv2.VideoCapture(backCapDevice)
        self.hog = cv2.HOGDescriptor()
        self.hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

    #zone --> bl, bm, br, fl, fm, fr
    def DetectAll(self):
        #catturo le immagini e nascondo le parti che non mi interessano
        result = dict()
        # TELECAMERA ANTERIORE
        if self.frontCap.isOpened():
            ret, frontImage = self.frontCap.read()
            height, width, channel = frontImage.shape
            points = np.array([[(int(width/3),0),(int(width/3),height),(width,height),(width,0)]])
            boxes, weights = self.hog.detectMultiScale(frontImage, winStride = (4, 4), padding = (8, 8), scale = 1.03)
            for (x, y, w, h) in boxes:
                result["frontPerson"] = True
                break                    
            
            # TELECAMERA POSTERIORE
            if self.backCap.isOpened():
                ret, backImage = self.backCap.read()
                height, width, channel = backImage.shape
                
                points = np.array([[(0,0),(2*int(width/3),0), (2*int(width/3),height),(0,height)]])
                boxes, weights = self.hog.detectMultiScale(backImage, winStride = (4, 4), padding = (8, 8), scale = 1.03)
                for (x, y, w, h) in boxes:
                    result["backPerson"] = True
                    break  
                    
            if cv2.waitKey(1) & 0xFF == ord('q'):
                pass

        return result

    def GetBase64Images(self):
        result = dict()
        # TELECAMERA ANTERIORE
        if self.frontCap.isOpened():
            ret, frontImage = self.frontCap.read()
            retval, buffer = cv2.imencode('.jpg', frontImage)
            result["frontCamera"] = base64.b64encode(buffer).decode()
        else:
            result["frontCamera"] = None

        # TELECAMERA POSTERIORE
        if self.backCap.isOpened():
            ret, backImage = self.backCap.read()
            retval, buffer = cv2.imencode('.jpg', backImage)
            result["backCamera"] = base64.b64encode(buffer).decode()
        else:
            result["backCamera"] = None

        return result

