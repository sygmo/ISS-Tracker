from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
from .models import *

import urllib2
import json
import datetime
from twilio.rest import TwilioRestClient
import re
PHONE_REGEX = "(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})"

# Create your views here.
def index(request):
	return render(request, 'isstracker/index.html')

def flyby(request):
	lat = request.POST['latitude']
	lon = request.POST['longitude']
	num_requests = 1

	req = urllib2.Request("http://api.open-notify.org/iss-pass.json?lat="+lat+"&lon="+lon)
	response = urllib2.urlopen(req)

	obj = json.loads(response.read())

	print obj['request']['latitude'], obj['request']['longitude']
	risetime  = obj['response'][0]['risetime']
	duration = obj['response'][0]['duration']
	context = {
		"risetime" : datetime.datetime.fromtimestamp(int(risetime)).strftime('%Y-%m-%d %H:%M:%S'),
		"duration" : datetime.datetime.fromtimestamp(int(duration)).strftime('%H:%M:%S')
	}
	return render(request, 'isstracker/index.html', context)

def alerts(request):
	return render(request, 'isstracker/alerts.html')

def send_text(request):


    # put your own credentials here
    ACCOUNT_SID = 'ACc022fdb20f6948e903e0afe16633354e'
    AUTH_TOKEN = '3a611c434fc6cfb68da5428341a59b0d'

    client = TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN)

    client.messages.create(
        to = '+18177160221',
        from_ = '+14697897180',
        body = 'Twilio test',
    )
    return redirect(reverse('index'))
		