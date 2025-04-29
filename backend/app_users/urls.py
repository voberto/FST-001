# app_users/urls.py
from django.urls import path
from .views import UserView, test_view

urlpatterns = [
    path('test/', test_view, name='test'),  # Test endpoint
    path('', UserView.as_view(), name='user'),
]