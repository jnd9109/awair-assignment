import uuid

from django.db import models

from core.models import ParanoidModel


class CustomUser(ParanoidModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=128, null=False, blank=False)
    email = models.EmailField(null=False, blank=False, unique=True)
    password = models.CharField(max_length=128, blank=False, null=False)

    def __str__(self):
        return f'[{self.id}] {self.email}'
