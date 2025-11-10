from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils import timezone
from django.contrib.auth import authenticate
from drf_spectacular.utils import extend_schema
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    MessageSerializer,
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserProfileSerializer
)
from .models import UserProfile


class HelloView(APIView):
    """
    A simple API endpoint that returns a greeting message.
    """

    @extend_schema(
        responses={200: MessageSerializer}, description="Get a hello world message"
    )
    def get(self, request):
        data = {"message": "Hello!", "timestamp": timezone.now()}
        serializer = MessageSerializer(data)
        return Response(serializer.data)


class RegistrationView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        request=UserRegistrationSerializer,
        responses={201: UserProfileSerializer},
        description="Register a new user"
    )
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user_profile = serializer.save()
            refresh = RefreshToken.for_user(user_profile.user)
            
            profile_serializer = UserProfileSerializer(user_profile)
            
            return Response({
                'user': profile_serializer.data,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        request=UserLoginSerializer,
        responses={200: UserProfileSerializer},
        description="Login user with email and password"
    )
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            user = authenticate(username=email, password=password)
            
            if user is not None:
                try:
                    user_profile = UserProfile.objects.get(user=user)
                    refresh = RefreshToken.for_user(user)
                    
                    profile_serializer = UserProfileSerializer(user_profile)
                    
                    return Response({
                        'user': profile_serializer.data,
                        'access': str(refresh.access_token),
                        'refresh': str(refresh)
                    }, status=status.HTTP_200_OK)
                except UserProfile.DoesNotExist:
                    return Response(
                        {'error': 'Профиль пользователя не найден.'},
                        status=status.HTTP_404_NOT_FOUND
                    )
            else:
                return Response(
                    {'error': 'Неверный email или пароль.'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=None,
        responses={205: None},
        description="Logout current user"
    )
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({'message': 'Успешный выход из системы.'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({'message': 'Успешный выход из системы.'}, status=status.HTTP_205_RESET_CONTENT)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={200: UserProfileSerializer},
        description="Get current user profile"
    )
    def get(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(user_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response(
                {'error': 'Профиль пользователя не найден.'},
                status=status.HTTP_404_NOT_FOUND
            )

    @extend_schema(
        request=UserProfileSerializer,
        responses={200: UserProfileSerializer},
        description="Update current user profile (full update)"
    )
    def put(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(user_profile, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except UserProfile.DoesNotExist:
            return Response(
                {'error': 'Профиль пользователя не найден.'},
                status=status.HTTP_404_NOT_FOUND
            )

    @extend_schema(
        request=UserProfileSerializer,
        responses={200: UserProfileSerializer},
        description="Partially update current user profile"
    )
    def patch(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except UserProfile.DoesNotExist:
            return Response(
                {'error': 'Профиль пользователя не найден.'},
                status=status.HTTP_404_NOT_FOUND
            )
