import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Box, Typography } from '@mui/material';

// Register Chart.js components
Chart.register(...registerables);

const Dashboard: React.FC = () => {
    const [userData, setUserData] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Load user data from localStorage
        const storedData = localStorage.getItem('user_data');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                if (
                    parsedData.name &&
                    parsedData.address &&
                    parsedData.email &&
                    parsedData.phone
                ) {
                    setUserData([
                        parsedData.name.length,
                        parsedData.address.length,
                        parsedData.email.length,
                        parsedData.phone.length,
                    ]);
                } else {
                    console.error('Incomplete user data:', parsedData);
                    setUserData([0, 0, 0, 0]);
                }
            } catch (error) {
                console.error(
                    'Error parsing user data from localStorage:',
                    error
                );
                setUserData([0, 0, 0, 0]);
            }
        } else {
            setUserData([0, 0, 0, 0]);
        }
        setLoading(false);
    }, []);

    const data = {
        labels: [
            'Name Length',
            'Address Length',
            'Email Length',
            'Phone Length',
        ],
        datasets: [
            {
                label: 'User Data Metrics',
                data: userData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow it to resize based on container
        plugins: {
            legend: { display: true, position: 'top' as const },
            tooltip: { enabled: true },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { display: true },
                ticks: { stepSize: 10, min: 0 },
            },
        },
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box
            sx={{
                minWidth: '100%',
                padding: 2,
                maxWidth: '100%',
                margin: 'auto',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h5" gutterBottom>
                User Profile Trends
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    height: '300px',
                    maxWidth: '800px',
                    overflow: 'hidden',
                }}
            >
                <Bar data={data} options={options} />
            </Box>
        </Box>
    );
};

export default Dashboard;
