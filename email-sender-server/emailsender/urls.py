from django.urls import path
from . import views

app_name = "emailsender"

urlpatterns = [
    path('sendemail', views.sendEmailView, name = 'send_email'),
]
