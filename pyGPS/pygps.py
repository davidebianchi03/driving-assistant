from unittest import result
import serial#pyserial module
import pynmea2#libreria per la conversione della posizione dal formato NMEA
import io

class pygps:

    #Porta seriale alla quale è connesso il GPS
    serial_port = None
    sio = None
    #baudrate della seriale del gps
    BAUDRATE = 9600

    def __init__(self, serialport_name):
        #inizializzo la porta seriale
        self.serial_port = serial.Serial()
        self.serial_port.baudrate = self.BAUDRATE
        self.serial_port.port = serialport_name#!!!!devo riuscire a prendere la porta in automatico
        self.serial_port.timeout = 0.5
        self.serial_port.open()
        #inizializzo il sio
        self.sio = io.TextIOWrapper(io.BufferedRWPair(self.serial_port, self.serial_port))

    #Metodo per ottenere le coordinate
    def GetPosition(self):
        result_dict = dict()
        try:
            line = self.sio.readline()
            msg = pynmea2.parse(line)
            result_dict["latitude"] = msg.latitude
            result_dict["longitude"] = msg.longitude
            result_dict["time"] = msg.timestamp
            result_dict["date"] = msg.datestamp
            result_dict["speed"] = msg.spd_over_grnd
            result_dict["valid"] = True
        except serial.SerialException as e:
            result_dict["valid"] = False
        except pynmea2.ParseError as e:
            result_dict["valid"] = False
        except:
            result_dict["valid"] = False

        return result_dict