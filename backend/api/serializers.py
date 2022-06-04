import imp
from rest_framework import serializers
from backend.models import Address, User

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['address1', 'address2', 'city', 'state', 'country', 'pincode','created_date']

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'is_active', 'is_staff', 'is_superuser']