from django.contrib import admin
from django.urls import path, re_path
from django.conf.urls import include
from rest_framework import routers

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from users.views import UserViewSet, django_rest_auth_null, ConfirmEmailView

router = routers.DefaultRouter()
router.register('users', UserViewSet, base_name='users')

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path('api/', include(router.urls)),
    path('rest-auth/', include('rest_auth.urls')),
    re_path(r'^accounts/confirm-email/(?P<key>[-:\w]+)/$', ConfirmEmailView.as_view(), name='account_confirm_email'),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/registration/account-email-verification-sent/', django_rest_auth_null, name='account_email_verification_sent'),
    path('simple/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('simple/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('simple/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('accounts/', include('allauth.urls')),
    path('admin/', admin.site.urls),
]
