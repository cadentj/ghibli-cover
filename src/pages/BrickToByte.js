import { Box, Typography, ThemeProvider, createTheme, Grid, Paper } from '@mui/material';
import Brick from "../components/Brick";

import { Parallax, ParallaxLayer } from '@react-spring/parallax'



import React, { useState } from 'react';
import '../styles/btb.css';


const theme = createTheme({
    typography: {
        fontFamily: 'Source Code Pro, Montserrat, Roboto',
    },
    palette: {
        mode: 'dark',
    },
});



export default function BrickToByte() {
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);

    const alignCenter = { display: 'flex', alignItems: 'center' }

    return (
        <ThemeProvider theme={theme} >
            <Brick mousePosition={[X, Y]} />
            <div style={{ height: '100%', width: "100%" }} onMouseMove={(event) => {
                setX(event.clientX)
                setY(event.clientY)
            }}>
                <Parallax pages={4}>

                    <ParallaxLayer offset={0} speed={0} factor={1} style={{ width: '100%' }}>

                        <Grid container direction="column"
                            justifyContent="space-between"
                            alignItems="stretch"
                            height="1"
                        >
                            <Grid item sx={{ pr: 30 }}>
                                <Typography sx={{ color: "white", fontFamily: "Source Code Pro", fontSize: '150px', textAlign: "right" }}>
                                    BRICK
                                </Typography>
                            </Grid>
                            <Grid item sx={{ pl: 30 }}>
                                <Typography sx={{ color: "white", fontFamily: "Source Code Pro", fontSize: '150px' }}>
                                    2 BYTE
                                </Typography>
                            </Grid>
                        </Grid>

                    </ParallaxLayer>

                    <ParallaxLayer offset={1} speed={0} factor={1} id={"background"} style={{ ...alignCenter, justifyContent:"center"}}>
                        <Box sx={{ width: "100%" }} class="centered">
                            <Typography variant={'h1'} color={'white'}>
                                Take your business online.
                            </Typography>
                        </Box>
                    </ParallaxLayer>


                    <ParallaxLayer sticky={{ start: 2, end: 3 }} speed={0} style={{ ...alignCenter, paddingLeft: "15%" }}>
                        <Box sx={{ width: "50%" }} class="centered">
                            <Typography variant={'h5'} color={'white'}>
                                A zero-cost, dedicated service for your ideas.<br />To build a website and more, contact us today.
                            </Typography>
                        </Box>
                    </ParallaxLayer>

                    <ParallaxLayer offset={2} speed={0} factor={1} style={{ ...alignCenter, justifyContent: 'flex-end', backgroundColor: '#141414' }}>
                        <Box sx={{ width: "50%" }} class="centered">
                            <Typography variant={'h5'} color={'white'}>
                                PICTURE HERE
                            </Typography>
                        </Box>
                    </ParallaxLayer>

                    <ParallaxLayer offset={3} speed={0} factor={1} style={{ ...alignCenter, justifyContent: 'flex-end', backgroundColor: '#141414' }}>
                        <Box sx={{ width: "50%" }} class="centered">
                            <Typography variant={'h5'} color={'white'}>
                                PICTURE HERE
                            </Typography>
                        </Box>
                    </ParallaxLayer>

                </Parallax>
            </div>
        </ThemeProvider>
    );
}