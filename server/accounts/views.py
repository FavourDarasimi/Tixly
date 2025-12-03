from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    # This callback URL must match exactly what you set in your Google Cloud Console
    callback_url = "http://localhost:3000" 
    client_class = OAuth2Client