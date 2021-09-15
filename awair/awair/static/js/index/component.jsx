const Page = () => {
  const [loading, setLoading] = React.useState(false);

  return (
    <PageWrapper>
      <PageTitle>User List</PageTitle>
      {loading && <Loading />}
      <UserCreateForm setLoading={setLoading} />
    </PageWrapper>
  );
};

ReactDOM.render(<Page />, document.getElementById('root'));
