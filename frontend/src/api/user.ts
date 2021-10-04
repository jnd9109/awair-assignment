import { User } from '../@types/User';
import client from './client';

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface CreateUserResponse {
  user: User;
}

class UserService {
  fetchUsers = async () =>
    client({
      method: 'get',
      url: '/users/',
    });

  createUser = async (
    requestData: CreateUserRequest,
  ): Promise<CreateUserResponse> => {
    const { data } = await client({
      method: 'post',
      url: '/users/',
      data: requestData,
    });
    return data;
  };

  deleteUser = async (userId: string) => {
    const response = await client({
      method: 'delete',
      url: `/users/${userId}`,
    });
    return response;
  };
}

export default new UserService();
