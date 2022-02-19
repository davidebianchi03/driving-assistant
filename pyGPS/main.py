import time
import sys
from pygps import *

gps = pygps(serialport_name='COM10')
gps.SerialAutoDetect()
# gps.Start()

# while True:
#     result = gps.GetLastKnownPosition()
#     if (not result == None) and result['valid']:
#         print("Coordinates", result['latitude'], ',',result['longitude'])
#         print("Time:", result['time'], " Date:", result['date'])
#         print("Speed:", result['speed']*3.6)
#         print()
#         time.sleep(1)