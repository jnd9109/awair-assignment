import moment from 'moment';
import { FC, useCallback } from 'react';
import { User } from '../../../@types/User';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { handleDeleteUser as handleDeleteUserAction } from '../../../reducers/user';

interface UserListProps {
  users: User[];
}

const UserList: FC<UserListProps> = ({ users }) => {
  const dispatch = useAppDispatch();

  const handleDeleteUser = useCallback(
    async (user) => {
      if (confirm(`Are you sure you want to delete ${user.email} ?`)) {
        try {
          dispatch(handleDeleteUserAction(user.id));
        } catch (error) {
          console.error(error);
        }
      }
    },
    [dispatch],
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Created at</th>
          <th scope="col">Email</th>
          <th scope="col">Name</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user: User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{moment(user.createdAt).format('LLL')}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ marginLeft: '4px' }}
                  onClick={() => handleDeleteUser(user)}
                >
                  <i
                    className="bi bi-trash"
                    style={{ color: 'white', cursor: 'pointer' }}
                  />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default UserList;
