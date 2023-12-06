from rest_framework import generics, status, permissions
from rest_framework.response import Response

from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserLogoutSerializer
from .utils import get_new_access_token


class UserRegisterView(generics.GenericAPIView):
    serializer_class = UserRegistrationSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = serializer.data
        return Response(data=data, status=status.HTTP_201_CREATED)


class UserLoginAPIView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.data
        return Response(data=data, status=status.HTTP_200_OK)


class UserLogoutAPIView(generics.GenericAPIView):
    serializer_class = UserLogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserGetNewAccessToken(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        refresh_token = request.GET.get("refresh_token")
        access_token = get_new_access_token(refresh_token)
        data = {"access": access_token}
        return Response(data=data, status=status.HTTP_200_OK)


class UserInfo(generics.GenericAPIView):
    permissions = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        data = {
            "id": user.id,
            "username": user.username,
        }
        return Response(data=data, status=status.HTTP_200_OK)
