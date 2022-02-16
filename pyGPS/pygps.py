from concurrent.futures import thread
import threading
from unittest import result
import serial#pyserial module
import pynmea2#libreria per la conversione della posizione dal formato NMEA
import io

"""
    Ogni 100ms aggiorno la posizione tramite il GPS. L'aggiornamento viene fatto tramite un thread apposito.
    Gli utenti potranno accedere all'ultima posizione rilevata attraverso un apposito metodo
"""

class pygps:

    #Porta seriale alla quale è connesso il GPS
    serial_port = None
    sio = None
    #baudrate della seriale del gps
    BAUDRATE = 9600
    #semaforo che serve per gestire l'accesso in lettura/scrittura alle coordinate dell'ultima posizione disponibile
    sem = None
    #thread che ascolta la posizione
    listening_thread = None
    #variabile che indica se il thread che ascolta la posizione è attivo
    listening_thread_running = False
    #ultima posizione disponibile
    last_known_position = None
    #semaforo per il controllo dell'accesso alla lettura della seriale
    sem_serial = None

    def __init__(self, serialport_name):
        #inizializzo la porta seriale
        self.serial_port = serial.Serial()
        self.serial_port.baudrate = self.BAUDRATE
        self.serial_port.port = serialport_name#!!!!devo riuscire a prendere la porta in automatico
        self.serial_port.timeout = 0.5
        self.serial_port.open()
        #inizializzo il sio
        self.sio = io.TextIOWrapper(io.BufferedRWPair(self.serial_port, self.serial_port))
        #inizializzo il thread
        self.listening_thread = threading.Thread(target= self.__ThreadMethod)
        self.listening_thread_running = False
        self.last_known_position = None
        #inizializzo il semaforo per l'accesso alla variabile dell'utlima posizione
        self.sem = threading.Semaphore(1)
        #inizializzo il semaforo per il controllo dell'accesso alla lettura della seriale
        self.sem_serial = threading.Semaphore(1)

    #Metodo per ottenere le coordinate
    def GetPosition(self):
        result_dict = dict()
        
        self.sem_serial.acquire()
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

        self.sem_serial.release()
        return result_dict

    #metodo per avviare il thread in ascolto della posizione
    def Start(self):
        self.listening_thread_running = True
        self.listening_thread.start()

    #metodo per fermare il thread in ascolto della posizione
    def Stop(self):
        self.listening_thread_running = False

    #metodo eseguito dal thread
    def __ThreadMethod(self):
        #Trobo l'id del main thread in modo da poter controllare se è ancora in funzione all'interno del ciclo
        main_thread_pid = None
        for i in threading.enumerate():
            if i.name == "MainThread":
                main_thread_pid = i

        #Ciclo principale di esecuzione del thread
        while self.listening_thread_running and main_thread_pid.is_alive():
            result = self.GetPosition()
            if result['valid']:
                self.sem.acquire()
                self.last_known_position = result
                self.sem.release()

    #metodo per ottenere l'ultima posizione disponibile
    def GetLastKnownPosition(self):
        self.sem.acquire()
        position = self.last_known_position
        self.sem.release()
        return position

    #metodo per rilasciare la porta seriale
    def CloseSerial(self):
        self.serial_port.close()