const Loading = () => (
  <LoadingWrapper>
    <LoadingSpinner />
  </LoadingWrapper>
)

const UserCreateForm = ({ setLoading }) => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [errorAlert, setErrorAlert] = React.useState('');
  const [successAlert, setSuccessAlert] = React.useState('');

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
      return ;
    }
    if (!name) {
      setNameError('Please input a name.');
      return ;
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
        setSuccessAlert(`User has been created. Please carefully save the password: ${data.password}`)
        return ;
      }
    } catch (error) {
      setLoading(false);
       if (error.response) {
         const {response} = error;
         const { status, data } = response;

         if (status === 409) {
           setEmailError('This email is already used.');
           return ;
         } else {
           setErrorAlert('Something went wrong...');
           return ;
         }
       }
    }
  }, [emailRegex, email, name]);

  return (
    <React.Fragment>
      {successAlert && <Alert status='success' message={successAlert} />}
      {errorAlert && (<Alert status='danger' message={errorAlert} />)}
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