import { Box, CircularProgress } from '@mui/material';
import { Overlay, BoxWrapper } from './styled';

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
