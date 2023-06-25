import * as THREE from 'three'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Plane, useAspect, useTexture, Image, OrbitControls, Text } from '@react-three/drei'
import { EffectComposer, DepthOfField, Vignette } from '@react-three/postprocessing'



import bgUrl from '../resources/top.png'
import starsUrl from '../resources/middle.png'
import groundUrl from '../resources/bottom.png'

import Ghibli from '../fonts/ghibli/Eyad Al-Samman - Ghibli-Bold.otf'


function Scene({ dof }) {
    const scaleN = useAspect(1600, 1000, 1.05)
    const scaleW = useAspect(2200, 1000, 1.05)
    const group = useRef()
    const subject = useRef()
    const [focus] = useState(() => new THREE.Vector3())

    const textures = [bgUrl, starsUrl, groundUrl]
    const layers = [
        { texture: textures[0], scale: scaleW, z: 0 },
        { texture: textures[1], scale: scaleW, z: 10 },
        { texture: textures[2], scale: scaleW, z: 20 },
    ]

    useFrame((state, delta) => {
        dof.current.target = focus.lerp(subject.current.position, 0.05)
        group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.mouse.x * 20, 0.2)
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.mouse.y / 10, 0.2)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -state.mouse.x / 2, 0.2)
    })
    return (
        <group ref={group}>
            {layers.map(({ texture, scale, z, scaleFactor = 1 }) => (
                <Image url={texture} scale={scale} position-z={z} transparent={0.5} />
            ))}
            <group >
                <Text
                    ref={subject}
                    scale={[300, 300, 5]}
                    position={[0, 15, 50]}
                    color="white" // default
                    font={Ghibli}
                    letterSpacing={0.3}
                >
                    CADEN
                </Text>
                <Text
                ref={subject}
                scale={[300, 300, 5]}
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

const Effects = React.forwardRef((props, ref) => {
    const { viewport: { width, height } } = useThree() // prettier-ignore
    return (
        <EffectComposer multisampling={0}>
            <DepthOfField ref={ref} bokehScale={3} focalLength={0.1} width={(width * 5) / 2} height={(height * 5) / 2} />
            <Vignette />
        </EffectComposer>
    )
})

export default function App() {
    const dof = useRef()
    return (
        <div style={{ height: "100vh", backgroundColor: "black" }}>
            <Canvas orthographic camera={{ zoom: 5, position: [0, 0, 200], far: 300, near: 0 }}>
                <Suspense>
                    <Scene dof={dof} />
                </Suspense>
                <Effects ref={dof} />
            </Canvas>
        </div>
    )
}
