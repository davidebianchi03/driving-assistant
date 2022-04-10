import json
from django.views.decorators.csrf import csrf_exempt
from . import sendEmail
from django.http import HttpResponse

token = ""

@csrf_exempt
def sendEmailView(request):
    response_dict = dict()
    if request.method == "POST":
        request_body = json.loads(request.body.decode('UTF-8'))
        if 'token' in request_body.keys() and 'subject' in request_body.keys() and 'body' in request_body.keys() and 'reciver' in request_body.keys():
            if(request_body['token'] == token):
                result = sendEmail.sendEmail(receiver_email=request_body['reciver'],subject=request_body['subject'],body=request_body['body'])
                if result:
                    response_dict["result"] = "ok"
                else:
                    response_dict["result"] = "error"
                    response_dict["message"] = "error in sending the email"
            else:
                response_dict["result"] = "error"
                response_dict["message"] = "not authenticated"
        else:
            response_dict["result"] = "error"
            response_dict["message"] = 'all fields were not copleted correctly'
    else:
        response_dict["result"] = "error"
        response_dict["message"] = 'bad request method'
    return HttpResponse(json.dumps(response_dict))