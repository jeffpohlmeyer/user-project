from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase, URLPatternsTestCase, force_authenticate

from django.urls import include, path, reverse

from ..views import UserViewSet
from ..models import CustomUser


class TestUrls(APITestCase, URLPatternsTestCase):
    urlpatterns = [
        path('api/', include('byf.urls'))
    ]

    def setUp(self):
        CustomUser.objects.create(username='bob', email='bob@gmail.com')
        CustomUser.objects.create(username='joe', email='joe@gmail.com')
        CustomUser.objects.create(username='bill', email='bill@gmail.com')
        CustomUser.objects.create(username='james', email='james@gmail.com')

    def test_user_list_authorized(self):
        factory = APIRequestFactory()
        view = UserViewSet.as_view(actions={'get': 'list'})
        request = factory.get(reverse('users-list'))
        force_authenticate(request, user=CustomUser.objects.get(username='bob'))
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 4)

    def test_user_details_authorized(self):
        user = CustomUser.objects.get(username='bob')
        factory = APIRequestFactory()
        users_list_view = UserViewSet.as_view(actions={'get': 'list'})
        users_list_request = factory.get(reverse('users-list'))
        force_authenticate(users_list_request, user=user)
        users_list_response = users_list_view(users_list_request)
        user_id = users_list_response.data[1].get('id')
        user_detail_view = UserViewSet.as_view(actions={'get': 'retrieve'})
        user_detail_request = factory.get(reverse('users-detail', kwargs={'pk': user_id}))
        force_authenticate(user_detail_request, user=user)
        user_detail_response = user_detail_view(user_detail_request, pk=user_id)
        self.assertEqual(user_detail_response.status_code, status.HTTP_200_OK)
        self.assertEqual(user_detail_response.data.get('id'), user_id)

    def test_user_list_un_authorized(self):
        factory = APIRequestFactory()
        view = UserViewSet.as_view(actions={'get': 'list'})
        request = factory.get(reverse('users-list'))
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_details_un_authorized(self):
        user = CustomUser.objects.get(username='bob')
        factory = APIRequestFactory()
        users_list_view = UserViewSet.as_view(actions={'get': 'list'})
        users_list_request = factory.get(reverse('users-list'))
        force_authenticate(users_list_request, user=user)
        users_list_response = users_list_view(users_list_request)
        user_id = users_list_response.data[1].get('id')
        user_detail_view = UserViewSet.as_view(actions={'get': 'retrieve'})
        user_detail_request = factory.get(reverse('users-detail', kwargs={'pk': user_id}))
        user_detail_response = user_detail_view(user_detail_request, pk=user_id)
        self.assertEqual(user_detail_response.status_code, status.HTTP_401_UNAUTHORIZED)
