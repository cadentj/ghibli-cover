<Parallax pages={5} style={{ backgroundColor: '#141414' }}>

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

                    <ParallaxLayer offset={1} speed={0} factor={1} style={{ backgroundColor: '#141414' }}>

                        <Grid container height={"100%"}>
                            <Grid item xs={1} md={2} />
                            <Grid item container xs={10} md={8} sx={{ alignItems: "center", direction: "row", justifyContent: "center" }}>
                                <Typography variant={'h1'} color={'white'}>
                                    Take your business online.
                                </Typography>
                            </Grid>
                            <Grid item xs={1} md={2} />
                        </Grid>

                    </ParallaxLayer>


                    <ParallaxLayer sticky={{ start: 2, end: 5 }} speed={0} factor={1}>
                        <Grid container spacing={2} height={1}>
                            <Grid item container xs={6} md={6} sx={{ alignItems: "center", direction: "row", justifyContent: "center" }}>
                                <Typography variant={'h4'} color={'white'}>
                                    A zero-cost, dedicated service for your ideas.<br />To build a website and more, contact us today.
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6} />
                        </Grid>
                    </ParallaxLayer>

                    <ParallaxLayer offset={2} speed={0} factor={1} style={{ backgroundColor: '#141414' }}>
                        <Grid container spacing={2} height={1}>
                            <Grid item xs={6} md={6} />
                            <Grid item container xs={6} md={6} sx={{ alignItems: "center", direction: "row", justifyContent: "center" }}>
                                <Typography variant={'h4'} color={'white'}>
                                    PICTURE HERE
                                </Typography>
                            </Grid>

                        </Grid>
                    </ParallaxLayer>

                    <ParallaxLayer offset={3} speed={0} factor={1} style={{ backgroundColor: '#141414' }}>
                        <Grid container spacing={2} height={1}>
                            <Grid item xs={6} md={6} />
                            <Grid item container xs={6} md={6} sx={{ alignItems: "center", direction: "row", justifyContent: "center" }}>
                                <Typography variant={'h4'} color={'white'}>
                                    PICTURE HERE
                                </Typography>
                            </Grid>

                        </Grid>
                    </ParallaxLayer>

                </Parallax>