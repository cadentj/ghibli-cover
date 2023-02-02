import { Box } from '@mui/material';
import React, { useRef, Suspense, useState } from 'react';
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Loader, Text, ScrollControls, useScroll, Points, PointMaterial, AdaptiveDpr } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as random from "maath/random";

const Courier_Prime = "https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap"
const Montserrat = "https://fonts.googleapis.com/css2?family=Montserrat&display=swap"



const DeathStar = () => {
    const fbx = useLoader(FBXLoader, "/Death Star/Death Star.FBX");


    const deathStarMesh = <mesh
        // Actual position
        position={[0, 0, 0]}
    >
        // Position around which the station rotates
        <primitive object={fbx} scale={0.05} />
    </mesh>;

    return deathStarMesh;
};


const Cover = () => {
    return (
        <>
            <Text
                scale={[15, 15, 1]}
                position={[0, 25, 0]}
                color="white" // default
                font={"https://fonts.googleapis.com/css2?family=Montserrat&display=swap"}
                letterSpacing={0.3}
            >
                CADEN
            </Text>
            <Text
                scale={[15, 15, 1]}
                position={[0, -25, 0]}
                color="white" // default
                font={"https://fonts.googleapis.com/css2?family=Montserrat&display=swap"}
                letterSpacing={0.3}
            >
                JUANG
            </Text>
            <Text
                scale={[2, 2, 30]}
                position={[30, -40, 0]}
                color="white" // default
                font={Courier_Prime}
            >
                &gt;&gt;&gt;  scroll to fly &lt;&lt;&lt;
            </Text>
            <Text
                scale={[0.5, 0.5, 1]}
                position={[0, -5, 0]}
                color="white" // default
                font={Courier_Prime}
                letterSpacing={0.3}
            >
                &gt;&gt;&gt;  click to continue &lt;&lt;&lt;
            </Text>
        </>
    )
};



function Stars(props) {
    const ref = useRef();

    useFrame((state) => { ref.current.rotation.y += 0.0002 })

    const [sphere] = useState(() => random.inSphere(new Float32Array(500), { radius: 75 }))
    return (
        <group >
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial transparent color="#ffffff" size={0.3} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    )
}

const StarDestroyer = () => {
    const gltf = useLoader(GLTFLoader, "/star_destroyer/scene.gltf");

    const ref = useRef();
    useFrame(() => (ref.current.rotation.y += 0.01));

    const planetMesh = <mesh
        ref={ref}
    >
        <primitive object={gltf.scene} position={[-10, 0, 30]} rotation={[0, -Math.PI / 1.8, 0]} scale={0.5} />
    </mesh>;

    return planetMesh;
};


const Ship = () => {
    const gltf = useLoader(GLTFLoader, "/tie_i/scene.gltf");

    const scroll = useScroll()

    const ref = useRef()
    const shift = useRef()

    var moving = true

    useFrame((state, delta) => {

        const line = scroll.range(0, 1 / 4)

        var spiral = scroll.range(1 / 4, 1)

        spiral += Math.PI / 4
        if (line < 0.25) {
            ref.current.position.set(0, -4 + line * 16, 100 - line * 50)
            ref.current.rotation.set(0, line * 0.785, 0)
        } else if (line < 1) {
            ref.current.position.set(0, 0, 100 - line * 50)
            ref.current.rotation.set(0, line * 0.785, 0)
        } else {
            ref.current.position.set(50 * Math.cos(spiral * 10), 0, 50 * Math.sin(spiral * 10))
            ref.current.rotation.set(0, -spiral * 10 + (Math.PI * (9 / 12)), 0)
        }


        // ref.current.position.set(50*Math.cos(offset*10), (20-offset*25) - 0.5, 50*Math.sin(offset*10))
        // ref.current.rotation.set(0, -offset*10 + (Math.PI * (19/12)), 0)
    })

    return (
        <mesh
            ref={ref}
        >
            <primitive object={gltf.scene} ref={shift} scale={0.8} position={[0, -3, -8]} rotation={[0, Math.PI, 0]} />
        </mesh>
    );
};

const Composition = () => {
    const scroll = useScroll()

    useFrame((state, delta) => {
        // const offset = scroll.offset
        // state.camera.position.set(50*Math.cos(offset*10), (20-offset*25), 50*Math.sin(offset*10))
        // state.camera.rotation.set(0, -offset*10 + (Math.PI * (9/12)), 0)

        const line = scroll.range(0, 1 / 4)
        var spiral = scroll.range(1 / 4, 1)
        spiral += Math.PI / 4
        if (line < 1) {
            state.camera.position.set(0, 0, 100 - line * 50)
            state.camera.rotation.set(0, line * 0.785, 0)
        } else {
            state.camera.position.set(50 * Math.cos(spiral * 10), 0, 50 * Math.sin(spiral * 10))
            state.camera.rotation.set(0, -spiral * 10 + (Math.PI * (9 / 12)), 0)
        }


    })

    return (
        <>
            <ambientLight intensity={0.25} />
            <directionalLight castShadow intensity={2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}>
                <orthographicCamera attach="shadow-camera" left={-20} right={20} top={20} bottom={-20} />
            </directionalLight>
            <Suspense>
                <Cover />
                <Stars />
                <DeathStar />
                <Ship />
                <StarDestroyer />
            </Suspense>
        </>
    )
}

export default function Animation(props) {

    let navigate = useNavigate();

    function handleClick() {
        navigate('./home');
    }


    return (
        <Box sx={{ height: "100vh", backgroundColor: "black" }}>
            <Canvas performance={{ min: 0.5 }} camera={{ fov: 70 }} onClick={handleClick}>
                <ScrollControls pages={6} damping={1}>
                    <Composition />
                </ScrollControls>
                <AdaptiveDpr pixelated />
            </Canvas>
            <Loader />
        </Box>
    )
}
