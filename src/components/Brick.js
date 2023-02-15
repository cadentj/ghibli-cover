import { Box } from '@mui/material';
import React, { useRef, Suspense, useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { AsciiEffect } from 'three-stdlib'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const screenWidth = window.innerHeight;
const screenheight = window.innerHeight;

const Model = (props) => {
  const gltf = useLoader(GLTFLoader, "/mario_brick_block/scene.gltf");
  const ref = useRef();

  let X = props.mousePosition[0]
  let Y = props.mousePosition[1]

  useFrame((state, delta) => {
    // ref.current.rotation.set(Y/screenheight,X/screenWidth,0)
    ref.current.rotation.set(0, X / screenWidth, 0)
    ref.current.position.set((X/20)-50, (-Y/20)+10, 0)
  })

  return (
    <mesh
      position={[0, -20, 15]}
      ref={ref}>
      <primitive object={gltf.scene} scale={0.4} position={[-3, 0, 0]} />
    </mesh>
  );
};

const Composition = (props) => {

  return (
    <>
      <Suspense>
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={2} />
        {/* <Model mousePosition={props.mousePosition} /> */}
        <AsciiRenderer fgColor="white" bgColor="#141414" />

      </Suspense>
    </>
  )
}

export default function Brick(props) {

  return (
    <Box sx={{ height: "100vh", backgroundColor: "transparent", position: "absolute", width: '100%' }}>
      <Canvas camera={{ fov: 70, position: [0, 2, 100] }}>
        <Composition mousePosition={props.mousePosition} />
      </Canvas>
    </Box>
  )
}



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