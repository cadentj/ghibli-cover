import * as THREE from 'three'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Plane, useAspect, useTexture, Image, OrbitControls } from '@react-three/drei'
// import { EffectComposer, DepthOfField, Vignette } from '@react-three/postprocessing'

import bgUrl from '../resources/bg.jpg'
import { Box } from '@mui/system'

function Scene() {
    const scaleN = useAspect(1600, 1000, 1.05)
    const scaleW = useAspect(2200, 1000, 1.05)
    const group = useRef()

    const textures = [bgUrl]
    const layers = [
        { texture: textures[0], scale: scaleW, z: 0 },
    ]

    useFrame((state, delta) => {
        group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.mouse.x * 20, 0.2)
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.mouse.y / 10, 0.2)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -state.mouse.x / 2, 0.2)
    })

    return (
        <group ref={group}>
            {layers.map(({ texture, scale, z, scaleFactor = 1 }) => (
                <Plane scale={scale} position-z={z}>
                    <Image url={texture} scale={scaleFactor} />
                </Plane>
            ))}
        </group>
    )
}

function Im() {
    const scaleW = useAspect(2200, 1000, 1.05)
    return (
        <Image url={bgUrl} scale={scaleW} position-z={100}/>
    )
}

export default function App() {
    return (
        <Box sx={{ height: "100vh", backgroundColor: "black" }}>
            <Canvas orthographic camera={{ zoom: 5, position: [0, 0, 200], far: 300, near: 0 }}>
                <Suspense>
                    <Im />
                </Suspense>
            </Canvas>
        </Box>
    )
}
