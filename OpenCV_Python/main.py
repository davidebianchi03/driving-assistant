import cv2
import numpy as np 

#cap = cv2.VideoCapture('video.avi')
cap = cv2.VideoCapture(0)

while(True):
    ret, frame = cap.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  
    
    blur = cv2.GaussianBlur(gray, (7,7), 0)
    edges = cv2.Canny(blur, 100, 100)

    img_hsv = cv2.cvtColor(blur, cv2.COLOR_RGB2HSV)
    lower_yellow = np.array([20,100,100], dtype = 'uint8')
    upper_yellow = np.array([30,255,255], dtype = 'uint8')

    mask_yellow = cv2.inRange(img_hsv, lower_yellow, upper_yellow)
    mask_white = cv2.inRange(gray, 200, 255)
    mask_yw = cv2.bitwise_or(mask_white, mask_yellow)
    mask_yw_image = cv2.bitwise_and(gray, mask_yw)



    #cv2.imshow('frame', frame)
    #cv2.imshow('gray', gray)
    #cv2.imshow('blur', blur)
    cv2.imshow('edges', edges)
    cv2.imshow('linee', mask_yw_image)
    


    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows() 