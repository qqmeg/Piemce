from django.urls import path

from .views import create_user, get_user, login_user

urlpatterns = [
    path("users/<int:user_id>/", get_user, name="getuser"),
    path("users/create/", create_user, name="createuser"),
    path("users/login/", login_user, name="login_user"),
]
