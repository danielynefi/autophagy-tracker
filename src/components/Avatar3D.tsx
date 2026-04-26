import { useRef, useEffect } from 'react'
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
  const modelPath = gender === 'female' ? '/avatar-female.glb' : '/avatar-male.glb'
  const { scene, animations } = useGLTF(modelPath)
  const { actions, names } = useAnimations(animations, group)

  const skinMats = useRef<THREE.MeshStandardMaterial[]>([])
  const clothOpacity = useRef(1)
  const animStarted = useRef(false)
  const bodyScale = useRef(1.55)
  const revealed = useRef(false)

  // Bones for targeted belly scaling
  const hipsBone = useRef<THREE.Object3D | null>(null)
  const counterBones = useRef<THREE.Object3D[]>([]) // legs + shoulders (to cancel arm/leg widening)

  useEffect(() => {
    skinMats.current = []
    animStarted.current = false
    hipsBone.current = null
    counterBones.current = []

    // Auto-scale scene to fit ~2 units tall
    scene.scale.set(1, 1, 1)
    scene.position.set(0, 0, 0)
    const box = new THREE.Box3().setFromObject(scene)
    const height = box.getSize(new THREE.Vector3()).y
    if (height > 0.01) {
      const s = 2.0 / height
      scene.scale.setScalar(s)
      scene.position.set(0, -box.min.y * s - 1.0, 0)
    } else {
      scene.scale.setScalar(0.012)
      scene.position.set(0, -1.02, 0)
    }

    scene.traverse((child) => {
      const name = child.name.toLowerCase()

      // Find hips bone (root of torso + legs)
      if (!hipsBone.current && (name.includes('hips') || name === 'pelvis') && !name.includes('leg')) {
        hipsBone.current = child
      }

      // Counter-scale bones: upper legs and shoulders (to keep limbs normal width)
      if (
        name.includes('upleg') || name.includes('upper_leg') ||
        name.includes('thigh') || name.includes('shoulder')
      ) {
        counterBones.current.push(child)
      }

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

    // Belly scale: widen hips/torso, counter-scale limbs to keep arms/legs normal
    const targetBodyScale = THREE.MathUtils.lerp(1.55, 1.0, Math.min(fastingHours / 12, 1))
    bodyScale.current = THREE.MathUtils.lerp(bodyScale.current, targetBodyScale, 0.02)
    const s = bodyScale.current

    if (hipsBone.current) {
      hipsBone.current.scale.x = s
      hipsBone.current.scale.z = s
    }
    counterBones.current.forEach(bone => {
      bone.scale.x = 1 / s
      bone.scale.z = 1 / s
    })

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
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/avatar-male.glb')
useGLTF.preload('/avatar-female.glb')
