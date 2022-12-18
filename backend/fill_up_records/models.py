from django.db import models
from vehicle.models import Vehicle
from authentication.models import User

# Create your models here.


class Fillup(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    station_name = models.CharField(max_length=50)
    odometer = models.IntegerField()
    prev_odometer = models.IntegerField()
    fuel_type = models.CharField(max_length=20)
    fuel_price_per_gallon = models.FloatField()
    fuel_volume = models.FloatField()
    mpg = models.FloatField()
    total_cost = models.FloatField()
    date = models.DateField()
    notes = models.CharField(max_length=255)
