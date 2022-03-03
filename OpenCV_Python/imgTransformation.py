from cv2 import cv2

class transform:
    #def __init__(self, parametri)
    def toGray(self, image):
        gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
        return gray
        
        