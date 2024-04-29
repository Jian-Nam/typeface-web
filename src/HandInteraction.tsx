
import { useRef, useEffect, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { Camera } from "@mediapipe/camera_utils";
import {Hands, Results} from "@mediapipe/hands";
import  drawCanvas  from "./drawCanvas";
import "./HandInteraction.css"

import MyElement3D from './MyElement3D.tsx'
import { Canvas } from '@react-three/fiber'

function HandInteraction(){
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<Results>();

  const [res, setRes] = useState<Results | null>(null)

  const onResults = useCallback((results: Results) => {
    resultsRef.current = results;

    const canvasCtx = canvasRef.current!.getContext("2d")!;
    drawCanvas(canvasCtx, results);
    setRes(results);
  }, []);

  // 초기 설정
  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      const camera = new Camera(webcamRef.current.video!, {
        onFrame: async () => {
          await hands.send({ image: webcamRef.current!.video! });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    }
  }, [onResults]);

  /*  랜드마크들의 좌표를 콘솔에 출력 */
  const OutputData = () => {
    const results = resultsRef.current!;
    console.log(results.multiHandLandmarks);
  };

  return (
    <div className="container">
      {/* 비디오 캡쳐 */}
      <Webcam
        audio={false}
        style={{ visibility: "hidden" }}
        width={1280}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
      />
      {/* 랜드마크를 손에 표시 */}
      <canvas
        ref={canvasRef}
        className="canvas"
        width={1280}
        height={720}
      />
      {/* 좌표 출력 */}
      <div>
        <button onClick={OutputData}>
          Output Data
        </button>
      </div>
      <div className="canvas3D">
        <Canvas>
          <MyElement3D result={res}/>
        </Canvas>
      </div>
    </div>
    
  )
}

export default HandInteraction

