import serial.tools.list_ports
import serial#pyserial module
import io
import time

class pydistance:
    serial_port = None
    BAUDRATE = 115200
    sio = None

    def detectSerialPort(self):
        # Get list of available serial ports
        ports = list(serial.tools.list_ports.comports())
        arduino_port_name = None
        for port in ports:# Search arduino between available ports
            if "Arduino" in port.description:
                arduino_port_name = port.name
        
        return arduino_port_name

    def __init__(self):
        serialport_name = self.detectSerialPort()
        self.serial_port = serial.Serial()
        self.serial_port.baudrate = self.BAUDRATE
        self.serial_port.port = serialport_name
        self.serial_port.timeout = 1
        self.serial_port.open()
        time.sleep(3)

    def ReadDistance(self):
        self.serial_port.write(bytes('g', 'utf-8'))
        # time.sleep(0.5)
        raw_data = self.serial_port.readline()
        raw_data.decode('Ascii')
        data = str(raw_data[0:len(raw_data)-2].decode("utf-8"))
        return data