
from django.urls import path
from. import views
from. import notificationDetail

urlpatterns = [
    path('prodcuts/',views.index),
    path('file/<int:file_id>/', notificationDetail.index, name='file_id'),
    path('get/file/<int:file_id>',notificationDetail.getFile,name='file_id'),
    path('get/notifylists/<int:page_number>',notificationDetail.getPageDate,name='page_number')


]