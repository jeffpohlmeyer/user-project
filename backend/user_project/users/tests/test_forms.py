from django.test import TestCase, Client
from ..forms import CustomUserCreationForm, CustomUserChangeForm
from ..models import CustomUser


class UserTest(TestCase):

    # def setUp(self):
    #     CustomUser.objects.create(username='bob', email='bob@gmail.com')
    #     CustomUser.objects.create(username='joe', email='joe@gmail.com')
    #     CustomUser.objects.create(username='bill', email='bill@gmail.com')

    def test_user_creation_form_valid(self):
        form = CustomUserCreationForm(data={
            'username': 'bob',
            'email': 'bob@gmail.com',
            'password1': 'jdkshghaie3#$*i',
            'password2': 'jdkshghaie3#$*i'
        })
        self.assertTrue(form.is_valid())

    def test_user_creation_form_invalid(self):
        form = CustomUserCreationForm(data={
            'username': 'bob',
            'email': 'bob@gmail.com',
            'password1': 'jdkshghaie3#$*',
            'password2': 'jdkshghaie3#$*i'
        })
        self.assertFalse(form.is_valid())

    def test_user_change_form_valid(self):
        form = CustomUserCreationForm(data={
            'username': 'bob',
            'email': 'bob@gmail.com',
            'password1': 'jdkshghaie3#$*i',
            'password2': 'jdkshghaie3#$*i'
        })
        self.assertTrue(form.is_valid())

    def test_user_change_form_invalid(self):
        form = CustomUserCreationForm(data={
            'username': 'bob',
            'email': 'bob@gmail.com',
            'password1': 'jdkshghaie3#$*',
            'password2': 'jdkshghaie3#$*i'
        })
        self.assertFalse(form.is_valid())
