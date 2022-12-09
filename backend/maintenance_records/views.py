from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Maintenance
from .serializers import MaintenanceSerializer

# Create your views here.


@api_view(['Get'])
@permission_classes([AllowAny])
def get_vehicle_maintenance_records(request, vpk):
    maintenances = Maintenance.objects.filter(vehicle_id=vpk)
    serializer = MaintenanceSerializer(maintenances, many=True)
    return Response(serializer.data)


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def user_maintenance_records(request, vpk):
    if request.method == 'POST':
        serializer = MaintenanceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_id=request.user.id, vehicle_id=vpk)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'GET':
        maintenances = Maintenance.objects.filter(user_id=request.user.id)
        serializer = MaintenanceSerializer(maintenances, many=True)
        return Response(serializer.data)



@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_maintenance_record(request, vpk, pk):
    maintenance = get_object_or_404(Maintenance, pk=pk)
    if request.method == 'PUT':
        serializer = MaintenanceSerializer(maintenance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_id=request.user.id, vehicle_id=vpk)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        maintenance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
