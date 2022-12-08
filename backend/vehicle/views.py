from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Vehicle
from .serializers import VehicleSerializer

# Create your views here.

@api_view(['Get'])
@permission_classes([AllowAny])
def get_all_vehicles(request, mpk, modpk):

    print("mpk", mpk, "modpk", modpk)

    vehicles = Vehicle.objects.filter(model_id=modpk)
    serializer = VehicleSerializer(vehicles, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_vehicle(request, mpk, modpk):
    serializer = VehicleSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(user_id=request.user.id, make_id=mpk, model_id=modpk)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_vehicle(request, mpk, modpk, pk):
    vehicle = get_object_or_404(Vehicle, pk=pk)
    if request.method == 'PUT':
        serializer = VehicleSerializer(vehicle, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_id=request.user.id, make_id=mpk, model_id=modpk)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        vehicle.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
