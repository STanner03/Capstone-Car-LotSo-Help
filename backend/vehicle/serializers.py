from rest_framework import serializers
from .models import Vehicle

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['id', 'user_id', 'vin', 'name', 'type',
                  'make', 'model', 'year', 'color', 'active', 'odometer']
        depth = 1
