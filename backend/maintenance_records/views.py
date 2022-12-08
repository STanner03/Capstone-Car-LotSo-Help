from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Maintenance
from .serializers import MaintenanceSerializer

@api_view(['Get'])
@permission_classes([AllowAny])
def get_all_maintenance_records(request, mpk, modpk, vpk):

    print("mpk", mpk, "modpk", modpk, "vpk", vpk)

    maintenances = Maintenance.objects.filter(vehicle_id=vpk)
    serializer = MaintenanceSerializer(maintenances, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_maintenance_record(request, mpk, modpk, vpk):
    serializer = MaintenanceSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(vehicle_id=vpk)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_maintenance_record(request, mpk, modpk, vpk, pk):
    maintenance = get_object_or_404(Maintenance, pk=pk)
    if request.method == 'PUT':
        serializer = MaintenanceSerializer(maintenance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(vehicle_id=vpk)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        maintenance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
