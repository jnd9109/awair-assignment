const initialState = [];
const ADD_USERS = 'ADD_USERS';
const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';

const userReducer = (state, action) => {
  switch (action.type) {
    case ADD_USERS:
      const { users } = action.payload;
      return [...users];
    case ADD_USER:
      const { user } = action.payload;
      return ([user, ...state]);
    case DELETE_USER:
      const { userId } = action.payload;
      return state.filter(user => user.id !== userId);
    default:
      return state;
  }
}

const Page = () => {
  const [loading, setLoading] = React.useState(true);
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  const [errorAlert, setErrorAlert] = React.useState('');
  const [successAlert, setSuccessAlert] = React.useState('');
  const [recentlyAddedUser, setRecentlyAddedUser] = React.useState(null);

  const addUser = React.useCallback((user) => {
    dispatch({ type: ADD_USER, payload: { user } });
    setRecentlyAddedUser(user);
    setTimeout(() => {
      setRecentlyAddedUser(null);
    }, 3000);
  }, [dispatch, setRecentlyAddedUser]);

  const handleLoadUsers = React.useCallback(async () => {
    try {
      const { status, data } = await axios({
        method: 'get',
        url: '/users/',
      });
      if (status === 200) {
        setLoading(false);
        dispatch({ type: ADD_USERS, payload: { users: data } });
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
  }, [dispatch]);

  React.useEffect(() => {
    handleLoadUsers();
    moment.locale(navigator.language);
  }, []);

  const deleteUser = React.useCallback((id) => {
    dispatch({ type: DELETE_USER, payload: { userId: id } });
  }, [dispatch]);

  return (
    <PageWrapper>
      <PageTitle>User List</PageTitle>
      {loading && <Loading />}
      {successAlert && <Alert status='success' message={successAlert} />}
      {errorAlert && (<Alert status='danger' message={errorAlert} />)}
      <UserCreateForm setLoading={setLoading} addUser={addUser} setSuccessAlert={setSuccessAlert} setErrorAlert={setErrorAlert} />
      <UserList
        users={state}
        deleteUser={deleteUser}
        setSuccessAlert={setSuccessAlert}
        setErrorAlert={setErrorAlert}
        setLoading={setLoading}
        recentlyAddedUser={recentlyAddedUser}
      />
    </PageWrapper>
  );
};

ReactDOM.render(<Page />, document.getElementById('root'));
