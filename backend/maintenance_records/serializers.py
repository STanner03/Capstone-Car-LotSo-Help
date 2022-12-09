from rest_framework import serializers
from .models import Maintenance

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = ['id', 'user_id', 'vehicle_id', 'description', 'shop_name', 'service_interval_miles',
                  'odometer', 'prev_odometer', 'total_cost', 'date', 'notes']
        depth = 1
