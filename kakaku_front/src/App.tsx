import { useMemo, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GenreList from './Components/Genres/GenreList';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Stack, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Buffer } from 'buffer';

function App() {
    //ref:https://amateur-engineer.com/react-mui-dark-mode/
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
                components: {
                    //`MuiCssBaseline`になっているが`CssBaseLine`ても同様に作用した
                    MuiCssBaseline: {
                        styleOverrides: prefersDarkMode ? `
                        ::-webkit-scrollbar
                        {
                                overflow:hidden;
                                width:10px;
                                background:#eee;
                                
                                -webkit-border-radius:3px;
                                border-radius:3px;
                        }
                                ::-webkit-scrollbar:horizontal
                                {
                                        height:10px;
                                }
                        ::-webkit-scrollbar-button
                        {
                            display:none;
                        }
                        ::-webkit-scrollbar-piece
                        {
                                background:#eee;
                        }
                                ::-webkit-scrollbar-piece:start
                                {
                                        background:#eee;
                                }
                        ::-webkit-scrollbar-thumb
                        {
                                overflow:hidden;
                                -webkit-border-radius:3px;
                                border-radius:3px;
                                
                                background:#333;
                        }
                        ::-webkit-scrollbar-corner
                        {
                                overflow:hidden;
                                -webkit-border-radius:3px;
                                border-radius:3px;
                                
                                background:#333;
                        }
                        ` :
                            `
                        ::-webkit-scrollbar
                        {
                                overflow:hidden;
                                width:10px;
                                background:#eee;
                                
                                -webkit-border-radius:3px;
                                border-radius:3px;
                        }
                                ::-webkit-scrollbar:horizontal
                                {
                                        height:10px;
                                }
                        ::-webkit-scrollbar-button
                        {
                            display:none;
                        }
                        ::-webkit-scrollbar-piece
                        {
                                background:#eee;
                        }
                                ::-webkit-scrollbar-piece:start
                                {
                                        background:#eee;
                                }
                        ::-webkit-scrollbar-thumb
                        {
                                overflow:hidden;
                                -webkit-border-radius:3px;
                                border-radius:3px;
                                
                                background:#aaa;
                        }
                        ::-webkit-scrollbar-corner
                        {
                                overflow:hidden;
                                -webkit-border-radius:3px;
                                border-radius:3px;
                                
                                background:#aaa;
                        }
                        `

                    },
                },
            }),
        [prefersDarkMode],
    );
    const [totalPrice, setTotalPrice] = useState(0);
    const changeTotalPrice = (price: number) => {
        setTotalPrice(price);
    }
    const [compositionName, setCompositionName] = useState("");
    const location = useLocation();
    useEffect(() => {
        try {
            setCompositionName(
                Buffer.from(
                    queryString.parse(location.search).Name as string, 'base64'
                ).toString()
            );
        } catch (e) {
            console.log(`parse error : ${e}`);
        }
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "start" }}>
                        PC Estimate
                    </Typography>
                    <IconButton onClick={() => window.open("https://github.com/tky2240/estimate_pc")}>
                        <GitHubIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "end" }}>
                        {totalPrice} 円
                    </Typography>
                </Toolbar>
            </AppBar>
            < Box sx={{ margin: "auto", width: "90%", maxWidth: "1000px", padding: "20px", }}>
                <Stack>
                    <TextField sx={{ marginBottom: "10px" }} variant='standard' label='構成名' placeholder='ぼくのかんがえたさいきょうのPC' value={compositionName} onChange={(e) => setCompositionName(e.target.value)} />
                    <GenreList TotalPrice={totalPrice} CompositionName={compositionName} ChangeTotalPrice={changeTotalPrice} />
                </Stack>
            </Box>
        </ThemeProvider>
    );
}

export default App;
