from django.db import models

# Create your models here.

class Make(models.Model):
    make_name = models.CharField(max_length=20)
    