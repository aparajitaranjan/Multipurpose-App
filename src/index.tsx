// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import App from './App.tsx';
import theme from './theme.ts';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />x
    </ThemeProvider>,
    document.getElementById('root')
);
