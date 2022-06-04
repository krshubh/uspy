import imp
from rest_framework import serializers
from backend.models import Address, User, Profile, Parent, Children
from backend.models import GENDER_CHOICES

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['address1', 'address2', 'city', 'state', 'country', 'pincode', 'created_date']
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'first_name', 'last_name', 'date_joined']
        
class UserAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'first_name', 'last_name', 'date_joined',\
            'last_login', 'is_admin', 'is_staff', 'is_active', 'is_superuser']
        
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
    user = UserSerializer(read_only=True)
    mobile = serializers.CharField(required=False, allow_blank=True, max_length=100)
    gender = serializers.ChoiceField(choices=GENDER_CHOICES, default='M')
    address = AddressSerializer(read_only=True)
    
    def create(self, data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Profile.objects.create(**data)

    def update(self, instance, data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.mobile = data.get('mobile', instance.mobile)
        instance.mobile = data.get('mobile', instance.mobile)
        instance.gender = data.get('gender', instance.gender)
        instance.address = data.get('address', instance.address)
        instance.save()
        return instance
    

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'is_active', 'is_staff', 'is_superuser']
