const PageWrapper = styled.div`
  padding: 16px;
`;

const PageTitle = styled.h1`

`;

const LoadingWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -25px;
  margin-top: -25px;
  height: 50px;
  width: 50px;
`;