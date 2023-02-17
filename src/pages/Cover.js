import * as THREE from 'three'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Plane, useAspect, useTexture, Image, OrbitControls } from '@react-three/drei'
// import { EffectComposer, DepthOfField, Vignette } from '@react-three/postprocessing'

import bgUrl from '../resources/bg.jpg'
import { Box } from '@mui/system'
import starsUrl from '../resources/stars.png'
import groundUrl from '../resources/ground.png'
import bearUrl from '../resources/bear.png'
import leaves1Url from '../resources/leaves1.png'
import leaves2Url from '../resources/leaves2.png'

function Scene() {
    const scaleN = useAspect(1600, 1000, 1.05)
    const scaleW = useAspect(2200, 1000, 1.05)
    const group = useRef()

    const textures = [bgUrl, starsUrl, groundUrl, bearUrl, leaves1Url, leaves2Url]
    const layers = [
        { texture: textures[0], scale: scaleW, z: 0 },
        { texture: textures[1], scale: scaleW, z: 10 },
        { texture: textures[2], scale: scaleW, z: 20 },
        { texture: textures[3], scale: scaleN, z: 30, scaleFactor: 0.83 },
        { texture: textures[4], scale: scaleW, z: 40, scaleFactor: 1 },
        { texture: textures[5], scale: scaleW, z: 50, scaleFactor: 1.3 },
    ]

    useFrame((state, delta) => {
        group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.mouse.x * 20, 0.2)
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.mouse.y / 10, 0.2)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -state.mouse.x / 2, 0.2)
    })
    return (
        <group ref={group}>
            {layers.map(({ texture, scale, z, scaleFactor=1 }) => (
                <Image url={texture} scale={scale} position-z={z} transparent={0.5}/>
            ))}
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
