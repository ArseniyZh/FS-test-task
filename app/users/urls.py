from django.urls import path

from . import views

urlpatterns = [
    path("registration/", views.UserRegisterView.as_view(), name="registration"),
    path("login/", views.UserLoginAPIView.as_view(), name="login"),
    path("logout/", views.UserLogoutAPIView.as_view(), name="logout"),
    path("get_new_access_token/", views.UserGetNewAccessToken.as_view(), name="get_new_access_token"),

    path("user_info/", views.UserInfo.as_view(), name="user_info"),
]
