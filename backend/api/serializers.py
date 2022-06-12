import imp
from rest_framework import serializers
from backend.models import Address, User, Profile, Parent, Children, \
    Contact, CallLog, Message
from backend.models import GENDER_CHOICES
import logging

logger = logging.getLogger(__name__)

class AddressSerializer(serializers.ModelSerializer):
    address1 = serializers.CharField(max_length=100, required=False, allow_blank=True, allow_null=True)
    address2 = serializers.CharField(max_length=100, required=False, allow_blank=True, allow_null=True)
    city = serializers.CharField(max_length=100, required=False, allow_blank=True, allow_null=True)
    state = serializers.CharField(max_length=100, required=False, allow_blank=True, allow_null=True)
    country = serializers.CharField(max_length=100, required=False, allow_blank=True, allow_null=True)
    pincode = serializers.CharField(max_length=100, required=False, allow_blank=True, allow_null=True)
    
    class Meta:
        model = Address
        fields = ['address1', 'address2', 'city', 'state', 'country', 'pincode']
        
class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=150,required=False,allow_blank=True)
    
    class Meta:
        model = User
        fields = ['email', 'firstname', 'lastname']
        extra_kwargs = {
            'email': {'validators': []},
        }
        
class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(max_length=100, style={'input_type':'password'}, write_only=True)
    new_password = serializers.CharField(max_length=100, style={'input_type':'password'}, write_only=True)
    confirm_password = serializers.CharField(max_length=100, style={'input_type':'password'}, write_only=True)
    
    class Meta:
        fields = ["current_password", "new_password", "confirm_password"]
        
    def validate(self, attrs):
        current_password = attrs.get('current_password')
        new_password = attrs.get('new_password')
        confirm_password = attrs.get('confirm_password')
        user = self.context.get('user')
        if not user.check_password(current_password) :
            raise serializers.ValidationError("Current Password is not correct")
        if current_password == new_password :
            raise serializers.ValidationError("Current Password and new Password Could not be same")
        if new_password != confirm_password :
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        user.set_password(new_password)
        user.save()
        return attrs
        
class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=150)
    
    class Meta:
        model = User
        fields = ['email','password']
        
class UserAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'firstname', 'lastname', 'created_at', 'updated_at',\
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
    
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=False, many=False)
    address = AddressSerializer(read_only=False, many=False, required=False, allow_null=True)
    mobile = serializers.CharField(max_length=20, required=False, allow_blank=True, allow_null=True)
    gender = serializers.CharField(max_length=1, required=False, allow_blank=True, allow_null=True)
    
    class Meta:
        model = Profile
        fields = ['user', 'mobile', 'gender', 'address']
        depth = 3
        
    def update(self, instance, data):
        user_serializer = UserSerializer(instance = instance.user, data = data.get("user"))
        if user_serializer.is_valid():
            user_serializer.save()
        if instance.address == None :
            address_serializer = AddressSerializer(data = data.get("address"))
            if address_serializer.is_valid():
                address = address_serializer.save()
                instance.address = address
        else :
            address_serializer = AddressSerializer(instance = instance.address, data = data.get("address"))
            if address_serializer.is_valid():
                address_serializer.save()
        instance.mobile = data.get('mobile', instance.mobile)
        instance.gender = data.get('gender', instance.gender)
        instance.save()
        return instance

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'firstname', 'lastname', 'password', 'is_active', 'is_staff', 'is_superuser']
        
    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            firstname=validated_data['firstname'],
            lastname=validated_data['lastname'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'number']

class CallLogSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=False, many=False)
    contact = ContactSerializer(read_only=False, many=False)
    
    class Meta:
        model = CallLog
        fields = ['id', 'user', 'contact', 'call_type', 'duration', 'date']
        
class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=False, many=False)
    contact = ContactSerializer(read_only=False, many=False)
    
    class Meta:
        model = CallLog
        fields = ['user', 'contact', 'message_type', 'title', 'message', 'date']