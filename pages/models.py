from django.db import models

class NotificationFile(models.Model):
    title=models.CharField(max_length=100,null=True)
    content=models.TextField(null=True)
    document = models.FileField(upload_to='documents/',null=True)
    pub_date=models.DateTimeField(auto_now_add=True)