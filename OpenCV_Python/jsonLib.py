import json

class myJSON:
    def lineToJSON(self, x1, y1, x2, y2):
        line = dict()
        line["x1"]= int(x1)
        line["y1"]= int(y1)
        line["x2"]= int(x2)
        line["y2"]= int(y1)
        
        return json.dumps(line)
  