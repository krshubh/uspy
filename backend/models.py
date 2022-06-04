from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

GENDER_CHOICES = (
    ('M', 'Male'),
    ('F', 'Female'),
)

class UserManager(BaseUserManager):
    use_in_migrations = False
    auto_created = False
    def create_superuser(self, email, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)
        other_fields.setdefault('is_admin', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, first_name = "",last_name = "", password = password, **other_fields)

    def create_user(self, email, first_name,last_name, password, **other_fields):
        other_fields.setdefault('is_active', True)
        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email,
                          first_name=first_name,last_name=last_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Address(models.Model):
    address1 = models.CharField(max_length=20, default='')
    address2 = models.CharField(max_length=20, default='')
    city = models.CharField(max_length=20, default='')
    state = models.CharField(max_length=20, default='')
    country = models.CharField(max_length=20, default='')
    pincode = models.CharField(max_length=20, default='')
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.address1

class Parent(models.Model):
    user_id = models.IntegerField(default = 0, blank=True)
    requests = models.ManyToManyField(User, related_name='parents_requests', blank=True)
    requested = models.ManyToManyField(User, related_name='parents_requested', blank=True)
    confirmed = models.ManyToManyField(User, related_name='parents_confirmed', blank=True)
    
    def __str__(self):
        return str(self.user_id)
    
class Children(models.Model):
    user_id = models.IntegerField(default = 0, blank=True)
    requests = models.ManyToManyField(User, related_name='children_requests', blank=True)
    requested = models.ManyToManyField(User, related_name='children_requested', blank=True)
    confirmed = models.ManyToManyField(User, related_name='children_confirmed', blank=True)
    
    def __str__(self):
        return str(self.user_id)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    mobile = models.CharField(max_length=20, blank=True, default='', null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, default='M', null=True)
    address = models.OneToOneField(Address, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.user.email