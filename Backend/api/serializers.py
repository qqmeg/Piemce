from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "username", "bio", "created_at")  #только поля которые нельзя изменять
        read_only_fields = fields


class UserMeUpdateSerializer(serializers.ModelSerializer): #обновление профиля юзера
    class Meta:
        model = User
        fields = ("username", "bio")


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    passw = serializers.CharField()
    username = serializers.CharField(required=False, allow_blank=True)
    bio = serializers.CharField(required=False, allow_blank=True, allow_null=True)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    passw = serializers.CharField()
