from rest_framework import serializers

from custom_user.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    name = serializers.CharField(allow_null=False, allow_blank=False, max_length=128, min_length=1)
    email = serializers.EmailField(allow_null=False, allow_blank=False)

    class Meta:
        model = CustomUser
        fields = (
            'id',
            'name',
            'email',
            'created_at',
        )

    def create(self, validated_data):
        hashed_password = self.context['hashed_password']
        user = CustomUser.objects.create(
            name=validated_data['name'],
            email=validated_data['email'],
            password=hashed_password,
        )
        return user
