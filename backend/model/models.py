from django.db import models
from make.models import Make

# Create your models here.

class Model(models.Model):
    make = models.ForeignKey(Make, on_delete=models.CASCADE)
    model_name = models.CharField(max_length=50)