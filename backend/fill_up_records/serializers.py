from rest_framework import serializers
from .models import Fillup

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class FillupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fillup
        fields = ['id', 'user_id', 'vehicle_id', 'station_name', 'odometer', 'prev_odometer',
                  'fuel_type', 'fuel_price_per_gallon', 'fuel_volume', 'mpg', 'total_cost', 'date', 'notes']
        depth = 1
