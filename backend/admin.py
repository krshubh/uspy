from django.contrib import admin
from .models import User, Profile, Address
from .models import Family
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('email', 'first_name', 'last_name')
    list_filter = ('email', 'first_name', 'last_name','is_active', 'is_staff', 'is_superuser')
    ordering = ('-created_date',)
    list_display = ('email', 'first_name','last_name',
                    'is_active', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'first_name','last_name')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'fields': ('email', 'first_name','last_name', 'password1', 'password2', 'is_active', 'is_staff','is_superuser')}
         ),
    )


admin.site.register(User, UserAdminConfig)

class ProfileAdminConfig(admin.ModelAdmin):
    list_display = ('user','gender','mobile','address')

admin.site.register(Profile, ProfileAdminConfig)

class AddressAdminConfig(admin.ModelAdmin):
    list_display = ('address1','address2','city','state','country','pincode')

admin.site.register(Address, AddressAdminConfig)
