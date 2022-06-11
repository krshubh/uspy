from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import csrf_exempt
from backend.models import User, Address, Profile, Parent, Children
from rest_framework.parsers import JSONParser
from backend.api.serializers import AddressSerializer, SignupSerializer,\
                                    ProfileSerializer, ParentSerializer,\
                                    ChildrenSerializer, UserSerializer,\
                                    UserAccessSerializer, LoginSerializer,\
                                    ChangePasswordSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
import logging
import json
from rest_framework import status
from django.core import serializers
from django.contrib.auth import authenticate
from backend.api.renderers import UserRenderer

logger = logging.getLogger(__name__)

# Generate Token Manually
def get_tokens_for_user(user) :
  refresh = RefreshToken.for_user(user)
  return {'refresh': str(refresh), 'access': str(refresh.access_token) }

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
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid(raise_exception = True):
      user = serializer.save()
      token = MyTokenObtainPairSerializer(request.data).validate(request.data)
      return JsonResponse({"token": token, "message" : "Registration Successful"}, status=status.HTTP_201_CREATED)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
class LoginView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = LoginSerializer(data = request.data)
    if serializer.is_valid(raise_exception = True):
      email = serializer.data.get('email')
      password = serializer.data.get('password')
      user = authenticate(email=email, password=password)
      if user is not None:
        token = MyTokenObtainPairSerializer(request.data).validate(request.data)
        return JsonResponse({'token': token,'message':'Login Success'}, status=status.HTTP_200_OK)
      else :
        return JsonResponse({'errors':{'non_field_errors' : ['Email or password is not valid']}}, status=status.HTTP_404_NOT_FOUND)
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
    try:
      user = User.objects.get(email = request.user.email)
      data = Profile.objects.get(user = user)
    except:
      print(logger.error("Project object doesnot exist with given email"))
    
    serializer = ProfileSerializer(data)
    response = JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
    # response["Access-Control-Allow-Origin"] = "*"
    # response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    # response["Access-Control-Max-Age"] = "1000"
    # response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response
  
  def put(self, request, format=None):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    data = JSONParser().parse(request)
    try:
      user = User.objects.get(email = request.user.email)
      profile = Profile.objects.get(user = user)
    except:
      print(logger.error("Profile object doesnot exist with given email"))
    profile_serializer = ProfileSerializer(instance = profile, data = data)
    if profile_serializer.is_valid():
      profile_serializer.save()
      return JsonResponse(profile_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
class ChangePasswordView(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]
  
  def post(self, request, format=None):
    try:
      user = User.objects.get(email = request.user.email)
    except:
      print(logger.error("User object does not exist with given email"))
    serializer = ChangePasswordSerializer(data = request.data, context={'user': request.user})
    if serializer.is_valid(raise_exception = True):
      return JsonResponse({"message" : "Password Changed Successfully"}, status=status.HTTP_200_OK)
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