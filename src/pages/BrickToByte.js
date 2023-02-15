import { Box, Typography, ThemeProvider, createTheme, Grid, Container } from '@mui/material';
import Brick from "../components/Brick";

import { Parallax, ParallaxLayer } from '@react-spring/parallax'


import { useScroll, animated, useSpring } from '@react-spring/web'

import React, { useState, useRef, useEffect } from 'react';
import { useIsVisible } from 'react-is-visible'
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

    const [textStyles, textApi] = useSpring(() => ({
        opacity: '1',
    }))

    const SomeComponent = ({ onVisible, ...props }) => {
        const nodeRef = useRef();
        const isVisible = useIsVisible(nodeRef);

        React.useEffect(() => {
            onVisible(isVisible);
            if (isVisible) {
                textApi.start({ opacity: '1', delay: 300 })
            } else {
                textApi.start({ opacity: '0' })
            }
        }, [onVisible, isVisible]);

        return <div ref={nodeRef} {...props} />;
    };

    return (
        <ThemeProvider theme={theme} >
            <Brick mousePosition={[X, Y]} />
            <div
                style={{ height: '100%', width: "100%" }}
                onMouseMove={(event) => {
                    setX(event.clientX)
                    setY(event.clientY)
                }}
            >
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

                    <ParallaxLayer offset={1} speed={0} factor={1} id={"background"} className="centered" >
                        <SomeComponent onVisible={(isVisible) => console.log("Transformed to:", isVisible)}>
                            <animated.div style={textStyles}>
                                <Typography variant={'h1'} color={'white'}>
                                    Take your business online.
                                </Typography>
                            </animated.div>
                        </SomeComponent>
                    </ParallaxLayer>

                    <ParallaxLayer sticky={{ start: 2, end: 3 }} speed={0} className="left">
                        <Typography variant={'h4'} color={'white'}>
                            A zero-cost, dedicated service for<br />your ideas. To build a website<br />and more, contact us today.
                        </Typography>
                    </ParallaxLayer>

                    <ParallaxLayer offset={2} speed={0} factor={1} style={{ backgroundColor: '#141414' }} className="right">
                        <Box component="img" sx={{ width: "50%" }} src="/pictures/1.png" />
                    </ParallaxLayer>

                    <ParallaxLayer offset={3} speed={0} factor={1} style={{ backgroundColor: '#141414' }} className="right">
                        <Box component="img" sx={{ width: "50%" }} src="/pictures/1.png" />
                    </ParallaxLayer>

                </Parallax>
            </div>
        </ThemeProvider>
    );
}