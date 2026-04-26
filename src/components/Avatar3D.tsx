import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

interface Avatar3DProps {
  fastingHours: number
  phaseColor: string
  isRunning: boolean
  gender: 'male' | 'female'
}

export function Avatar3D({ fastingHours, phaseColor, isRunning, gender }: Avatar3DProps) {
  const group = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Group>(null)
  const modelPath = gender === 'female' ? '/avatar-female.glb' : '/avatar-male.glb'
  const { scene, animations } = useGLTF(modelPath)
  const { actions, names } = useAnimations(animations, group)

  const skinMats = useRef<THREE.MeshStandardMaterial[]>([])
  const clothOpacity = useRef(1)
  const animStarted = useRef(false)
  const bodyScale = useRef(1.25)
  const revealed = useRef(false)
  const [modelScale, setModelScale] = useState(0.012)
  const [modelYOffset, setModelYOffset] = useState(-1.02)

  useEffect(() => {
    skinMats.current = []
    animStarted.current = false

    // Auto-scale: measure bounding box and fit to ~2 units tall
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const height = size.y
    if (height > 0.01) {
      const scale = 2.0 / height
      const yMin = box.min.y * scale
      setModelScale(scale)
      setModelYOffset(-yMin - 1.0)
    }

    scene.traverse((child) => {
      const mesh = child as THREE.Mesh
      if (!mesh.isMesh) return
      const mat = new THREE.MeshStandardMaterial({
        color: '#c8855a', roughness: 0.55, transparent: true, opacity: 1,
      })
      mesh.material = mat
      skinMats.current.push(mat)
      mesh.castShadow = true
    })
  }, [scene])

  useFrame(({ clock }) => {
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

    const targetOpacity = revealed.current ? 0.35 : 1
    clothOpacity.current = THREE.MathUtils.lerp(clothOpacity.current, targetOpacity, 0.07)

    skinMats.current.forEach(m => {
      m.color.set(revealed.current ? phase : skin)
      m.emissive.set(phase)
      m.emissiveIntensity = revealed.current
        ? 0.6 + Math.sin(t * 2) * 0.15
        : 0.04 + progress * 0.08
      m.opacity = clothOpacity.current
      m.wireframe = false
    })

    const targetBodyScale = THREE.MathUtils.lerp(1.25, 1.0, Math.min(fastingHours / 12, 1))
    bodyScale.current = THREE.MathUtils.lerp(bodyScale.current, targetBodyScale, 0.02)
    if (bodyRef.current) {
      bodyRef.current.scale.x = bodyScale.current
      bodyRef.current.scale.z = bodyScale.current
    }

    if (group.current && isRunning) {
      group.current.rotation.y = Math.sin(t * 0.2) * 0.08
    }
  })

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    revealed.current = !revealed.current
  }

  return (
    <group ref={group} onClick={handleClick} position={[0, 0, 0]}>
      <group ref={bodyRef}>
        <primitive object={scene} scale={modelScale} position={[0, modelYOffset, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/avatar-male.glb')
useGLTF.preload('/avatar-female.glb')
