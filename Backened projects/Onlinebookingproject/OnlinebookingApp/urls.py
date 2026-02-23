from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, BookingViewSet, login_view
from .views import admin_view_users_bookings

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view),
    path('admin/users-bookings/', admin_view_users_bookings),
]
