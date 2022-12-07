from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Make
from .serializers import MakeSerializer

# Create your views here.


@api_view(['Get'])
@permission_classes([AllowAny])
def get_all_makes(request):
    print(request.user)
    makes = Make.objects.all()
    serializer = MakeSerializer(makes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_make(request):
    print("User's Post", request.user)
    serializer = MakeSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_make(request, pk):
    make = get_object_or_404(Make, pk=pk)
    if request.method == 'PUT':
        serializer = MakeSerializer(make, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print("PUT Serializer", serializer)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        make.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
