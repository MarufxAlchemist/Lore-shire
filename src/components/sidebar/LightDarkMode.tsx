import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function LightDarkMode(props: IconButtonProps) {
    const { onClick, sx, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return (
            <IconButton
                size="sm"
                variant="outlined"
                color="neutral"
                {...other}
                sx={sx}
                disabled
            />
        );
    }

    return (
        <IconButton
            id="toggle-mode"
            size="sm"
            variant="soft"
            color={mode === 'dark' ? 'warning' : 'primary'}
            {...props}
            onClick={(event) => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
                onClick?.(event);
            }}
            sx={[
                {
                    borderRadius: '12px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: mode === 'dark'
                        ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)'
                        : 'linear-gradient(135deg, #edf2f7 0%, #cbd5e0 100%)',
                    border: mode === 'dark' ? '1px solid #4a5568' : '1px solid #cbd5e0',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: mode === 'dark'
                            ? '0 4px 12px rgba(74, 85, 104, 0.3)'
                            : '0 4px 12px rgba(203, 213, 224, 0.4)',
                        background: mode === 'dark'
                            ? 'linear-gradient(135deg, #5a6678 0%, #3d4758 100%)'
                            : 'linear-gradient(135deg, #f7fafc 0%, #e2e8f0 100%)',
                    },
                    '&:active': {
                        transform: 'scale(0.98)',
                    },
                    '& > *': {
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        color: mode === 'dark' ? '#fbbf24' : '#4a5568',
                    },
                    '& > *:first-of-type': {
                        display: mode === 'dark' ? 'none' : 'initial',
                        transform: mode === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)',
                    },
                    '& > *:last-of-type': {
                        display: mode === 'light' ? 'none' : 'initial',
                        transform: mode === 'light' ? 'rotate(-180deg)' : 'rotate(0deg)',
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <DarkModeRoundedIcon />
            <LightModeIcon />
        </IconButton>
    );
}
