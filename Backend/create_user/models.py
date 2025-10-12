from django.db import models

# Create your models here


class Person(models.Model):
    email = models.EmailField(primary_key=True, unique=True)
    id = models.PositiveIntegerField(unique=True)
    nickname = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    saved_conspects = models.JSONField()
    liked_conspects = models.JSONField(default=list)
    comments = models.JSONField()
    posted_conspects = models.JSONField()
    congregated_albums = models.JSONField()
    
    def __str__(self):
        return f"{self.nickname} ({self.email}), ID: {self.id}"
    
    