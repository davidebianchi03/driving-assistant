import cv2
import numpy as np 
import matplotlib.pyplot as plt

def cannyImage(image):
    #trasforma l'immagine originale in una nuova immagine con meno dettagli da analizzare
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)   
    blur = cv2.GaussianBlur(gray, (7,7), 0)
    edges = cv2.Canny(blur, 50, 100)
    return edges

def regionOfInterest(image):
    #ritaglia un triangolo nella parte inferiore dell'immagine
    #per identificare solamente la carreggiata
    height = image.shape[0]
    width = image.shape[1]
    #triangolo definito nella parte inferiore dell'immagine 
    triangle = np.array([[(0, height - 1), (width - 1, height - 1), (width / 2 + 50, height/ 2  )]])
    mask = np.zeros_like(image)
    cv2.fillPoly(mask, np.int32(triangle), 255)
    cut = cv2.bitwise_and(image, mask)
    return cut

def displayLines(image, lines):
    lineImage = np.zeros_like(image)
    if lines is not None:
        for line in lines:
           x1, y1, x2, y2 = line.reshape(4)
           cv2.line(frame, (x1, y1), (x2, y2), (0, 255, 0), 10)
    return lineImage


cap = cv2.VideoCapture('video.mp4')
#cap = cv2.VideoCapture(1)
while(True):
    ret, frame = cap.read()
    #solo in caso di video, al termine viene rivisualizzato
    #da togliere in futuro
    if not ret:
        cap = cv2.VideoCapture('video.mp4')
        continue
    
    canny_Image = cannyImage(frame)
    roi = regionOfInterest(canny_Image)

    lines = cv2.HoughLinesP(roi, 2, np.pi / 180, 100, np.array([]), minLineLength = 40, maxLineGap = 5)

    linesImage =  displayLines(roi, lines)

    cv2.imshow('frame', frame)
    cv2.imshow('canny', canny_Image)
    #cv2.imshow('roi', roi)
    cv2.imshow('lines', linesImage)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows() 