from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.TextField(verbose_name="Имя", max_length=30, blank=True)
    # avatar = models.ImageField(verbose_name='Аватарка', upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(verbose_name="О себе", null=True, default="no bio yet")
    password = models.TextField(verbose_name="Пароль", max_length=100, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return f"{self.email}, пользователь {id} имя {self.username}"


class AuthToken(models.Model):
    """
    Упрощённый токен для dev-авторизации (не production).
    Храним случайный ключ и связь с нашим кастомным User.
    """

    key = models.CharField(max_length=64, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tokens")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Токен"
        verbose_name_plural = "Токены"

    def __str__(self):
        return f"Token({self.key[:8]}...) for user {self.user_id}"
