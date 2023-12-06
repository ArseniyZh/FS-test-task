from rest_framework_simplejwt.tokens import RefreshToken


def get_new_access_token(refresh_token: str) -> str:
    """
    Функция для получения нового access токена
    """
    refresh = RefreshToken(refresh_token)
    new_access_token = str(refresh.access_token)
    return new_access_token
