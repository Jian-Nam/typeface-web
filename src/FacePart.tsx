import { useFBX } from '@react-three/drei'
function FacePart({path, color}: {path:string, color: string})
{
  const model = useFBX(path)
  const modelClone = model.clone()
  console.log(model)
  return(
    <>
      <mesh>
        <boxGeometry/>
        <meshStandardMaterial color={color}/>
      </mesh>
      <primitive 
        scale={0.1}
        object={modelClone}
      />

    </>
  )
}
export default FacePart