from cv2 import cv2
from imgTransformation import transform


cascade_src = "cars.xml"
video_src = "video2.mp4"

cap = cv2.VideoCapture(video_src)
car_cascade = cv2.CascadeClassifier(cascade_src)

transform = transform()

while cap.isOpened():
    ret, img = cap.read()
    if(type(img) == type(None)):
        break
    
    gray = transform.toGray(img)
    cars = car_cascade.detectMultiScale(gray, 1.1, 1)
    
    for (x, y, w, h) in cars:
        cv2.rectangle(img, (x, y), (x + w, y + h),(0, 0, 255), 2)
        print("x", x, "y", y, "w", w, "h", h)
    
    cv2.imshow("image", img)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
                break
 
cap.release()
cv2.destroyAllWindows()    
