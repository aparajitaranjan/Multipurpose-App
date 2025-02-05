import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; // Rich text editor
import 'react-quill/dist/quill.snow.css'; // Editor styles
import { Button, Typography, Box } from '@mui/material'; // UI components

const RichTextEditor = () => {
    const [content, setContent] = useState(''); // Store content from the editor
    const [isSaving, setIsSaving] = useState(false); // Track if the content is being saved

    // Load content from local storage when the component mounts
    useEffect(() => {
        const savedContent = localStorage.getItem('richTextContent'); // Get saved content
        if (savedContent) {
            setContent(savedContent); // Set saved content to the editor
        }
    }, []);

    // Automatically save content to local storage after 500ms of inactivity
    useEffect(() => {
        if (isSaving) {
            const timeout = setTimeout(() => {
                localStorage.setItem('richTextContent', content); // Save content to local storage
                setIsSaving(false); // Mark content as saved
            }, 500); // Save after 500ms of inactivity
            return () => clearTimeout(timeout); // Clean up timeout if the content changes before 500ms
        }
    }, [content, isSaving]);

    // Warn the user about unsaved changes if they try to leave the page
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isSaving) {
                e.preventDefault(); // Prevent default action
                e.returnValue = ''; // Show warning message in the browser
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload); // Listen for beforeunload event
        return () =>
            window.removeEventListener('beforeunload', handleBeforeUnload); // Clean up the event listener
    }, [isSaving]);

    return (
        <Box
            sx={{
                maxWidth: '800px',
                margin: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column', // Stack the editor and button vertically
                alignItems: 'center', // Center content horizontally
                justifyContent: 'center', // Center content vertically
                height: '100vh', // Full viewport height to center content vertically
                width: {
                    xs: '90%', // 90% width on small screens
                    sm: '60%', // 60% width on medium screens and up
                },
            }}
        >
            <Typography variant="h5" gutterBottom>
                Rich Text Editor
            </Typography>
            <ReactQuill
                value={content} // Set the content in the editor
                onChange={(newContent) => {
                    setContent(newContent); // Update the content when user types
                    setIsSaving(true); // Mark content as unsaved
                }}
                style={{
                    height: '300px',
                    width: '100%', // Ensures ReactQuill takes full width of its container
                }}
            />
            {/* Save button centered */}
            <Box sx={{ marginTop: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        localStorage.setItem('richTextContent', content); // Save content immediately on button click
                        setIsSaving(false); // Mark content as saved
                        alert('Content saved!'); // Show a success alert
                    }}
                    sx={{
                        display: 'block', // Block to take full width
                        margin: '0 auto', // Center the button horizontally
                    }}
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default RichTextEditor;
