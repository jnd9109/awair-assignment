const Page = () => {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [errorAlert, setErrorAlert] = React.useState('');
  const [successAlert, setSuccessAlert] = React.useState('');

  const addUser = React.useCallback((user) => {
    setUsers([user, ...users])
  }, [users, setUsers]);

  const handleLoadUsers = React.useCallback(async () => {
    try {
      const { status, data } = await axios({
        method: 'get',
        url: '/users/',
      });
      if (status === 200) {
        setLoading(false);
        setUsers(data);
        return;
      }
    } catch (error) {
      setLoading(false);
       if (error.response) {
         const {response} = error;
         const { status, data } = response;
         console.error(status, data);
         setErrorAlert('Something went wrong...');
       }
    }
  }, [setUsers]);

  React.useEffect(() => {
    handleLoadUsers();
  }, []);

  const deleteUser = React.useCallback((id) => {
    setUsers(users.filter(user => user.id !== id));
  }, [setUsers, users]);

  return (
    <PageWrapper>
      <PageTitle>User List</PageTitle>
      {loading && <Loading />}
      {successAlert && <Alert status='success' message={successAlert} />}
      {errorAlert && (<Alert status='danger' message={errorAlert} />)}
      <UserCreateForm setLoading={setLoading} addUser={addUser} setSuccessAlert={setSuccessAlert} setErrorAlert={setErrorAlert} />
      <UserList users={users} deleteUser={deleteUser} setSuccessAlert={setSuccessAlert} setErrorAlert={setErrorAlert} setLoading={setLoading} />
    </PageWrapper>
  );
};

ReactDOM.render(<Page />, document.getElementById('root'));
