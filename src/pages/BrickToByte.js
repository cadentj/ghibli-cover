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
    const [textStyles, textApi] = useSpring(() => ({
        opacity: '0',
    }))

    const [boxSlide1, boxApi1] = useSpring(() => ({
        x: -50,
        opacity: '0',
    }))

    const [boxSlide2, boxApi2] = useSpring(() => ({
        x: -50,
        opacity: '0',
    }))

    const RevealDiv = ({ onVisible, ...props }) => {
        const nodeRef = useRef();
        const isVisible = useIsVisible(nodeRef);

        React.useEffect(() => {
            onVisible(isVisible);
        }, [onVisible, isVisible]);

        return <animated.div ref={nodeRef} style={props.styleHook} {...props} />;
    };

    return (
        <ThemeProvider theme={theme} >
            <Brick />
            <div style={{ height: '100%', width: "100%" }}>
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
                        <RevealDiv
                            onVisible={(isVisible) => {
                                if (isVisible) {
                                    textApi.start({ opacity: '1', delay: 400 })
                                }

                            }}
                            styleHook={textStyles}
                        >
                            <Typography variant={'h1'} color={'white'}>
                                Take your business online.
                            </Typography>
                        </RevealDiv>
                    </ParallaxLayer>

                    <ParallaxLayer sticky={{ start: 2, end: 3 }} speed={0} className="left">
                        <Typography variant={'h4'} color={'white'}>
                            A zero-cost, dedicated service for<br />your ideas. To build a website<br />and more, contact us today.
                        </Typography>
                    </ParallaxLayer>

                    <ParallaxLayer offset={2} speed={0} factor={1} style={{ backgroundColor: '#141414' }} className="right">
                        <RevealDiv
                            onVisible={(isVisible) => {
                                if (isVisible) {
                                    boxApi1.start({ x: 0, opacity: '1', delay: 200 })
                                }
                            }}
                            styleHook={boxSlide1}
                            className="right"
                        >
                            <Box component="img" sx={{ width: "35%" }} src="/pictures/1.png" />
                        </RevealDiv>
                    </ParallaxLayer>

                    <ParallaxLayer offset={3} speed={0} factor={1} style={{ backgroundColor: '#141414' }} className="right">
                        <RevealDiv
                            onVisible={(isVisible) => {
                                if (isVisible) {
                                    boxApi2.start({ x: 0, opacity: '1', delay: 200 })
                                }
                            }}
                            styleHook={boxSlide2}
                            className="right"
                        >
                            <Box component="img" sx={{ width: "35%"}} src="/pictures/1.png" />
                        </RevealDiv>
                    </ParallaxLayer>

                </Parallax>
            </div>
        </ThemeProvider>
    );
}