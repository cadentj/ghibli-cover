import { Box, Typography, Grid, Paper, styled } from '@mui/material';
import React, { useRef, Suspense, useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Vector3 } from "three";
import { Loader, Text, Html, ScrollControls, useScroll, Points, PointMaterial } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

import { AsciiEffect } from 'three-stdlib'

import '../styles/btb.css';

let width;
let height;


const Model = () => {
  const fbx = useLoader(FBXLoader, "/mario-brick-block/source/Mario Brick.fbx");
  const ref = useRef();
  const scroll = useScroll()
  useFrame((state, delta) => {
    const a = scroll.range(0, 1)
    ref.current.rotation.y = a * 2
  })


  return (
    <mesh
      position={[0, -20, 15]}
      ref={ref}>
      <primitive object={fbx} scale={0.4} position={[-3, 0, 0]} />
    </mesh>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function AsciiRenderer({
  renderIndex = 1,
  bgColor = 'black',
  fgColor = 'white',
  characters = ' .:-+*=%#~',
  invert = false,
  color = false,
  resolution = 0.15
}) {
  // Reactive state
  const { size, gl, scene, camera } = useThree()

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, { invert, color, resolution })
    effect.domElement.style.position = 'absolute'
    effect.domElement.style.top = '0px'
    effect.domElement.style.left = '0px'
    effect.domElement.style.pointerEvents = 'none'
    return effect
  }, [characters, invert, color, resolution])

  // Styling
  useLayoutEffect(() => {
    effect.domElement.style.color = fgColor
    effect.domElement.style.backgroundColor = bgColor
  }, [fgColor, bgColor])

  // Append on mount, remove on unmount
  useEffect(() => {
    gl.domElement.style.opacity = '0'
    gl.domElement.parentNode.appendChild(effect.domElement)
    return () => {
      gl.domElement.style.opacity = '1'
      gl.domElement.parentNode.removeChild(effect.domElement)
    }
  }, [effect])

  // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height)
  }, [effect, size])

  // Take over render-loop (that is what the index is for)
  useFrame((state) => {
    effect.render(scene, camera)
  }, renderIndex)

  // This component returns nothing, it is a purely logical
}

const Composition = () => {
  const scroll = useScroll()

  useFrame((state, delta) => {
    const offset = scroll.offset
    state.camera.position.set((30 - offset * 30), 2, (100 - offset * 80))
  })

  const ref = useRef()

  return (
    <>
      <Suspense>
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={2} />
        <Brick />
        {/* <OrbitControls/> */}
        <AsciiRenderer fgColor="white" bgColor="#141414" />

      </Suspense>
    </>
  )
}

const Page = () => {
  return (
    <Html fullscreen>
      <Box sx={{ height: '100vh', width: '100%' }}>
        <Box sx={{ position: "relative", height: '100vh', width: '100%' }}>
          <Grid container direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            height='100vh'
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
        </Box>
      </Box>
      <Box sx={{ position: "relative", height: "150vh"}} id="background">
        <Grid container spacing={2} height={1}>
          <Grid item xs={1} md={2} />
          <Grid item container xs={10} md={8} sx={{ alignItems: "center", direction: "row", justifyContent: "center" }}>
            <Typography variant={'h1'} color={'white'}>
              Take your business online.
            </Typography>
          </Grid>
          <Grid item xs={1} md={2} />

          <Grid item container xs={6} md={6} sx={{ alignItems: "center", direction: "row", justifyContent: "center" }}>
            <Typography variant={'h4'} color={'white'}>
              A zero-cost, dedicated service for your ideas.<br/>To build a website and more, contact us today. 
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} />
        </Grid>
      </Box>
    </Html>
  )
}

export default function Brick(props) {
  width = window.innerWidth;
  height = window.innerHeight;


  let navigate = useNavigate();

  function handleClick() {
    navigate('./home');
  }

  return (
    <Box sx={{ height: "100vh", backgroundColor: "transparent", position: "absolute", height: '100vh', width: '100%' }}>
      <Canvas camera={{ fov: 70, position: [0, 2, 100] }}>
        <ScrollControls pages={1} damping={0.5}>
          <Suspense>
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <directionalLight position={[-10, -10, -5]} intensity={2} />
            <Model />
            <Page />
            {/* <OrbitControls/> */}
            <AsciiRenderer fgColor="white" bgColor="#141414" />

          </Suspense>
        </ScrollControls>
      </Canvas>
    </Box>
  )
}

