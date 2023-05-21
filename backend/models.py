import json
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

GENDER_CHOICES = (
    ('M', 'Male'),
    ('F', 'Female'),
)

CALL_TYPE_CHOICES = (
    ('M', 'Missed Call'),
    ('I', 'Incoming Call'),
    ('O', 'Outgoing Call'),
)

MESSAGE_TYPE_CHOICES = (
    ('I', 'Incoming Message'),
    ('O', 'Outgoing Message'),
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

        return self.create_user(email, firstname="", lastname="", password=password, **other_fields)

    def create_user(self, email, firstname, lastname, password, **other_fields):
        other_fields.setdefault('is_active', True)
        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email,
                          firstname=firstname, lastname=lastname, **other_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='email_address', max_length=150, unique=True)
    firstname = models.CharField(max_length=150, blank=True)
    lastname = models.CharField(max_length=150, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permission to view the app `app_label`"
        return self.is_active

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)


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


class ContactUs(models.Model):
    sender_email = models.CharField(max_length=40, default='')
    to_email = models.CharField(max_length=40, default='')
    subject = models.CharField(max_length=60, default='')
    name = models.CharField(max_length=60, default='')
    message = models.CharField(max_length=300, default='')
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.sender_email + " " + self.message


class Parent(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, blank=True, null=True)
    requests = models.ManyToManyField(
        User, related_name='parents_requests', blank=True)
    requested = models.ManyToManyField(
        User, related_name='parents_requested', blank=True)
    confirmed = models.ManyToManyField(
        User, related_name='parents_confirmed', blank=True)

    def __str__(self):
        return str(self.user.email)


class Children(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, blank=True, null=True)
    requests = models.ManyToManyField(
        User, related_name='children_requests', blank=True)
    requested = models.ManyToManyField(
        User, related_name='children_requested', blank=True)
    confirmed = models.ManyToManyField(
        User, related_name='children_confirmed', blank=True)

    def __str__(self):
        return str(self.user.email)


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, blank=True, null=True)
    mobile = models.CharField(max_length=20, blank=True, default='', null=True)
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICES, blank=True, null=True)
    address = models.OneToOneField(
        Address, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.user.email


class Contact(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=30, blank=True, default='', null=True)
    number = models.CharField(max_length=20, blank=True, default='', null=True)

    def __str__(self):
        return self.name


class CallLog(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    contact = models.ForeignKey(
        Contact, on_delete=models.CASCADE, blank=True, null=True)
    call_type = models.CharField(
        max_length=20, choices=CALL_TYPE_CHOICES, blank=True, null=True)
    duration = models.DurationField(blank=True, null=True)
    date = models.DateTimeField(auto_now=False)

    def __str__(self):
        if self.contact != None and self.contact.name != None:
            return self.contact.name
        else:
            return "Id of this call log is : " + str(self.id)


class Message(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    contact = models.ForeignKey(
        Contact, on_delete=models.CASCADE, blank=True, null=True)
    message_type = models.CharField(
        max_length=20, choices=MESSAGE_TYPE_CHOICES, blank=True, null=True)
    message = models.CharField(
        max_length=500, blank=True, default='', null=True)
    date = models.DateTimeField()

    def __str__(self):
        if self.contact != None and self.contact.name != None:
            return self.contact.name
        else:
            return "Id of this call log is : " + str(self.id)
