from rest_framework import serializers

from custom_user.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'id',
            'name',
            'email',
            'created_at',
        )
