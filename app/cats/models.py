from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from users.models import User


class Breed(models.Model):
    """
    Модель породы животного
    """
    title = models.CharField(max_length=50, null=False)


class Cat(models.Model):
    """
    Модель кота
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    breed = models.ForeignKey(Breed, on_delete=models.SET_NULL, null=True)
    nickname = models.CharField(max_length=15, null=False)
    age = models.PositiveIntegerField(default=1, null=False)
