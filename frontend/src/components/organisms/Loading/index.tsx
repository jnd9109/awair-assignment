import { Box, CircularProgress } from '@mui/material';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
`;

const Loading = () => (
  <LoadingWrapper>
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  </LoadingWrapper>
);

export default Loading;
