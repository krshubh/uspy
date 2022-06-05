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

logger = logging.getLogger(__name__)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['email'] = user.email
        token['firstname'] = user.firstname
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
    data = Profile.objects.get(id = request.user.id)
    serializer = AddressSerializer(data.address)
    response = JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
    return response
  
  def put(self, request, format=None):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    data = JSONParser().parse(request)
    profile_data = Profile.objects.get(id = request.user.id)
    serializer = AddressSerializer(instance = profile_data.address, data = data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=status.HTTP_204_NO_CONTENT)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserView(APIView):
  
  def get(self, request, format=None):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    data = Profile.objects.get(id = request.user.id)
    serializer = UserSerializer(data.user)
    response = JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
    return response
  
  def put(self, request, format=None):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    data = JSONParser().parse(request)
    profile_data = Profile.objects.get(id = request.user.id)
    serializer = UserSerializer(instance = profile_data.user, data = data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=status.HTTP_204_NO_CONTENT)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
  
  def get(self, request, format=None):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    data = Profile.objects.get(id = request.user.id)
    serializer = ProfileSerializer(data)
    response = JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response
  
  def put(self, request, format=None):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    data = JSONParser().parse(request)
    profile = Profile.objects.get(id = request.user.id)
    user_serializer = UserSerializer(instance = profile.user, data = data.get("user"))
    if user_serializer.is_valid():
      user_serializer.save()
    else :
      return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    address_serializer = AddressSerializer(instance = profile.address, data = data.get("address"))
    if address_serializer.is_valid():
      address_serializer.save()
    else :
      return JsonResponse(address_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    profile_serializer = ProfileSerializer(instance = profile, data = data)
    if profile_serializer.is_valid():
      profile_serializer.save()
      return JsonResponse(profile_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
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