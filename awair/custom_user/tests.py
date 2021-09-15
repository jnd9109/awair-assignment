import uuid

from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

# Create your tests here.
from custom_user.models import CustomUser
from custom_user.utils import generate_password


class CustomUserTestCase(APITestCase):
    def setUp(self):
        _, hashed_password = generate_password()
        self.first_user = CustomUser.objects.create(
            name='test',
            email='test@gmail.com',
            password=hashed_password,
        )

    def test_list_users(self):
        list_url = reverse('users-list')

        response = self.client.get(list_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], self.first_user.name)
        self.assertEqual(response.data[0]['email'], self.first_user.email)

    def test_retrieve_user(self):
        #  Not Found Retrieve
        detail_url = reverse('users-detail', kwargs={'pk': uuid.uuid4()})

        response = self.client.get(detail_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        #  Successful Retrieve
        detail_url = reverse('users-detail', kwargs={'pk': self.first_user.id})

        response = self.client.get(detail_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.first_user.name)
        self.assertEqual(response.data['email'], self.first_user.email)

    def test_create_user(self):
        create_url = reverse('users-list')
        data = {
            'name': 'test2',
            'email': 'test@gmail.com',
        }

        #  Bad Request (missing data)
        response = self.client.post(create_url, data={}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        #  Unique email conflict
        response = self.client.post(create_url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)

        #  Successful create
        data['email'] = 'test2@gmail.com'
        response = self.client.post(create_url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['password'] is not None and response.data['password'] != '')
        self.assertEqual(response.data['user']['name'], data['name'])
        self.assertEqual(response.data['user']['email'], data['email'])

    def test_destroy_user(self):
        #  Not Found Destroy
        detail_url = reverse('users-detail', kwargs={'pk': uuid.uuid4()})

        response = self.client.get(detail_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        #  Successful Destroy
        detail_url = reverse('users-detail', kwargs={'pk': self.first_user.id})

        response = self.client.delete(detail_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        #  Not Found Retrieve
        response = self.client.get(detail_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
