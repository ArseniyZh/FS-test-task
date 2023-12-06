from rest_framework import serializers

from users.models import User

from .models import Breed, Cat


class CatCreateSerializer(serializers.Serializer):
    breed_title = serializers.CharField(required=True)
    nickname = serializers.CharField(required=True)
    age = serializers.IntegerField(required=True)

    def create(self, validated_data):
        context = self.context
        breed_title = validated_data.get("breed_title")
        nickname = validated_data.get("nickname")
        age = validated_data.get("age")

        owner = context.get("user")
        breed = Breed.objects.get_or_create(title=breed_title)[0]

        cat = Cat.objects.create(
            owner=owner,
            breed=breed,
            nickname=nickname,
            age=age,
        )

        return cat

    def validate(self, attrs):
        breed_title = attrs.get("breed_title")
        nickname = attrs.get("nickname")
        age = attrs.get("age")

        if len(breed_title) < 5:
            raise serializers.ValidationError("Длина названия породы не может быть меньше 5 символов")

        if len(nickname) < 3:
            raise serializers.ValidationError("Длина клички не может быть меньше 3 символов")
        elif len(nickname) > 15:
            raise serializers.ValidationError("Длина клички не может быть больше 15 символов")

        if age < 0:
            raise serializers.ValidationError("Возраст не может быть меньше 0")

        return attrs


class CatSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField()
    owner = serializers.SerializerMethodField()
    breed = serializers.SerializerMethodField()
    nickname = serializers.SerializerMethodField()
    age = serializers.SerializerMethodField()

    def get_id(self, obj):
        return obj.id

    def get_owner(self, obj):
        owner = obj.owner
        owner_data = {
            "id": owner.id,
            "username": owner.username,
        }
        return owner_data

    def get_breed(self, obj):
        breed = obj.breed
        if not breed:
            return None
        breed_data = {
            "id": breed.id,
            "title": breed.title,
        }
        return breed_data

    def get_nickname(self, obj):
        return obj.nickname

    def get_age(self, obj):
        return obj.age


class CatUpdateSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    breed_title = serializers.CharField(required=False)
    nickname = serializers.CharField(required=False)
    age = serializers.IntegerField(required=False)

    def update(self, instance, validated_data):
        # Обновление полей объекта instance на основе validated_data
        breed = Breed.objects.get_or_create(title=validated_data.get('breed_title', instance.breed.title))[0]
        instance.breed = breed
        instance.nickname = validated_data.get('nickname', instance.nickname)
        instance.age = validated_data.get('age', instance.age)

        # Сохранение обновленного объекта в базе данных
        instance.save()

        return instance

    def validate(self, attrs):
        context = self.context
        instance_id = attrs.get("id")
        breed_title = attrs.get("breed_title")
        nickname = attrs.get("nickname")
        age = attrs.get("age")

        try:
            cat = Cat.objects.get(id=instance_id)
        except Cat.DoesNotExist:
            raise serializers.ValidationError("Такой кот не найден")

        user = context.get("user")

        if cat.owner != user:
            raise serializers.ValidationError("Кот не пренадлежит вам")

        if breed_title and len(breed_title) < 5:
            raise serializers.ValidationError("Длина названия породы не может быть меньше 5 символов")

        if nickname and len(nickname) < 3:
            raise serializers.ValidationError("Длина клички не может быть меньше 3 символов")
        elif nickname and len(nickname) > 15:
            raise serializers.ValidationError("Длина клички не может быть больше 15 символов")

        if age and age < 0:
            raise serializers.ValidationError("Возраст не может быть меньше 0")

        return attrs


class CatDeleteSerializer(serializers.Serializer):
    id = serializers.IntegerField()

    def validate(self, attrs):
        context = self.context
        instance_id = attrs.get("id")

        user = context.get("user")

        try:
            cat = Cat.objects.get(id=instance_id)
        except Cat.DoesNotExist:
            raise serializers.ValidationError("Такой кот не найден")

        user = context.get("user")

        if cat.owner != user:
            raise serializers.ValidationError("Кот не пренадлежит вам")

        return attrs

