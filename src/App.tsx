import React, { useEffect, useState } from 'react';
import './styles/index.css';
import QuoteApp from './components/QuoteApp';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <QuoteApp />
    </>
  );
}

export default App;
