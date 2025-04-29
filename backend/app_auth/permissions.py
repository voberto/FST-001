# app_auth/permissions.py
from rest_framework.permissions import BasePermission


class IsAuthenticatedOrReadOnly(BasePermission):
    """
    Custom permission to only allow authenticated users to edit.
    Unauthenticated users can only read.
    """

    def has_permission(self, request, view):
        # Allow GET requests for everyone
        if request.method in ['GET']:
            return True
        # Allow other methods only for authenticated users
        return request.user.is_authenticated