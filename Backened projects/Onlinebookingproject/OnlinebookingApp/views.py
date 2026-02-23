from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User, Booking
from .serializers import UserSerializer, BookingSerializer

from .serializers import UserBookingSerializer

# -----------------------
# User CRUD
# -----------------------
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# -----------------------
# Booking CRUD
# -----------------------
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()  # 👈 required
    serializer_class = BookingSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get("user")
        if user_id:
            return Booking.objects.filter(user__id=user_id)
        return super().get_queryset()



# -----------------------
# Login API
# -----------------------
@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email, password=password)
        return Response({
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "role": user.role
        })
    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
def admin_view_users_bookings(request):
    users = User.objects.all()
    serializer = UserBookingSerializer(users, many=True)
    return Response(serializer.data)
