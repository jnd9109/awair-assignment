const Loading = () => (
  <LoadingWrapper>
    <LoadingSpinner />
  </LoadingWrapper>
)

const UserCreateForm = ({ setLoading, addUser, setSuccessAlert, setErrorAlert }) => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [nameError, setNameError] = React.useState('');

  const emailRegex = React.useMemo(() => {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  }, []);

  const emailOnChange = React.useCallback((e) => {
    setEmail(e.target.value);
    setEmailError('');
  }, [email, emailError]);

  const handleNameChange = React.useCallback((e) => {
    setName(e.target.value);
    setNameError('');
  }, [name, nameError]);

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setEmailError('This email is not valid.');
      return;
    }
    if (!name) {
      setNameError('Please input a name.');
      return;
    }
    setErrorAlert('');
    setSuccessAlert('');
    setLoading(true);
    try {
      const { status, data } = await axios({
        method: 'post',
        url: '/users/',
        data: {
          name,
          email,
        }
      });
      if (status === 201) {
        setLoading(false);
        addUser(data.user);
        setSuccessAlert(`User has been created. Please carefully save the password: ${data.password}`);
        setEmail('');
        setName('');
        return;
      }
    } catch (error) {
      setLoading(false);
       if (error.response) {
         const {response} = error;
         const { status, data } = response;
         console.error(status, data);

         if (status === 409) {
           setEmailError('This email is already used.');
           return;
         } else {
           setErrorAlert('Something went wrong...');
           return;
         }
       }
    }
  }, [emailRegex, email, name, setLoading, addUser, setSuccessAlert, setErrorAlert]);

  return (
    <React.Fragment>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              minLength={0}
              maxLength={254}
              value={email}
              onChange={emailOnChange}
              placeholder='test@gmail.com'
            />
            {emailError && (
              <div id="validationEmail" className="invalid-feedback" style={{ display: 'block' }}>
                {emailError}
              </div>
            )}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
            <input
              type="text"
              minLength={0}
              maxLength={128}
              className="form-control"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder='John Doe'
            />
            {nameError && (
              <div id="validationName" className="invalid-feedback" style={{ display: 'block' }}>
                {nameError}
              </div>
            )}
        </div>
        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </React.Fragment>
  );
};

const UserList = ({ users, deleteUser, setSuccessAlert, setErrorAlert, setLoading, recentlyAddedUser }) => {
  const handleDeleteUser = React.useCallback(async (user) => {
    if (confirm(`Are you sure you want to delete ${user.email} ?`)) {
      try {
        setLoading(true);
        const { status, data } = await axios({
          method: 'delete',
          url: `/users/${user.id}/`,
        });
        if (status === 200) {
          setLoading(false);
          setSuccessAlert(`User ${user.email} has been deleted.`)
          deleteUser(user.id);
          return;
        }
      } catch (error) {
        setLoading(false);
        if (error.response) {
          const {response} = error;
          const {status, data} = response;
         console.error(status, data);

          if (status === 404) {
            setErrorAlert('User not found');
            return;
          } else {
            setErrorAlert('Something went wrong...');
            return;
          }
        }
      }
    }
  }, [setLoading, deleteUser, setErrorAlert, setSuccessAlert]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Email</th>
          <th scope="col">Name</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {users && users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
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
}
