import { Box, CircularProgress } from '@mui/material';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
`;

const BoxWrapper = styled.div`
  position: absolute;
  top: 50%;
  margin-top: -20px;
  height: 40px;
  left: 50%;
  margin-left: --20px;
  width: 40px;
`;

const Loading = () => (
  <Overlay>
    <BoxWrapper>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </BoxWrapper>
  </Overlay>
);

export default Loading;
