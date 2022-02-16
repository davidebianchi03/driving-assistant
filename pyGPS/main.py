from pygps import *

gps = pygps(serialport_name='COM10')

while True:
    result = gps.GetPosition()
    if result['valid']:
        print("Coordinates", result['latitude'], ',',result['longitude'])
        print("Time:", result['time'], " Date:", result['date'])
        print("Speed:", result['speed']*3.6)
        print()