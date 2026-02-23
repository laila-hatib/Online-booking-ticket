from rest_framework import serializers
from .models import User, Booking, Login

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  # all fields

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = '__all__'

# serializers.py
class UserBookingSerializer(serializers.ModelSerializer):
    bookings = BookingSerializer(many=True, read_only=True, source='booking_set')

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'bookings']
