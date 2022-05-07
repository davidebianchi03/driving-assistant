from concurrent.futures import thread
import json
import threading
import time
from unittest import result
import serial.tools.list_ports
import serial#pyserial module
import io

"""
    Ogni 100ms aggiorno la posizione tramite il GPS. L'aggiornamento viene fatto tramite un thread apposito.
    Gli utenti potranno accedere all'ultima posizione rilevata attraverso un apposito metodo
"""

class pygps:

    #Porta seriale alla quale è connesso il GPS
    serial_port = None
    #baudrate della seriale del gps
    BAUDRATE = 115200

    #auto-detect della porta seriale del gps
    def detectSerialPort(self):
        serial_list = list(serial.tools.list_ports.comports())
        gps_port_name = None
        for port in serial_list:
            if not (port.manufacturer.find('Silicon Labs') == -1):#da cambiare con il produttore dell'interfaccia seriale del gps
                gps_port_name = port.name
            #print(port.manufacturer, port.name)
        return gps_port_name

    def __init__(self):
        try:
            serialport_name = self.detectSerialPort()
            #inizializzo la porta seriale
            self.serial_port = serial.Serial()
            #print(serialport_name)
            self.serial_port.baudrate = self.BAUDRATE
            self.serial_port.port = serialport_name
            self.serial_port.timeout = 0.5
            self.serial_port.open()
        except Exception as e:
            print(e)
            assert(False,'GPS non connesso')

    
    def GetPosition(self):
        self.serial_port.write(bytes('g', 'utf-8'))
        raw_data = self.serial_port.readline()
        raw_data.decode('Ascii')
        data = str(raw_data[0:len(raw_data)-2].decode("utf-8"))
        return json.loads(data)

    #metodo per rilasciare la porta seriale
    def CloseSerial(self):
        self.serial_port.close()