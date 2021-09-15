from rest_framework import viewsets, status
from rest_framework.response import Response

from custom_user.models import CustomUser
from custom_user.serializers import CustomUserSerializer
from custom_user.utils import generate_password


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

    def create(self, request, *args, **kwargs):
        if not request.data['email']:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        #  check unique email
        if CustomUser.objects.filter(email=request.data['email']).exists():
            return Response(status=status.HTTP_409_CONFLICT)

        password, hashed_password = generate_password()
        serializer = self.get_serializer(data=request.data, context={'hashed_password': hashed_password})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED, data={
            'user': serializer.data,
            'password': password,
        })

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response(status=status.HTTP_200_OK)
