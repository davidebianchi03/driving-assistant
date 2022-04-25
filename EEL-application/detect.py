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
    def DetectAll(self, bl, bm, br, fl, fm, fr):
        #catturo le immagini e nascondo le parti che non mi interessano
        result = dict()
        # TELECAMERA ANTERIORE
        if self.frontCap.isOpened():
            ret, frontImage = self.frontCap.read()
            height, width, channel = frontImage.shape
            fillColor = (0,0,0)
            if fl:#front-left
                #detect delle persone
                flImage = frontImage.copy()
                points = np.array([[(int(width/3),0),(int(width/3),height),(width,height),(width,0)]])
                cv2.fillPoly(flImage, np.int32(points), fillColor)
                boxes, weights = self.hog.detectMultiScale(flImage, winStride = (4, 4), padding = (8, 8), scale = 1.03)
                for (x, y, w, h) in boxes:
                    result["fl"] = "person"
                    break                    
            if fm:#front-middle
                #detect delle persone
                fmImage = frontImage.copy()
                points = np.array([[(0,0),(width/3,0),(width/3,height),(0,height)]])
                cv2.fillPoly(fmImage, np.int32(points), fillColor)
                points = np.array([[(2*(width/3),0), (width,0), (width,height), (2*(width/3),height)]])
                cv2.fillPoly(fmImage, np.int32(points), fillColor)
                boxes, weights = self.hog.detectMultiScale(fmImage, winStride = (4, 4), padding = (8, 8), scale = 1.03)
                for (x, y, w, h) in boxes:
                    result["fm"] = "person"
                    break  
            if fr:#front-right
                #detect delle persone
                frImage = frontImage.copy()
                points = np.array([[(0,0),(2*int(width/3),0), (2*int(width/3),height),(0,height)]])
                cv2.fillPoly(frImage, np.int32(points), fillColor)
                boxes, weights = self.hog.detectMultiScale(frImage, winStride = (4, 4), padding = (8, 8), scale = 1.03)
                for (x, y, w, h) in boxes:
                    result["fr"] = "person"
                    break  

            # TELECAMERA POSTERIORE
            if self.backCap.isOpened():
                ret, backImage = self.backCap.read()
                height, width, channel = backImage.shape
                fillColor = (0,0,0)
                if bl:#back-left
                    #detect delle persone
                    blImage = backImage.copy()
                    points = np.array([[(0,0),(2*int(width/3),0), (2*int(width/3),height),(0,height)]])
                    cv2.fillPoly(blImage, np.int32(points), fillColor)
                    boxes, weights = self.hog.detectMultiScale(blImage, winStride = (4, 4), padding = (8, 8), scale = 1.03)
                    for (x, y, w, h) in boxes:
                        result["bl"] = "person"
                        break  
                    if bm:#back-middle
                        #detect delle persone
                        bmImage = backImage.copy()
                        points = np.array([[(0,0),(width/3,0),(width/3,height),(0,height)]])
                        cv2.fillPoly(bmImage, np.int32(points), fillColor)
                        points = np.array([[(2*(width/3),0), (width,0), (width,height), (2*(width/3),height)]])
                        cv2.fillPoly(bmImage, np.int32(points), fillColor)
                        boxes, weights = self.hog.detectMultiScale(bmImage, winStride = (4, 4), padding = (8, 8), scale = 1.03)
                        for (x, y, w, h) in boxes:
                            result["bm"] = "person"
                            break  
                    if br:#back-right
                        #detect delle persone
                        brImage = backImage.copy()
                        points = np.array([[(int(width/3),0),(int(width/3),height),(width,height),(width,0)]])
                        cv2.fillPoly(brImage, np.int32(points), fillColor)
                        boxes, weights = self.hog.detectMultiScale(brImage, winStride = (4, 4), padding = (8, 8), scale = 1.03)
                        for (x, y, w, h) in boxes:
                            result["br"] = "person"
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

