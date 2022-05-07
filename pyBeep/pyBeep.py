from time import time
import winsound
import time

def MakeBeep(count):
    for i in range(0,count + 1):
        winsound.Beep(490, int((1000 / int(count))) - 50)
        time.sleep(0.05)