import { Results } from "@mediapipe/hands"
import { MeshProps, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Mesh } from "three"


function MyElement3D({result}:{result: Results | null}){
  const boxRef = useRef<Mesh>(null!);
  useFrame((_, delta) => {
    console.log(result?.multiHandLandmarks[0][0].x)
    if(result?.multiHandLandmarks[0][0]){
      const x = -(result?.multiHandLandmarks[0][0].x - 0.5) * 10
      const y = -(result?.multiHandLandmarks[0][0].y - 0.5) * 10
      boxRef.current.position.x = (boxRef.current.position.x * 0.95) + (x * 0.05)
      boxRef.current.position.y = (boxRef.current.position.y * 0.95) + (y * 0.05)
    }
  })
  return(
    <>
      <directionalLight position={[1, 1, 1]}/>
      <mesh ref={boxRef}>
        <boxGeometry/>
        <meshStandardMaterial color="blue"/>
      </mesh>
    </>
  )
}

export default MyElement3D