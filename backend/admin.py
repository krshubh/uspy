from django.contrib import admin
from .models import User, Profile, Address
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('email', 'firstname', 'lastname')
    list_filter = ('email', 'firstname', 'lastname','is_admin','is_active', 'is_staff', 'is_superuser')
    ordering = ('-date_joined',)
    list_display = ('email', 'firstname','lastname','is_admin',
                    'is_active', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'firstname','lastname')}),
        ('Permissions', {'fields': ('is_admin','is_staff', 'is_active', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'fields': ('email', 'firstname','lastname', 'password1', 'password2', 'is_admin','is_active', 'is_staff','is_superuser')}
         ),
    )


admin.site.register(User, UserAdminConfig)

class ProfileAdminConfig(admin.ModelAdmin):
    list_display = ('user','gender','mobile','address')

admin.site.register(Profile, ProfileAdminConfig)

class AddressAdminConfig(admin.ModelAdmin):
    list_display = ('address1','address2','city','state','country','pincode')

admin.site.register(Address, AddressAdminConfig)
