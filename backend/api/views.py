from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import csrf_exempt
from backend.models import User, Address, Profile, Parent, Children
from rest_framework.parsers import JSONParser
from backend.api.serializers import AddressSerializer, SignupSerializer,\
                                    ProfileSerializer, ParentSerializer,\
                                    ChildrenSerializer, UserSerializer,\
                                    UserAccessSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
import logging
import json
from rest_framework import status
from django.core import serializers

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['email'] = user.email
        token['first_name'] = user.first_name
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
  routes = [
    '/api/token',
    '/api/token/refresh'
  ]
  return Response(routes)

class SignupView(APIView):
  def post(self, request, format=None):
    # authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    data = JSONParser().parse(request)
    serializer = SignupSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddressView(APIView):
  
  def get(self, request, format=None):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    id = request.user.id
    data = Address.objects.get(id = id)
    serializer = AddressSerializer(data=data)
    if serializer.is_valid():
      return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(APIView):
  
  def get(self, request, format=None):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    data = Profile.objects.get(id = request.user.id)
    serializer = ProfileSerializer(data)
    return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
  
class ParentView(APIView):
  def get(self, request, format=None):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    try:
      data = Parent.objects.get(user_id = request.user.id)
    except Parent.DoesNotExist:
      data = Parent.objects.create(user_id = request.user.id)
    serializer = ParentSerializer(data)
    return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
  
  
class ChildrenView(APIView):
  def get(self, request, format=None):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    try:
      data = Children.objects.get(user_id = request.user.id)
    except Children.DoesNotExist:
      data = Children.objects.create(user_id = request.user.id)
    serializer = ChildrenSerializer(data)
    return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
def get_parent_using_user_id(request, user_id):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]
  if request.user.is_admin :
    try:
      data = Parent.objects.get(user_id = request.user.id)
    except Parent.DoesNotExist:
      data = Parent.objects.create(user_id = request.user.id)
    serializer = ParentSerializer(data)
    return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
  else :
    response_data = {"message" : "user don't have admin access"}
    return JsonResponse(response_data, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, safe=False)
    
@api_view(['GET'])
def get_children_using_user_id(request, user_id):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]
  if request.user.is_admin :
    try:
      data = Children.objects.get(user_id = request.user.id)
    except Children.DoesNotExist:
      data = Children.objects.create(user_id = request.user.id)
    serializer = ChildrenSerializer(data)
    return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
  else :
    response_data = {"message" : "user don't have admin access"}
    return JsonResponse(response_data, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, safe=False)