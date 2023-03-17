import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  background-color: rgba(0 0 0 / 60%);
  width: 100vw;
  height: 100vh;
`;

export const BoxWrapper = styled.div`
  position: absolute;
  top: 50%;
  margin-top: -20px;
  height: 40px;
  left: 50%;
  margin-left: -20px;
  width: 40px;
`;
