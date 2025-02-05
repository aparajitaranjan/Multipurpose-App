import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Button, Typography } from '@mui/material';

const Counter: React.FC = () => {
    const [count, setCount] = useState(0);

    // Background color animation based on count
    const backgroundAnimation = useSpring({
        backgroundColor: `rgba(0, 0, 255, ${Math.min(count / 100, 1)})`,
        config: { tension: 120, friction: 14 },
    });

    return (
        <animated.div
            style={{
                ...backgroundAnimation,
                padding: '20px',
                textAlign: 'center',
                borderRadius: '8px',
                minWidth: '300px',
                minHeight: '150px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid rgba(0, 119, 255, 0.5)',
                margin: 'auto',
            }}
        >
            <Typography variant="h6" color="#000">
                Count: {count}
            </Typography>
            <div>
                <Button
                    variant="contained"
                    onClick={() => setCount(Math.max(count - 1, 0))}
                    sx={{ m: 1 }}
                >
                    -
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setCount(0)}
                    sx={{ m: 1 }}
                >
                    Reset
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setCount(count + 1)}
                    sx={{ m: 1 }}
                >
                    +
                </Button>
            </div>
        </animated.div>
    );
};

export default Counter;
