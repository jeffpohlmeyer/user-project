from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers

from users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = 'id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'date_joined', 'last_login'


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password_reset_form_class = PasswordResetForm
    def validate_email(self, value):
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(_('Error'))

        ###### FILTER YOUR USER MODEL ######
        if not CustomUser.objects.filter(email=value).exists():

            raise serializers.ValidationError(_('Invalid e-mail address'))
        return value

    def save(self):
        request = self.context.get('request')
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),

            ###### USE YOUR TEXT FILE ######
            'email_template_name': 'example_message.txt',

            'request': request,
        }
        self.reset_form.save(**opts)