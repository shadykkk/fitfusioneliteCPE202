from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    isSubscriber = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ["id", "_id", "first_name", "last_name", "email", "mylist", "password", "isAdmin", 'isSubscriber', 'subscription_id']

    def get__id(self, obj):
        return obj.id
    def get_first_name(self, obj):
        first_name = obj.first_name
        return first_name
    def get_last_name(self, obj):
        last_name = obj.last_name
        return last_name
    def get_isAdmin(self, obj):
        return obj.is_staff
    def get_isSubscriber(self, obj):
        return obj.is_subscriber
    def get_subscription_id(self, obj):
        return obj.subscription_id   

class UserSerializerWithToken(UserSerializer):
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)
    isSubscriber = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'first_name', 'last_name', 'email', 'isAdmin', 'token', 'password', 'isSubscriber', 'mylist', 'subscription_id']
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token)
    def get__id(self, obj):
        return obj.id
    def get_first_name(self, obj):
        first_name = obj.first_name
        return first_name
    def get_last_name(self, obj):
        last_name = obj.last_name
        return last_name
    def get_isAdmin(self, obj):
        return obj.is_staff
    def get_isSubscriber(self, obj):
        return obj.is_subscriber
    def get_subscription_id(self, obj):
        return obj.subscription_id
