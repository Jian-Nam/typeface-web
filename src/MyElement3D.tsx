import { Results } from "@mediapipe/hands"
import { MeshProps, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Mesh } from "three"
import Face from "./Face"

//import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'


function MyElement3D({resultRef}:{resultRef:  React.MutableRefObject<Results | undefined>}){
  const faceRef = useRef<Mesh>(null!);

  useFrame((_, delta) => {
    const result = resultRef.current;
    const fraction = 0.05
    if(result?.multiHandLandmarks.length){
      const x = -(result?.multiHandLandmarks[0][0].x - 0.5) * 10
      const y = -(result?.multiHandLandmarks[0][0].y - 0.5) * 10
      faceRef.current.position.x = (faceRef.current.position.x * (1 - fraction)) + (x * fraction)
      faceRef.current.position.y = (faceRef.current.position.y * (1 - fraction)) + (y * fraction)
    }
  })
  return(
    <>
      <directionalLight position={[1, 1, 1]}/>
      <mesh ref={faceRef}>
        <Face/>
      </mesh>
    </>
  )
}

export default MyElement3D