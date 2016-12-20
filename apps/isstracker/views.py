from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
from .models import *

import urllib2
import json

# Create your views here.
def index(request):
	return render(request, 'isstracker/index.html')

def flyby(request):
	return redirect(reverse('index'))
		