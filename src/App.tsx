import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box, Grid, Typography, useMediaQuery } from '@mui/material';
import Sidebar from './components/Sidebar.tsx';
import Counter from './components/Counter.tsx';
import UserForm from './components/UserForm.tsx';
import RichTextEditor from './components/RichTextEditor.tsx';
import Dashboard from './components/Dashboard.tsx';

const App: React.FC = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <Router>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <Sidebar />
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        padding: isMobile ? '10px' : '20px', // Adjust padding for mobile
                    }}
                >
                    <Grid
                        container
                        spacing={4}
                        justifyContent="center"
                        sx={{ width: '100%' }}
                    >
                        <Routes>
                            <Route path="/counter" element={<Counter />} />
                            <Route
                                path="/rich-text-editor"
                                element={<RichTextEditor />}
                            />
                            <Route path="/user-form" element={<UserForm />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route
                                path="/"
                                element={
                                    <Typography variant="h6" align="center">
                                        Welcome! Select a section from the
                                        sidebar.
                                    </Typography>
                                }
                            />
                        </Routes>
                    </Grid>
                </Box>
            </Box>
        </Router>
    );
};

export default App;
