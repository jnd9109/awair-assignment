import { User } from '../@types/User';
import client from './client';

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface CreateUserResponse {
  user: User;
  password: string;
}

class UserService {
  fetchUsers = async () => {
    const response = await client({
      method: 'get',
      url: '/users/',
    });
    return response;
  };

  createUser = async (requestData: CreateUserRequest) => {
    const response = await client({
      method: 'post',
      url: '/users/',
      data: requestData,
    });
    return response;
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
