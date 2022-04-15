import json
import time
from threading import Thread
import cv2
from matplotlib import pyplot as plt
import numpy as np

class Detect:

    #dispositivo di cattura video anteriore
    frontCap = None
    #dispositivo di cattura video posteriore
    backCap = None
    #thread che processa il video
    videoProcessingThread = None
    #ultima immagine catturata dalla telecamera anteriore
    lastFrontImage = None

    hog = None

    def ThreadMethod(self):
        while True:
            time.sleep(0.03)
            print(json.dumps(self.DetectAll(False, False, False, True, True, True)))

    def __init__(self, frontCapDevice, backCapDevice ):
        self.frontCap = cv2.VideoCapture(frontCapDevice)
        self.backCap = cv2.VideoCapture(backCapDevice)
        self.videoProcessingThread = Thread(target=self.ThreadMethod)
        self.hog = cv2.HOGDescriptor()
        self.hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

    def Start(self):
        self.videoProcessingThread.start()    

    #zone --> bl, bm, br, fl, fm, fr
    def DetectAll(self, bl, bm, br, fl, fm, fr):
        #catturo le immagini e nascondo le parti che non mi interessano
        result = dict()
        if self.frontCap.isOpened():
            ret, frontImage = self.frontCap.read()
            height, width, channel = frontImage.shape
            fillColor = (0,0,0)
            if fl:#front-left
                flImage = frontImage.copy()
                points = np.array([[(int(width/3),0),(int(width/3),height),(width,height),(width,0)]])
                cv2.fillPoly(flImage, np.int32(points), fillColor)
                boxes, weights = self.hog.detectMultiScale(flImage, winStride = (4, 4), padding = (8, 8), scale = 1.03)
                boxes = np.array([[x, y, x + w, y + h] for (x, y, w, h) in boxes])
                if boxes.size > 0:
                    result["fl"] = "person"
                # cv2.imshow('imageFL',flImage)
            if fm:#front-middle
                fmImage = frontImage.copy()
                points = np.array([[(0,0),(width/3,0),(width/3,height),(0,height)]])
                cv2.fillPoly(fmImage, np.int32(points), fillColor)
                points = np.array([[(2*(width/3),0), (width,0), (width,height), (2*(width/3),height)]])
                cv2.fillPoly(fmImage, np.int32(points), fillColor)
                boxes, weights = self.hog.detectMultiScale(fmImage, winStride = (4, 4), padding = (8, 8), scale = 1.03)
                boxes = np.array([[x, y, x + w, y + h] for (x, y, w, h) in boxes])
                if boxes.size > 0:
                    result["fm"] = "person"
                # cv2.imshow('imageFR',fmImage)
            if fr:#front-right
                frImage = frontImage.copy()
                points = np.array([[(0,0),(2*int(width/3),0), (2*int(width/3),height),(0,height)]])
                cv2.fillPoly(frImage, np.int32(points), fillColor)
                boxes, weights = self.hog.detectMultiScale(frImage, winStride = (4, 4), padding = (8, 8), scale = 1.03)
                boxes = np.array([[x, y, x + w, y + h] for (x, y, w, h) in boxes])
                if boxes.size > 0:
                    result["fr"] = "person"
                # cv2.imshow('imageFR',frImage)



            if cv2.waitKey(1) & 0xFF == ord('q'):
                pass

            return result