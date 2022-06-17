from django.db.models.signals import post_save
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from .models import Profile, Parent, Children
from .models import User
import logging

logger = logging.getLogger(__name__)

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
  if created :
    Profile.objects.create(user = instance)
    print("Profile Created!")

@receiver(post_save, sender=User)
def update_profile(sender, instance, created, **kwargs):
  if created == False:
    instance.profile.save()
    print("Profile Updated!")


@receiver(pre_delete, sender=User)
def delete_profile(sender, instance, **kwargs):
  try:
    user = User.objects.get(email = instance.email)
    Profile.objects.get(user = user).delete()
  except:
    print(logger.error("Project object doesnot exist with given email"))
    
@receiver(post_save, sender=User)
def create_parent(sender, instance, created, **kwargs):
  if created :
    Parent.objects.create(user = instance)
    print("Parent Created!")
    
@receiver(post_save, sender=User)
def create_children(sender, instance, created, **kwargs):
  if created :
    Children.objects.create(user = instance)
    print("Children Created!")