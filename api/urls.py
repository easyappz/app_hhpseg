from django.urls import path
from .views import (
    HelloView,
    RegistrationView,
    LoginView,
    LogoutView,
    ProfileView
)

urlpatterns = [
    path("hello/", HelloView.as_view(), name="hello"),
    path("auth/register/", RegistrationView.as_view(), name="register"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
    path("auth/profile/", ProfileView.as_view(), name="profile"),
]
