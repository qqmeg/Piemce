from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer


@csrf_exempt
@api_view(["GET"])
def getuser(request, user_id=None):
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
@api_view(["POST"])
def create_user(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if not serializer.is_valid():
        print(serializer.errors)
    if not data.get("email"):
        return JsonResponse({"error": "Email обязателен"}, status=400)
    if not data.get("passw"):
        return JsonResponse({"error": "Пароль обязателен"}, status=400)
    if not data.get("username"):
        return JsonResponse({"error": "Имя пользователя обязательно"}, status=400)

    if User.objects.filter(email=data["email"]).exists():
        return JsonResponse(
            {"error": "Пользователь с таким email уже существует"}, status=400
        )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
