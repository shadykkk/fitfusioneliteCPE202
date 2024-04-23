import os
import random
from django.db import models

def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext

def upload_image_path(instance, filename):
    new_filename = random.randint(1, 2541781232)
    name, ext = get_filename_ext(filename)
    final_filename = '{new_filename}{ext}'.format(new_filename=new_filename, ext=ext)
    return "img/{new_filename}/{final_filename}".format(new_filename=new_filename, final_filename=final_filename)
    
def upload_video_path(instance, filename):
    new_filename = random.randint(1, 2541781232)
    name, ext = get_filename_ext(filename)
    final_filename = '{new_filename}{ext}'.format(new_filename=new_filename, ext=ext)
    return "vid/{new_filename}/{final_filename}".format(new_filename=new_filename, final_filename=final_filename)

class Director(models.Model):
    _id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=100, null=True, blank=True)
    lastname = models.CharField(max_length=100, null=True, blank=True)
    
    def __str__(self):
        return "%s %s" % (self.firstname, self.lastname)

class Genre(models.Model):
    _id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)

    def __str__(self):
        return self.name

class Genre2(models.Model):
    _id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)

    def __str__(self):
        return self.name

class Genre3(models.Model):
    _id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    _id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    video = models.FileField(upload_to=upload_video_path, null=True, blank=True)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, blank=True, null=True, related_name='genre')
    description = models.TextField(null=True, blank=True)
    director = models.ForeignKey(Director, on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.name