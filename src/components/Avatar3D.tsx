import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

interface Avatar3DProps {
  fastingHours: number
  phaseColor: string
  isRunning: boolean
}

export function Avatar3D({ fastingHours, phaseColor, isRunning }: Avatar3DProps) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/avatar.glb')
  const { actions, names } = useAnimations(animations, group)
  const [revealed, setRevealed] = useState(false)

  const skinMats = useRef<THREE.MeshStandardMaterial[]>([])
  const clothOpacity = useRef(1)
  const animStarted = useRef(false)

  // Apply materials once on load
  useEffect(() => {
    skinMats.current = []

    scene.traverse((child) => {
      const mesh = child as THREE.Mesh
      if (!mesh.isMesh) return

      // Single merged mesh (e.g. Ch36) — treat as skin/body base
      const mat = new THREE.MeshStandardMaterial({
        color: '#c8855a', roughness: 0.55, transparent: true, opacity: 1,
      })
      mesh.material = mat
      skinMats.current.push(mat)
      mesh.castShadow = true
    })
  }, [scene])


  // Update colors and X-ray effect each frame
  useFrame(({ clock }) => {
    // Start animation on first frame after ref and actions are ready
    if (!animStarted.current && names.length > 0) {
      const action = actions[names[0]]
      if (action) {
        action.reset().setLoop(THREE.LoopRepeat, Infinity).play()
        animStarted.current = true
      }
    }

    const t = clock.elapsedTime
    const progress = Math.min(fastingHours / 24, 1)
    const phase = new THREE.Color(phaseColor)

    const skin = new THREE.Color()
    if (fastingHours < 12)
      skin.lerpColors(new THREE.Color('#c8855a'), new THREE.Color('#bf7d4e'), fastingHours / 12)
    else if (fastingHours < 18)
      skin.lerpColors(new THREE.Color('#bf7d4e'), new THREE.Color('#7ab5c5'), (fastingHours - 12) / 6)
    else
      skin.lerpColors(new THREE.Color('#7ab5c5'), new THREE.Color('#88d4a8'), Math.min((fastingHours - 18) / 6, 1))

    // X-ray mode: when revealed, make mesh semi-transparent with strong phase-color glow
    const targetOpacity = revealed ? 0.35 : 1
    clothOpacity.current = THREE.MathUtils.lerp(clothOpacity.current, targetOpacity, 0.07)

    skinMats.current.forEach(m => {
      m.color.set(revealed ? phase : skin)
      m.emissive.set(phase)
      m.emissiveIntensity = revealed
        ? 0.6 + Math.sin(t * 2) * 0.15   // pulsing glow in X-ray mode
        : 0.04 + progress * 0.08
      m.opacity = clothOpacity.current
      m.wireframe = false
    })

    if (group.current && isRunning) {
      group.current.rotation.y = Math.sin(t * 0.2) * 0.08
    }
  })

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setRevealed(v => !v)
  }

  // Mixamo FBX→GLB characters are ~170 units tall (cm)
  // scale 0.012 → ~2 units tall, feet at y≈-1
  return (
    <group ref={group} onClick={handleClick} position={[0, 0, 0]}>
      <primitive object={scene} scale={0.012} position={[0, -1.02, 0]} />
    </group>
  )
}

useGLTF.preload('/avatar.glb')
