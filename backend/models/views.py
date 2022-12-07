from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Model
from .serializers import ModelSerializer

# Create your views here.

@api_view(['Get'])
@permission_classes([AllowAny])
def get_all_models(request):
    models = Model.objects.all()
    serializer = ModelSerializer(models, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_model(request):
    if request.method == 'POST':
        serializer = ModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_model(request, pk):
    model = get_object_or_404(Model, pk=pk)
    if request.method == 'PUT':
        serializer = ModelSerializer(model, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)