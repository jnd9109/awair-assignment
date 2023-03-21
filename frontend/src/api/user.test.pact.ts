import { describe, it, expect, beforeAll } from '@jest/globals';
import { like } from '@pact-foundation/pact/src/dsl/matchers';
import provider from '../../test/pact/provider';
import userService from './user';

const user = {
  id: '1234567890',
  name: 'Starlord',
  email: 'startlord@gotg.com',
  createdAt: '2021-01-01T00:00:00.000Z',
};

describe('User api tests', () => {
  describe('fetches users', () => {
    beforeAll(async () => {
      await provider.addInteraction({
        state: 'List users',
        uponReceiving: 'a request to get the list of users',
        withRequest: {
          method: 'GET',
          path: '/users/',
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: like([user]),
        },
      });
    });

    it('request', async () => {
      const response = await userService.fetchUsers();
      expect(response.data).toEqual([user]);
    });
  });

  describe('creates users', () => {
    const newUserRequest = {
      name: 'Starlord',
      email: 'starlord@gotg2.com',
    };

    const newUserResponse = {
      user: {
        id: '1234567890',
        createdAt: '2021-01-01T00:00:00.000Z',
        ...newUserRequest,
      },
      password: 'password',
    };

    beforeAll(async () => {
      await provider.addInteraction({
        state: 'Create user',
        uponReceiving: 'a request to create a user',
        withRequest: {
          method: 'POST',
          path: '/users/',
          body: like(newUserRequest),
        },
        willRespondWith: {
          status: 201,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: like(newUserResponse),
        },
      });
    });

    it('request', async () => {
      const response = await userService.createUser(newUserRequest);
      expect(response.data).toEqual(newUserResponse);
    });
  });

  describe('deletes users', () => {
    beforeAll(async () => {
      await provider.addInteraction({
        state: 'Delete user',
        uponReceiving: 'a request to delete a user',
        withRequest: {
          method: 'DELETE',
          path: `/users/${user.id}`,
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: like({ userId: user.id }),
        },
      });
    });

    it('request', async () => {
      const response = await userService.deleteUser(user.id);
      expect(response.data).toEqual({ userId: user.id });
    });
  });
});
