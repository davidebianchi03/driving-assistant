import time
import sys
from pygps import *

gps = pygps()

while True:
     result = gps.GetPosition()
     print(result)
  
