from django.db import models


class User(models.Model):
    email = models.EmailField(unique=True)
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # avatar = models.ImageField(verbose_name='Аватарка', upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(verbose_name='О себе', null=True, blank=True)

    

    def __str__(self):
        return self.email