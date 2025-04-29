# authapp/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.middleware.csrf import get_token
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django import forms


# Define a form for user login
class LoginForm(forms.Form):
    email = forms.EmailField()  # Use Django's EmailField for validation
    password = forms.CharField(widget=forms.PasswordInput)  # Password field


@api_view(['POST'])
def login_view(request):
    form = LoginForm(data=request.data)  # Create a form instance with the request data

    if not form.is_valid():  # Validate the form
        return Response({'error': 'Invalid email or password format'}, status=status.HTTP_400_BAD_REQUEST)

    email = form.cleaned_data['email']  # Get the cleaned email
    password = form.cleaned_data['password']  # Get the cleaned password

    try:
        # Get the user by email
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    # Authenticate the user using the username (which is the email in this case)
    user = authenticate(username=user.username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_200_OK)

    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def csrf_token_view(request):
    return Response({'csrfToken': get_token(request)})