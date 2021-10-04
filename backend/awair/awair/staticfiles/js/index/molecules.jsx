const LoadingSpinner = () => (
  <SpinnerContainer className="spinner-grow" role="status">
    <span className="visually-hidden">Loading...</span>
  </SpinnerContainer>
);

const Alert = ({ status, message }) => (
  <div className={`alert alert-${status}`} role="alert">
    {message}
  </div>
);
