from django.contrib import admin
from django.urls import path,include
from. import views
from django.views.generic import TemplateView
urlpatterns = [
    path('',views.index),
    #path('base-page/', TemplateView.as_view(template_name='base.html'),name='base_page'),

]