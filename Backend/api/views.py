from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils.crypto import get_random_string

from .models import User, AuthToken
from .serializers import (
    UserSerializer,
    UserPublicSerializer,
    UserMeUpdateSerializer,
    RegisterSerializer,
    LoginSerializer,
)


def _get_user_from_token(request):
    """
    Очень простая авторизация: Authorization: Token <key>
    (для dev/сырого проекта, не production)
    """
    auth = request.headers.get("Authorization") or ""
    if not auth.startswith("Token "):
        return None
    key = auth.split(" ", 1)[1].strip()
    if not key:
        return None
    try:
        token = AuthToken.objects.select_related("user").get(key=key)
        return token.user
    except AuthToken.DoesNotExist:
        return None


@csrf_exempt
@api_view(["GET"])
def get_user(request, user_id=None):
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
    if not data.get("password"):
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


@csrf_exempt
@api_view(["POST"])
def auth_register(request):
    """
    POST /api/auth/register/
    body: { email, passw, username?, bio? }
    returns: { token, user }
    """
    s = RegisterSerializer(data=request.data)
    if not s.is_valid():
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)
    data = s.validated_data

    if User.objects.filter(email=data["email"]).exists():
        return Response({"error": "Пользователь с таким email уже существует"}, status=400)

    user = User.objects.create(
        email=data["email"],
        passw=data["passw"],
        username=data.get("username", ""),
        bio=data.get("bio", "no bio yet"),
    )
    token = AuthToken.objects.create(key=get_random_string(48), user=user)
    return Response(
        {"token": token.key, "user": UserPublicSerializer(user).data},
        status=status.HTTP_201_CREATED,
    )


@csrf_exempt
@api_view(["POST"])
def auth_login(request):
    """
    POST /api/auth/login/
    body: { email, passw }
    returns: { token, user }
    """
    s = LoginSerializer(data=request.data)
    if not s.is_valid():
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)
    email = s.validated_data["email"]
    passw = s.validated_data["passw"]

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Неверный email или пароль"}, status=400)

    if user.passw != passw:
        return Response({"error": "Неверный email или пароль"}, status=400)

    # выдаём (или переиспользуем) токен
    token = AuthToken.objects.filter(user=user).order_by("-created_at").first()
    if token is None:
        token = AuthToken.objects.create(key=get_random_string(48), user=user)

    return Response({"token": token.key, "user": UserPublicSerializer(user).data})


@csrf_exempt
@api_view(["GET", "PATCH"])
def me(request):
    """
    GET/PATCH /api/me/
    header: Authorization: Token <key>
    GET returns: user
    PATCH body: { username?, bio? } returns updated user
    """
    user = _get_user_from_token(request)
    if user is None:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == "GET":
        return Response(UserPublicSerializer(user).data)

    s = UserMeUpdateSerializer(user, data=request.data, partial=True)
    if not s.is_valid():
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)
    s.save()
    return Response(UserPublicSerializer(user).data)
