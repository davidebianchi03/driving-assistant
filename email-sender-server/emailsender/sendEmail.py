from os import terminal_size
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from threading import Thread

smtp_server = ""
sender_email = ""
password = ""
port = 465  # For SSL

def sendEmail(receiver_email, subject, body):
    # t = Thread(target=thread_sendEmail, args=(receiver_email, subject, body))
    # t.start()
    to = [receiver_email]
    email_text = "From: "+sender_email+"\nTo: "+receiver_email+"\nSubject: "+subject+"\n\n"+body
    try:
        server = smtplib.SMTP_SSL(smtp_server, port)
        server.login(sender_email, password)
        server.sendmail(sender_email, to, email_text)
        return (True, '')
    except Exception as ex:
        return (False, ex)

def thread_sendEmail(receiver_email, subject, body):
    to = [receiver_email]
    email_text = "From: "+sender_email+"\nTo: "+receiver_email+"\nSubject: "+subject+"\n\n"+body
    try:
        server = smtplib.SMTP_SSL(smtp_server, port)
        server.login(sender_email, password)
        server.sendmail(sender_email, to, email_text)
    except Exception as ex:
        print(ex)