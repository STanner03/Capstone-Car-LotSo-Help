from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Maintenance
from .serializers import MaintenanceSerializer

# Create your views here.

# @api_view(['Get'])
# @permission_classes([AllowAny])
# def get_all_Maintenances():


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_Maintenance():


# @api_view(['PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])
# def update_Maintenance():