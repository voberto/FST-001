# myproject/urls.py
from django.urls import path, include
from app_auth.views import login_view, csrf_token_view

urlpatterns = [
    path('api/login/', login_view),
    path('api/csrf/', csrf_token_view),
    path('api/users/', include('app_users.urls')),  # Include app_user URLs
]