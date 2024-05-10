
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Color, Mesh } from 'three';
import FacePart from './FacePart';

function Face(){
  const [leftEyePath, setLeftEyePath] = useState<string>("/IQKD/left_Q.fbx");

  //face
  const faceRef = useRef<Mesh>(null!);

  //eyebrows
  const eyebrowsRef = useRef<Mesh>(null!);
  const leftEyebrowRef = useRef<Mesh>(null!);
  const rightEyebrowRef = useRef<Mesh>(null!);

  //eyes
  const eyesRef = useRef<Mesh>(null!);
  const leftEyeRef = useRef<Mesh>(null!);
  const rightEyeRef = useRef<Mesh>(null!);

  //lower
  const lowerRef = useRef<Mesh>(null!);
  const mouthRef = useRef<Mesh>(null!);
  const leftCheekRef = useRef<Mesh>(null!);
  const rightCheekRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    const speed = 0.003;
    const range = 0.1;
    faceRef.current.position.y = Math.sin(Date.now()*speed)*range;
  })
  return (
    <mesh ref = {faceRef}>
      <mesh ref = {eyebrowsRef} position={[0, 2, 0]}>
        <mesh ref = {leftEyebrowRef} position={[-1, 0, 0]}>
          <FacePart path = {leftEyePath} color="blue"/>
        </mesh>
        <mesh ref = {rightEyebrowRef} position={[1, 0, 0]}>
          <FacePart path = {leftEyePath} color="blue"/>
        </mesh>
      </mesh>
      <mesh ref = {eyesRef} position={[0, 0, 0]}>
        <mesh ref = {leftEyeRef} position={[-1, 0, 0]}>
          <FacePart path = {leftEyePath} color='green'/>
        </mesh>
        <mesh ref = {rightEyeRef} position={[1, 0, 0]}>
          <FacePart path = {leftEyePath} color='green'/>
        </mesh>
      </mesh>
      <mesh ref = {lowerRef} position = {[0, -2, 0]}>
        <mesh ref = {mouthRef} position={[0, 0, 0]}>
          <FacePart path = {leftEyePath} color = "red"/>
        </mesh>
        <mesh ref = {leftCheekRef} position={[-1.5, 0, 0]}>
          <FacePart path = {leftEyePath} color = "red"/>
        </mesh>
        <mesh ref = {rightCheekRef} position={[1.5, 0, 0]}>
          <FacePart path = {leftEyePath} color = "red"/>
        </mesh>
      </mesh>


    </mesh>
  )
}

export default Face