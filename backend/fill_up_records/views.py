from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Fillup
from .serializers import FillupSerializer

# Create your views here.


@api_view(['Get'])
@permission_classes([AllowAny])
def get_all_fill_up_records(request, mpk, modpk, vpk):

    print("mpk", mpk, "modpk", modpk, "vpk", vpk)

    fillups = Fillup.objects.filter(vehicle_id=vpk)
    serializer = FillupSerializer(fillups, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_fill_up_record(request, mpk, modpk, vpk):
    serializer = FillupSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(vehicle_id=vpk)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_fill_up_record(request, mpk, modpk, vpk, pk):
    fillup = get_object_or_404(Fillup, pk=pk)
    if request.method == 'PUT':
        serializer = FillupSerializer(fillup, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(vehicle_id=vpk)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        fillup.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
