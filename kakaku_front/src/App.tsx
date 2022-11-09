import { useMemo, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GenreList from './components/genres/genreList';

function App() {
    //ref:https://amateur-engineer.com/react-mui-dark-mode/
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
    const [totalPrice, setTotalPrice] = useState(0);
    const changeTotalPrice = (price: number) => {
        setTotalPrice(price);
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "start" }}>
                        PC Estimate
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "end" }}>
                        {totalPrice} 円
                    </Typography>
                </Toolbar>
            </AppBar>
            <GenreList ChangeTotalPrice={changeTotalPrice} />
        </ThemeProvider>
    );
}

export default App;
