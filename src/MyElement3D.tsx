function MyElement3D(){
  return(
    <>
      <directionalLight position={[1, 1, 1]}/>
      <mesh>
        <boxGeometry/>
        <meshStandardMaterial color="blue"/>
      </mesh>
    </>
  )
}

export default MyElement3D