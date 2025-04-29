from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed


class TokenValidationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Skip validation for non-authenticated routes
        if request.path in ['/api/login/', '/api/token/refresh/', '/api/csrf/']:
            return None

        # Get the token from the Authorization header
        auth = request.headers.get('Authorization', None)
        print(auth)
        print(request.headers)

        if auth is None:
            raise AuthenticationFailed('Authorization header is missing.')

        try:
            # Extract the token
            token = auth.split(' ')[1]  # noqa: F841
            # Validate the token
            user, _ = JWTAuthentication().authenticate(request)
            request.user = user  # Set the user in the request
        except Exception as e:  # noqa: F841
            raise AuthenticationFailed('Invalid or expired token.')

        return None