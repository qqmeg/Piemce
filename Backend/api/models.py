from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.TextField(verbose_name="Имя", max_length=30, blank="user")
    # avatar = models.ImageField(verbose_name='Аватарка', upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(verbose_name="О себе", null=True, blank="no bio yet")
    passw = models.TextField(verbose_name="Пароль", max_length=100, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return f"{self.email}, пользователь {id} имя {username}"
