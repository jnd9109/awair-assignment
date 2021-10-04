import { FC, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { handleFetchUsers } from '../reducers/user';
import Loading from './organisms/Loading';
import UserList from './organisms/UserList';

const PageWrapper = styled.div`
  padding: 16px;
`;

const PageTitle = styled.h1``;

const App: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { loading, users } = useAppSelector((state) => state.users);
  const userList = useMemo(() => {
    if (Object.values(users).length > 0) {
      return Object.values(users);
    }
    return [];
  }, [users]);
  useEffect(() => {
    dispatch(handleFetchUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <>
      {loading && <Loading />}
      <PageWrapper>
        <PageTitle>User List</PageTitle>
        <UserList users={userList} />
      </PageWrapper>
    </>
  );
};

export default App;
