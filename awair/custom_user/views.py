from rest_framework import viewsets
from rest_framework.response import Response

from custom_user.models import CustomUser
from custom_user.serializers import CustomUserSerializer


class CustomUserViewSet(viewsets.GenericViewSet):
    queryset = CustomUser.objects.filter(deleted_at=None).order_by('-created_at')
    serializer_class = CustomUserSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset().values(
            'id',
            'name',
            'email',
            'created_at',
        )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
