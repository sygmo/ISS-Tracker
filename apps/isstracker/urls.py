from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^flyby$', views.flyby, name='flyby'),
	url(r'^alerts$', views.alerts, name='alerts'),
	url(r'^send_text$', views.send_text, name='send_text'),
]