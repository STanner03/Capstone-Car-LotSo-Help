from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Vehicle
from .serializers import VehicleSerializer

# Create your views here.

# @api_view(['Get'])
# @permission_classes([AllowAny])
# def get_all_Vehicles():


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_Vehicle():


# @api_view(['PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])
# def update_Vehicle():