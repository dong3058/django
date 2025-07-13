from django.urls import path,include
from. import views


urlpatterns = [
    path('',views.index),
    #path('base-page/', TemplateView.as_view(template_name='base.html'),name='base_page'),

]