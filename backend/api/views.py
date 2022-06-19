from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import csrf_exempt
from backend.models import User, Address, Profile, Parent, Children, Contact, CallLog, Message
from rest_framework.parsers import JSONParser
from backend.api.serializers import AddressSerializer, SignupSerializer,\
                                    ProfileSerializer, ParentSerializer,\
                                    ChildrenSerializer, UserSerializer,\
                                    UserAccessSerializer, LoginSerializer,\
                                    ChangePasswordSerializer,\
                                    ContactSerializer, CallLogSerializer, \
                                    MessageSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
import logging
import json
from rest_framework import status
from rest_framework import filters
from django.core import serializers
from django.contrib.auth import authenticate
from backend.api.renderers import UserRenderer
from rest_framework.pagination import PageNumberPagination
from backend.api.pagination import CustomNumberPagination

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
    try:
      user = User.objects.get(email = request.user.email)
      data = Profile.objects.get(user = user)
    except:
      print(logger.error("Project object doesnot exist with given email"))
    serializer = AddressSerializer(data.address)
    response = JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
    return response
  
  def put(self, request, format=None):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    data = JSONParser().parse(request)
    try:
      user = User.objects.get(email = request.user.email)
      profile_data = Profile.objects.get(user = user)
    except:
      print(logger.error("Project object doesnot exist with given email"))
    serializer = AddressSerializer(instance = profile_data.address, data = data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=status.HTTP_204_NO_CONTENT)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserView(generics.ListCreateAPIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]
  filter_backends = (filters.SearchFilter,)
  search_fields = ['firstname','lastname']
  queryset = User.objects.all()
  serializer_class = UserSerializer

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
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
class CallLogView(generics.ListAPIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]
  serializer_class = CallLogSerializer
  
  def get(self, request, format=None):
    try:
      user = User.objects.get(email = request.user.email)
    except:
      print(logger.error("User object does not exist with given email"))
    queryset = CallLog.objects.filter(user = user)
    self.pagination_class = CustomNumberPagination
    page = self.paginate_queryset(queryset)
    if page is not None:
      serializer = self.get_serializer(page, many=True)
      return self.get_paginated_response(serializer.data)
    serializer = self.get_serializer(self.queryset, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  def post(self, request, format=None):
    for data in request.data :
      serializer = CallLogSerializer(data = data)
      if serializer.is_valid():
        serializer.save()
      else :
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)
    return JsonResponse({"message" : "Successful added calllogs"}, status=status.HTTP_200_OK, safe=False)
  
class CallLogChildView(generics.ListAPIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]
  serializer_class = CallLogSerializer
  
  def get(self, request, id, format=None):
    try:
      child_user = User.objects.get(id = id)
    except:
      print(logger.error("User object does not exist with given email"))
    user = User.objects.get(email = request.user.email)
    user_children = Children.objects.get(user = user).confirmed.all()
    if child_user in user_children:
      queryset = CallLog.objects.filter(user = child_user)
      self.pagination_class = CustomNumberPagination
      page = self.paginate_queryset(queryset)
      if page is not None:
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)
      serializer = self.get_serializer(self.queryset, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
    else :
      return JsonResponse({"message": "child user not found"}, status=status.HTTP_400_BAD_REQUEST, safe=False)

class MessageLogView(generics.ListAPIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]
  serializer_class = MessageSerializer
  
  def get(self, request, format=None):
    try:
      user = User.objects.get(email = request.user.email)
    except:
      print(logger.error("User object does not exist with given email"))
    queryset = Message.objects.filter(user = user)
    self.pagination_class = CustomNumberPagination
    page = self.paginate_queryset(queryset)
    if page is not None:
      serializer = self.get_serializer(page, many=True)
      return self.get_paginated_response(serializer.data)
    serializer = self.get_serializer(self.queryset, many=True)
    return Response(serializer.data) 
  
  def post(self, request, format=None):
    for data in request.data :
      serializer = MessageSerializer(data = data)
      if serializer.is_valid():
        serializer.save()
      else :
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)
    return JsonResponse({"message" : "Successful added messages"}, status=status.HTTP_200_OK, safe=False)
  
class MessageLogChildView(generics.ListAPIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]
  serializer_class = MessageSerializer
  
  def get(self, request, id, format=None):
    try:
      child_user = User.objects.get(id = id)
    except:
      print(logger.error("User object does not exist with given email"))
    user = User.objects.get(email = request.user.email)
    user_children = Children.objects.get(user = user).confirmed.all()
    if child_user in user_children:
      queryset = Message.objects.filter(user = child_user)
      self.pagination_class = CustomNumberPagination
      page = self.paginate_queryset(queryset)
      if page is not None:
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)
      serializer = self.get_serializer(self.queryset, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
    else :
      return JsonResponse({"message": "child user not found"}, status=status.HTTP_400_BAD_REQUEST, safe=False)
  
class ParentView(APIView):
  def get(self, request, format=None):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    try:
      data = Parent.objects.get(user = request.user)
    except Parent.DoesNotExist:
      data = Parent.objects.create(user = request.user)
    serializer = ParentSerializer(data)
    return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
  
class AddParentRequest(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def post(self, request, format=None):
    try:
      user = User.objects.get(email = request.user.email)
    except:
      print(logger.error("User object does not exist with given email"))
    parent = Parent.objects.get(user = user)
    requested = []
    for user_item in request.data :
      if User.objects.filter(email = user_item['email']).exists() :
        user_requested = User.objects.get(email = user_item['email'])
        children_user_requests = Children.objects.get(user = user_requested)
        children_user_requests.requests.add(user)
        children_user_requests.save()
      else :
        return JsonResponse({"error" : {"message" : "user with email " + user['email'] + " doesn't exist"}},
                            status=status.HTTP_400_BAD_REQUEST, safe=False)
      requested.append(user_requested)
    parent.requested.add(*requested)
    parent.save()
    parent_serializer = ParentSerializer(parent)
    return JsonResponse(parent_serializer.data, status=status.HTTP_200_OK, safe=False)
  
class DeleteParentRequested(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def delete(self, request, format=None):
    try:
      user = User.objects.get(email = request.user.email)
    except:
      print(logger.error("User object does not exist with given email"))
    parent = Parent.objects.get(user = user)
    if User.objects.filter(email = request.data['email']).exists() :
      user_requested = User.objects.get(email = request.data['email'])
      children_user_requests = Children.objects.get(user = user_requested)
      children_user_requests.requests.remove(user)
      children_user_requests.save()
    else :
      return JsonResponse({"error" : {"message" : "user with email " + user['email'] + " doesn't exist"}},
                            status=status.HTTP_400_BAD_REQUEST, safe=False)
    parent.requested.remove(user_requested)
    parent.save()
    parent_serializer = ParentSerializer(parent)
    return JsonResponse(parent_serializer.data, status=status.HTTP_200_OK, safe=False)
  
class DeleteParentRequests(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def delete(self, request, format=None):
    try:
      user = User.objects.get(email = request.user.email)
    except:
      print(logger.error("User object does not exist with given email"))
    parent = Parent.objects.get(user = user)
    if User.objects.filter(email = request.data['email']).exists() :
      user_requested = User.objects.get(email = request.data['email'])
      children_user_requested = Children.objects.get(user = user_requested)
      children_user_requested.requested.remove(user)
      children_user_requested.save()
    else :
      return JsonResponse({"error" : {"message" : "user with email " + user['email'] + " doesn't exist"}},
                            status=status.HTTP_400_BAD_REQUEST, safe=False)
    parent.requests.remove(user_requested)
    parent.save()
    parent_serializer = ParentSerializer(parent)
    return JsonResponse(parent_serializer.data, status=status.HTTP_200_OK, safe=False)
  
class ConfirmParentRequest(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def post(self, request, format=None):
    try:
      user = User.objects.get(email = request.user.email)
    except:
      print(logger.error("User object does not exist with given email"))
    parent = Parent.objects.get(user = user)
    if User.objects.filter(email = request.data['email']).exists() :
      user_requested = User.objects.get(email = request.data['email'])
      children_user_requests = Children.objects.get(user = user_requested)
      children_user_requests.requested.remove(user)
      children_user_requests.confirmed.add(user)
      children_user_requests.save()
    else :
      return JsonResponse({"error" : {"message" : "user with email " + user['email'] + " doesn't exist"}},
                            status=status.HTTP_400_BAD_REQUEST, safe=False)
    parent.requests.remove(user_requested)
    parent.confirmed.add(user_requested)
    parent.save()
    parent_serializer = ParentSerializer(parent)
    return JsonResponse(parent_serializer.data, status=status.HTTP_200_OK, safe=False)

class DeleteParentConfirmed(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def delete(self, request, format=None):
    try:
      user = User.objects.get(email = request.user.email)
    except:
      print(logger.error("User object does not exist with given email"))
    parent = Parent.objects.get(user = user)
    if User.objects.filter(email = request.data['email']).exists() :
      user_requested = User.objects.get(email = request.data['email'])
      children_user_confirmed = Children.objects.get(user = user_requested)
      children_user_confirmed.confirmed.remove(user)
      children_user_confirmed.save()
    else :
      return JsonResponse({"error" : {"message" : "user with email " + user['email'] + " doesn't exist"}},
                            status=status.HTTP_400_BAD_REQUEST, safe=False)
    parent.confirmed.remove(user_requested)
    parent.save()
    parent_serializer = ParentSerializer(parent)
    return JsonResponse(parent_serializer.data, status=status.HTTP_200_OK, safe=False)

class ChildrenView(APIView):
  def get(self, request, format=None):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    try:
      data = Children.objects.get(user = request.user)
    except Children.DoesNotExist:
      data = Children.objects.create(user = request.user)
    serializer = ChildrenSerializer(data)
    return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
  
class AddChildrenRequest(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def post(self, request, format=None):
    try:
      user = User.objects.get(email = request.user.email)
    except:
      print(logger.error("User object does not exist with given email"))
    children = Children.objects.get(user = user)
    requested = []
    for user_item in request.data :
      if User.objects.filter(email = user_item['email']).exists() :
        user_requested = User.objects.get(email = user_item['email'])
        parent_user_requests = Parent.objects.get(user = user_requested)
        parent_user_requests.requests.add(user)
        parent_user_requests.save()
      else :
        return JsonResponse({"error" : {"message" : "user with email " + user['email'] + " doesn't exist"}},
                            status=status.HTTP_400_BAD_REQUEST, safe=False)
      requested.append(user_requested)
    children.requested.add(*requested)
    children.save()
    children_serializer = ChildrenSerializer(children)
    return JsonResponse(children_serializer.data, status=status.HTTP_200_OK, safe=False)

class DeleteChildrenRequested(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def delete(self, request, format=None):
    try:
      user = User.objects.get(email = request.user.email)
    except:
      print(logger.error("User object does not exist with given email"))
    children = Children.objects.get(user = user)
    if User.objects.filter(email = request.data['email']).exists() :
      user_requested = User.objects.get(email = request.data['email'])
      parent_user_requests = Parent.objects.get(user = user_requested)
      parent_user_requests.requests.remove(user)
      parent_user_requests.save()
    else :
      return JsonResponse({"error" : {"message" : "user with email " + user['email'] + " doesn't exist"}},
                            status=status.HTTP_400_BAD_REQUEST, safe=False)
    children.requested.remove(user_requested)
    children.save()
    children_serializer = ChildrenSerializer(children)
    return JsonResponse(children_serializer.data, status=status.HTTP_200_OK, safe=False)
  
class DeleteChildrenRequests(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def delete(self, request, format=None):
    try:
      user = User.objects.get(email = request.user.email)
    except:
      print(logger.error("User object does not exist with given email"))
    children = Children.objects.get(user = user)
    if User.objects.filter(email = request.data['email']).exists() :
      user_requested = User.objects.get(email = request.data['email'])
      parent_user_requested = Parent.objects.get(user = user_requested)
      parent_user_requested.requested.remove(user)
      parent_user_requested.save()
    else :
      return JsonResponse({"error" : {"message" : "user with email " + user['email'] + " doesn't exist"}},
                            status=status.HTTP_400_BAD_REQUEST, safe=False)
    children.requests.remove(user_requested)
    children.save()
    children_serializer = ChildrenSerializer(children)
    return JsonResponse(children_serializer.data, status=status.HTTP_200_OK, safe=False)
  
class ConfirmChildrenRequest(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def post(self, request, format=None):
    try:
      user = User.objects.get(email = request.user.email)
    except:
      print(logger.error("User object does not exist with given email"))
    children = Children.objects.get(user = user)
    if User.objects.filter(email = request.data['email']).exists() :
      user_requested = User.objects.get(email = request.data['email'])
      parent_user_requests = Parent.objects.get(user = user_requested)
      parent_user_requests.requested.remove(user)
      parent_user_requests.confirmed.add(user)
      parent_user_requests.save()
    else :
      return JsonResponse({"error" : {"message" : "user with email " + user['email'] + " doesn't exist"}},
                            status=status.HTTP_400_BAD_REQUEST, safe=False)
    children.requests.remove(user_requested)
    children.confirmed.add(user_requested)
    children.save()
    children_serializer = ParentSerializer(children)
    return JsonResponse(children_serializer.data, status=status.HTTP_200_OK, safe=False)

class DeleteChildrenConfirmed(APIView):
  authentication_classes = [JWTAuthentication]
  permission_classes = [IsAuthenticated]

  def delete(self, request, format=None):
    try:
      user = User.objects.get(email = request.user.email)
    except:
      print(logger.error("User object does not exist with given email"))
    children = Children.objects.get(user = user)
    if User.objects.filter(email = request.data['email']).exists() :
      user_requested = User.objects.get(email = request.data['email'])
      parent_user_confirmed = Parent.objects.get(user = user_requested)
      parent_user_confirmed.confirmed.remove(user)
      parent_user_confirmed.save()
    else :
      return JsonResponse({"error" : {"message" : "user with email " + user['email'] + " doesn't exist"}},
                            status=status.HTTP_400_BAD_REQUEST, safe=False)
    children.confirmed.remove(user_requested)
    children.save()
    children_serializer = ChildrenSerializer(children)
    return JsonResponse(children_serializer.data, status=status.HTTP_200_OK, safe=False)