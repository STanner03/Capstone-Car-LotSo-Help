from django.db import models
from authentication.models import User
# from make.models import Make
# from model.models import Model

# Create your models here.

class Vehicle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vin = models.CharField(max_length=30)
    name = models.CharField(max_length=30)
    type = models.CharField(max_length=20)
    make = models.CharField(max_length=30)
    model = models.CharField(max_length=30)
    year = models.IntegerField()
    color = models.CharField(max_length=30)
    active = models.BooleanField()
    odometer = models.IntegerField()
