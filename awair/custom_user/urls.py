from rest_framework import routers

from custom_user.views import CustomUserViewSet

router = routers.SimpleRouter()
router.register(r'', CustomUserViewSet, basename='users')
urlpatterns = router.urls
