import './App.css'
import { Canvas } from '@react-three/fiber'
import  MyElement3D  from './MyElement3D.tsx'
import HandInteraction from './HandInteraction.tsx'

function App() {
  return (
    <>
      <HandInteraction/>
      <Canvas>
        <MyElement3D/>
      </Canvas>
    </>
  )
}

export default App
