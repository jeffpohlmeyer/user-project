from django.test import TestCase
from ..models import CustomUser


class UserTest(TestCase):

    @staticmethod
    def create_user():
        return CustomUser.objects.create(username='test_user', email='test_user@mail.com')

    def test_user_creation(self):
        user = self.create_user()
        self.assertTrue(isinstance(user, CustomUser))
        self.assertEqual(user.__str__(), user.email)
