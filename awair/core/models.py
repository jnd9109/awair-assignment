from datetime import datetime, timezone

from django.db import models


# Create your models here.
class ParanoidModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True, db_index=True)
    deleted_at = models.DateTimeField(db_index=True, null=True, blank=True)

    class Meta:
        abstract = True

    #  Soft delete
    def delete(self, using=None, keep_parents=False):
        self.deleted_at = datetime.now(tz=timezone.utc)
        self.save()
