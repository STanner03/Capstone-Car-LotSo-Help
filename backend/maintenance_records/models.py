from django.db import models
from vehicle.models import Vehicle

# Create your models here.


class Maintenance(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    shop_name = models.CharField(max_length=50)
    service_interval_miles = models.IntegerField()
    odometer = models.IntegerField()
    prev_odometer = models.IntegerField()
    total_cost = models.FloatField()
    date = models.DateField()
    notes = models.CharField(max_length=255)
