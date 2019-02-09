from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class CustomUser(AbstractUser):
    first_name = models.CharField(blank=True, max_length=255)
    last_name = models.CharField(blank=True, max_length=255)
    username = models.CharField(blank=True, max_length=255, unique=True)

    def __str__(self):
        return self.email