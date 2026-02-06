from django.urls import path
from .views import getuser, create_user, auth_register, auth_login, me


urlpatterns = [
    path("users/<int:user_id>/", getuser, name='getuser'),
    path("users/create/", create_user, name='createuser'),
    path("auth/register/", auth_register, name="auth_register"),
    path("auth/login/", auth_login, name="auth_login"),
    path("me/", me, name="me"),
]