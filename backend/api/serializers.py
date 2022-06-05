import imp
from rest_framework import serializers
from backend.models import Address, User, Profile, Parent, Children
from backend.models import GENDER_CHOICES
import logging

logger = logging.getLogger(__name__)

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['address1', 'address2', 'city', 'state', 'country', 'pincode', 'created_date']
        
class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    email = serializers.EmailField(max_length=150,required=False,allow_blank=True)
    
    class Meta:
        model = User
        fields = ['id','email', 'firstname', 'lastname', 'date_joined']
        extra_kwargs = {
            'email': {'validators': []},
        }
        
class UserAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'firstname', 'lastname', 'date_joined',\
            'last_login', 'is_admin', 'is_staff', 'is_active', 'is_superuser']
        extra_kwargs = {
            'email': {'validators': []},
        }
        
class ParentSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    requests = UserSerializer(read_only=True, many=True)
    requested = UserSerializer(read_only=True, many=True)
    confirmed = UserSerializer(read_only=True, many=True)
    
    def create(self, data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Parent.objects.create(**data)

    def update(self, instance, data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.user_id = data.get('user_id', instance.user_id)
        instance.requests = data.get('requests', instance.requests)
        instance.requested = data.get('requested', instance.requested)
        instance.confirmed = data.get('confirmed', instance.confirmed)
        instance.save()
        return instance
    
class ChildrenSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    requests = UserSerializer(read_only=True, many=True)
    requested = UserSerializer(read_only=True, many=True)
    confirmed = UserSerializer(read_only=True, many=True)
    
    def create(self, data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Children.objects.create(**data)

    def update(self, instance, data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.user_id = data.get('user_id', instance.user_id)
        instance.requests = data.get('requests', instance.requests)
        instance.requested = data.get('requested', instance.requested)
        instance.confirmed = data.get('confirmed', instance.confirmed)
        instance.save()
        return instance
    
class ProfileSerializer(serializers.Serializer):
    user = UserSerializer(read_only=False, many=False)
    address = AddressSerializer(read_only=False, many=False)
    mobile = serializers.CharField(max_length=20)
    gender = serializers.CharField(max_length=1)
    
    class Meta:
        model = Profile
        fields = ['user', 'mobile', 'gender', 'address']
        depth = 3
        
    def update(self, instance, data):
        user_serializer = UserSerializer(instance = instance.user, data = data.get("user"))
        if user_serializer.is_valid():
            user_serializer.save()
        
        address_serializer = AddressSerializer(instance = instance.address, data = data.get("address"))
        if address_serializer.is_valid():
            address_serializer.save()
    
        instance.mobile = data.get('mobile', instance.mobile)
        instance.gender = data.get('gender', instance.gender)
        # instance.requested = data.get('requested', instance.requested)
        # instance.confirmed = data.get('confirmed', instance.confirmed)
        instance.save()
        return instance



class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'firstname', 'lastname', 'password', 'is_active', 'is_staff', 'is_superuser']
