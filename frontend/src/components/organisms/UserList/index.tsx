import { Delete } from '@material-ui/icons';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { FC, useCallback } from 'react';

import { User } from '../../../@types/User';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { handleDeleteUser as handleDeleteUserAction } from '../../../reducers/user';

import { ListWrapper } from './styled';

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
    <ListWrapper>
      <Typography variant="h6" component="div">
        List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{moment(user.createdAt).format('LLL')}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteUser(user)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ListWrapper>
  );
};

export default UserList;
