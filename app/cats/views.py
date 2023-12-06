from rest_framework import generics, status, permissions
from rest_framework.response import Response

from .serializers import CatCreateSerializer, CatSerializer, CatUpdateSerializer, CatDeleteSerializer
from .models import Cat


class CatCreateView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CatCreateSerializer

    def post(self, request):
        user = request.user
        data = request.data
        serializer = self.get_serializer(data=data, context={"user": user})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)


class CatUserListView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CatSerializer

    def get(self, request):
        user = request.user
        queryset = Cat.objects.filter(owner=user)
        serializer = self.get_serializer(instance=queryset, many=True)
        data = serializer.data
        return Response(data=data, status=status.HTTP_200_OK)


class CatUpdateView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CatUpdateSerializer

    def patch(self, request):
        user = request.user
        data = request.data
        cat = Cat.objects.get(id=data.get("id"))
        serializer = self.get_serializer(data=data, instance=cat, context={"user": user}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = serializer.data
        return Response(data=data, status=status.HTTP_200_OK)


class CatDeleteView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CatDeleteSerializer

    def delete(self, request):
        user = request.user
        data = request.data
        serializer = self.get_serializer(data=data, context={"user": user})
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.data
        Cat.objects.get(id=validated_data.get("id")).delete()
        return Response(status=status.HTTP_200_OK)


