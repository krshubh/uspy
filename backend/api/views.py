from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from backend.models import User
import logging
import json

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['email'] = user.email
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

@api_view(['POST'])
def signUp(request):
  body_unicode = request.body.decode('utf-8')
  body = json.loads(body_unicode)
  user = User.objects.create_user(email=body["email"],
                                  password=body["password"],
                                  first_name=body["first_name"],
                                  last_name=body["last_name"])
  user.save()
  response = JsonResponse({
                          'message': str(body["email"]) + " created successfully"},
                          status=200)
  return response

