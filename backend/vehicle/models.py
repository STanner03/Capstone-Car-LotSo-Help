from django.db import models
from authentication.models import User
from make.models import Make
from model.models import Model

# Create your models here.

class Vehicle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vin = models.CharField(max_length=30)
    vehicle_name = models.CharField(max_length=30)
    vehicle_type = models.CharField(max_length=20)
    make = models.ForeignKey(Make, on_delete=models.CASCADE)
    model = models.ForeignKey(Model, on_delete=models.CASCADE)
    vehicle_year = models.IntegerField()
    active = models.BooleanField()
    odometer = models.IntegerField()
