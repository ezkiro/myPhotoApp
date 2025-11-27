import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6200ee',
        },
        secondary: {
            main: '#03dac6',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
    },
});

export default theme;
