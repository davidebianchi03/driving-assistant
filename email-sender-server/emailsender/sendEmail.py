from os import terminal_size
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from threading import Thread

smtp_server = ""
sender_email = ""
password = ""
username = ""
port = 465  # For SSL

def sendEmail(receiver_email, subject,body):
    # t = Thread(target=thread_sendEmail, args=(receiver_email, subject, body))
    # t.start()
    return thread_sendEmail(receiver_email, subject,body)

def thread_sendEmail(receiver_email, subject,body):
    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = sender_email
    message["To"] = receiver_email

    # Create the plain-text and HTML version of your message

    html = """\
<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml" lang="en">

<head>
    <link rel="stylesheet" type="text/css" hs-webfonts="true"
        href="https://fonts.googleapis.com/css?family=Lato|Lato:i,b,bi">
    <title>Email template</title>
    <meta property="og:title" content="Email template">

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style type="text/css">
        a {
            text-decoration: underline;
            color: inherit;
            font-weight: bold;
            color: #253342;
        }

        h1 {
            font-size: 56px;
        }

        h2 {
            font-size: 28px;
            font-weight: 900;
        }

        p {
            font-weight: 100;
        }

        td {
            vertical-align: top;
        }

        #email {
            margin: auto;
            width: 90vw;
            background-color: white;
        }

        button {
            font: inherit;
            background-color: #FF7A59;
            border: none;
            padding: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 900;
            color: white;
            border-radius: 5px;
            box-shadow: 3px 3px #d94c53;
        }

        .subtle-link {
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #CBD6E2;
        }

        #logo{
            width: 75%;
            margin-top: 25px;
            padding-top: 100px;
            padding-bottom: 100px;
        }
    </style>

</head>

<body bgcolor="#F5F8FA"
    style="width: 90%; margin: auto 0; padding:0; font-family:Lato, sans-serif; font-size:18px; color:#33475B; word-break:break-word">

    <! View in Browser Link -->

        <div id="email">
            <! Banner -->
                <table role="presentation" width="100%">
                    <tr>

                        <td align="center" style="color: white;background-color: rgb(10, 22, 185);">

                            <img alt="Logo"
                                src="http://drivingassistant.altervista.org/img/logo_white_large.png"
                                 align="middle" id = "logo">

                        </td>
                </table>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="10px"
                        style="padding: 30px 30px 30px 60px;">
                        <tr>
                            <td>
                                <p>
                                    """+body+"""
                                </p>
                            </td>
                        </tr>
                    </table>



                    <table role="presentation" bgcolor="#F5F8FA" width="100%">
                        <tr>
                            <td align="left" style="padding: 30px 30px;">
                                <p style="color:#99ACC2">&copy; - Driving Assistant 2022</p>
                            </td>
                        </tr>
                    </table>
        </div>
</body>

</html>
    """

    try:

        # Turn these into plain/html MIMEText objects
        part1 = MIMEText(html, "html")

        # Add HTML/plain-text parts to MIMEMultipart message
        # The email client will try to render the last part first
        message.attach(part1)

        # Create secure connection with server and send email
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(
                sender_email, receiver_email, message.as_string()
            )
        return (True, '')
    except Exception as ex:
        return (False, ex)