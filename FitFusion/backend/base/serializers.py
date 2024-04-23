from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    # director = serializers.StringRelatedField()
    genre = serializers.StringRelatedField(read_only=True, many=False)
    class Meta:
        model = Product
        fields = '__all__'

class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'       

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'
