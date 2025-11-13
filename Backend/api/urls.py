from django.urls import path
from .views import getuser, create_user


urlpatterns = [
    path("users/<int:user_id>/", getuser, name='getuser'),
    path("users/create/", create_user, name='createuser'),
]