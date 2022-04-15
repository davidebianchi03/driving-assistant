from ast import While
import json
from detect import Detect

detector = Detect(0,1)
with open('out.json', 'w') as f:
    f.write(json.dumps(detector.GetBase64Images()))

# while True:
#     print(json.dumps(detector.DetectAll(True, True, True, False, False, False)))