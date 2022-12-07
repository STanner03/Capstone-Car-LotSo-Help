from rest_framework import serializers
from .models import Vehicle

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['id', 'user_id', 'vin', 'vehicle_name', 'vehicle_type',
                  'make_id', 'model_id', 'vehicle_year', 'active', 'odometer']
        depth = 1
