import * as THREE from 'three'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Plane, useAspect, useTexture, Image, OrbitControls, Text } from '@react-three/drei'
import { EffectComposer, DepthOfField, Vignette } from '@react-three/postprocessing'


import { Box } from '@mui/system'

import bgUrl from '../resources/top.png'
import starsUrl from '../resources/middle.png'
import groundUrl from '../resources/bottom.png'
import bearUrl from '../resources/bear.png'
import leaves1Url from '../resources/leaves1.png'
import leaves2Url from '../resources/leaves2.png'

import Ghibli from './../fonts/ghibli/Eyad Al-Samman - Ghibli-Bold.otf'


function Scene() {
    const scaleN = useAspect(1600, 1000, 1.05)
    const scaleW = useAspect(2200, 1000, 1.05)
    const group = useRef()
    const subject = useRef()

    const textures = [bgUrl, starsUrl, groundUrl, bearUrl, leaves1Url, leaves2Url]
    const layers = [
        { texture: textures[0], scale: scaleW, z: 0 },
        { texture: textures[1], scale: scaleW, z: 10 },
        { texture: textures[2], scale: scaleW, z: 20 },
    ]

    useFrame((state, delta) => {
        group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.mouse.x * 20, 0.2)
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.mouse.y / 10, 0.2)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -state.mouse.x / 2, 0.2)
    })
    return (
        <group ref={group}>
            {layers.map(({ texture, scale, z, scaleFactor = 1 }) => (
                <Image url={texture} scale={scale} position-z={z} transparent={0.5} />
            ))}
            <group ref={subject}>
            <Text
                scale={[15, 15, 1]}
                position={[0, 15, 50]}
                color="white" // default
                font={Ghibli}
                letterSpacing={0.3}
            >
                CADEN
            </Text>
            <Text
                scale={[15, 15, 1]}
                position={[0, -15, 50]}
                color="white" // default
                font={Ghibli}
                letterSpacing={0.3}
            >
                JUANG
            </Text>
            </group>
        </group>
    )
}

export default function App() {
    return (
        <Box sx={{ height: "100vh", backgroundColor: "black" }}>
            <Canvas orthographic camera={{ zoom: 5, position: [0, 0, 200], far: 300, near: 0 }}>
                <Suspense>
                    <Scene />
                </Suspense>
            </Canvas>
        </Box>
    )
}
