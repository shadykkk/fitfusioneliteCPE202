from django.shortcuts import render, get_object_or_404
from .serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from .models import *
from base.models import *
from base.serializers import *
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.views.decorators.csrf import csrf_exempt
# import paypalrestsdk
from django.http import HttpResponseBadRequest
import json

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        # data["username"] = self.user.username
        data["email"] = self.user.email
        for k, v in serializer.items():
            data[k] = v
        return data    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    print(user)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getUserInfo(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def updateUserProfile(request):
    user = request.user
    data = request.data
    print(user)
    print(data)
    print(user.subscriber)
    user.email = data.get('email', user.email)

    if data.get('password'):
        user.set_password(data['password'])

    user.save()

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
@authentication_classes([JWTAuthentication])
def updateUserInfo(request, pk):
    try:
        user = User.objects.get(id=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    print(data)
    user.email = data.get('email') or user.email

    if data.get('password'):
        user.set_password(data['password'])

    user.save()

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def payment(request):
    user= request.user
    user.subscriber = True
    user.save()
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def cancelSubscription(request):
    user= request.user
    user.subscriber = False
    user.save()
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def cancelSubscriptionUser(request, pk):
    user = User.objects.get(id=pk)
    user.subscriber = False
    user.save()
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    print(data)
    try:
        user = User.objects.create(
            first_name = data['fname'],
            last_name = data['lname'],
            email = data['email'],
            password = make_password(data['password']),
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exist'}        
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def storeSubscriptionId(request):
    user = request.user
    data = request.data
    print(user)
    print(data)
    user.subscription_id = ''.join([data.get(str(i), '') for i in range(len(data))])
    print(user.subscription_id)
    user.save()
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def add_to_my_list(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    product_id = request.data.get('productId')
    product = get_object_or_404(Product, pk=product_id)
    user.mylist.add(product)
    return Response({'message': 'Product added to My List'})

@api_view(['POST'])
def remove_to_my_list(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    product_id = request.data.get('productId')
    product = get_object_or_404(Product, pk=product_id)
    user.mylist.remove(product)
    return Response({'message': 'Product added to My List'})
