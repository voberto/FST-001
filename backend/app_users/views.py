# app_users/views.py
import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view


logger = logging.getLogger(__name__)


@api_view(['GET'])
def test_view(request):
    return Response({'message': 'API is working!'})


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({'name': user.username, 'email': user.email})  # Return user info
