import { Alert, Divider, Stack, Typography } from '@mui/material';
import { FC, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { handleFetchUsers } from '../reducers/user';
import Loading from './organisms/Loading';
import UserCreateForm from './organisms/UserCreateForm';
import UserList from './organisms/UserList';

const PageWrapper = styled.div`
  padding: 16px;
`;

const App: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { loading, users, success, failed } = useAppSelector(
    (state) => state.users,
  );
  const userList = useMemo(() => {
    if (Object.values(users).length > 0) {
      return Object.values(users);
    }
    return [];
  }, [users]);
  useEffect(() => {
    dispatch(handleFetchUsers());
  }, [dispatch]);

  return (
    <>
      {loading && <Loading />}
      <PageWrapper>
        <Typography variant="h3" component="div">
          Users
        </Typography>
        <Stack>
          {success && <Alert severity="success">{success}</Alert>}
          {failed && <Alert severity="error">{failed}</Alert>}
        </Stack>
        <UserCreateForm />
        <Divider />
        <UserList users={userList} />
      </PageWrapper>
    </>
  );
};

export default App;
