from email.mime import base
from unicodedata import name
from django.apps import AppConfig
from django.core.signals import request_finished

class BackendConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend'

    def ready(self):
        import backend.signals