import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Avatar3D } from './Avatar3D'
import { Phase } from '../data/phases'

interface AvatarSceneProps {
  phase: Phase
  fastingHours: number
  isRunning: boolean
  gender: 'male' | 'female'
  onCanvasDoubleClick: () => void
}

function LoadingFallback() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.01]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  )
}

export function AvatarScene({ phase, fastingHours, isRunning, gender, onCanvasDoubleClick }: AvatarSceneProps) {
  const lastTap = useRef(0)

  const handleTouchEnd = () => {
    const now = Date.now()
    if (now - lastTap.current < 300) {
      onCanvasDoubleClick()
    }
    lastTap.current = now
  }

  return (
    <Canvas
      camera={{ position: [0, 0.5, 3.8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      onDoubleClick={onCanvasDoubleClick}
      onTouchEnd={handleTouchEnd}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 5, 3]} intensity={1.2} castShadow />
      <directionalLight position={[-2, 2, -1]} intensity={0.3} color="#334466" />
      <pointLight position={[0, 2, 2]} intensity={0.8} color={phase.color} />
      <pointLight position={[0, 0, 1.5]} intensity={0.3} color={phase.color} />

      <Suspense fallback={<LoadingFallback />}>
        <Avatar3D
          fastingHours={fastingHours}
          phaseColor={phase.color}
          phaseId={phase.id}
          isRunning={isRunning}
          gender={gender}
        />
        <ContactShadows
          position={[0, -1.0, 0]}
          opacity={0.3}
          scale={4}
          blur={2.5}
          color={phase.color}
        />
        <Environment preset="city" />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  )
}
