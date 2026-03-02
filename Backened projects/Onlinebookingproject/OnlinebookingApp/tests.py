from django.test import override_settings
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Booking, User


TEST_DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": ":memory:",
    }
}


@override_settings(DATABASES=TEST_DATABASES)
class OnlineBookingApiTests(APITestCase):
    def setUp(self):
        self.user_1 = User.objects.create(
            first_name="Layla",
            middle_name="",
            last_name="Hatibu",
            phone_number="255700000001",
            email="layla1@example.com",
            password="pass123",
            role="user",
        )
        self.user_2 = User.objects.create(
            first_name="Admin",
            middle_name="",
            last_name="User",
            phone_number="255700000002",
            email="admin@example.com",
            password="admin123",
            role="admin",
        )

    def test_login_success(self):
        response = self.client.post(
            "/api/login/",
            {"email": self.user_1.email, "password": "pass123"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], self.user_1.email)
        self.assertEqual(response.data["first_name"], self.user_1.first_name)
        self.assertEqual(response.data["role"], self.user_1.role)

    def test_login_missing_fields_returns_400(self):
        response = self.client.post("/api/login/", {"email": ""}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_login_invalid_credentials_returns_400(self):
        response = self.client.post(
            "/api/login/",
            {"email": self.user_1.email, "password": "wrong-pass"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "Invalid credentials")

    def test_booking_list_can_be_filtered_by_user(self):
        booking_1 = Booking.objects.create(
            user=self.user_1,
            travel_date="2026-03-10",
            travel_time="08:00:00",
            price="15000.00",
            number_of_seats=2,
        )
        Booking.objects.create(
            user=self.user_2,
            travel_date="2026-03-11",
            travel_time="10:00:00",
            price="20000.00",
            number_of_seats=1,
        )

        response = self.client.get(f"/api/bookings/?user={self.user_1.id}")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], booking_1.id)
        self.assertEqual(response.data[0]["user"], self.user_1.id)

    def test_admin_users_bookings_returns_nested_data(self):
        Booking.objects.create(
            user=self.user_1,
            travel_date="2026-03-12",
            travel_time="09:30:00",
            price="12000.00",
            number_of_seats=3,
        )

        response = self.client.get("/api/admin/users-bookings/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        layla_record = next(item for item in response.data if item["id"] == self.user_1.id)
        self.assertEqual(layla_record["email"], self.user_1.email)
        self.assertEqual(len(layla_record["bookings"]), 1)
