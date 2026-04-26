import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

interface Avatar3DProps {
  fastingHours: number
  phaseColor: string
  phaseId: string
  isRunning: boolean
  gender: 'male' | 'female'
}

export function Avatar3D({ fastingHours, phaseColor, phaseId, isRunning, gender }: Avatar3DProps) {
  const group = useRef<THREE.Group>(null)
  const modelPath = gender === 'female' ? '/avatar-female.glb' : '/avatar-male.glb'
  const { scene, animations } = useGLTF(modelPath)
  const { actions, names } = useAnimations(animations, group)

  const skinMats = useRef<THREE.MeshStandardMaterial[]>([])
  const clothOpacity = useRef(1)
  const animStarted = useRef(false)
  const bodyScale = useRef(1.3)
  const revealed = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Only the single Spine bone (belly/lower torso) — legs untouched, arms counter-scaled at shoulder
  const spineBone = useRef<THREE.Object3D | null>(null)
  const shoulderBones = useRef<THREE.Object3D[]>([])

  useEffect(() => {
    skinMats.current = []
    animStarted.current = false
    spineBone.current = null
    shoulderBones.current = []

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

      // Only the first Spine bone (belly) — NOT Spine1/Spine2 to avoid cumulative scaling
      if (!spineBone.current && name.endsWith('spine') && !name.includes('spine1') && !name.includes('spine2')) {
        spineBone.current = child
      }

      // Counter-scale only shoulders so arms stay normal
      if (name.includes('shoulder')) {
        shoulderBones.current.push(child)
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

    // Scale only Spine bone (belly) — legs unaffected, shoulders counter-scaled
    const targetBodyScale = THREE.MathUtils.lerp(1.3, 1.0, Math.min(fastingHours / 12, 1))
    bodyScale.current = THREE.MathUtils.lerp(bodyScale.current, targetBodyScale, 0.02)
    const s = bodyScale.current

    if (spineBone.current) {
      spineBone.current.scale.x = s
      spineBone.current.scale.z = s
    }
    shoulderBones.current.forEach(bone => {
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
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    const n = Math.ceil(Math.random() * 10)
    const audioPath = isRunning
      ? `/audio/${gender}/${phaseId}/${phaseId}_${n}.mp3`
      : `/audio/${gender}/idle/idle_${n}.mp3`
    const audio = new Audio(audioPath)
    audioRef.current = audio
    audio.play().catch(() => {})
  }

  return (
    <group ref={group} onClick={handleClick} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/avatar-male.glb')
useGLTF.preload('/avatar-female.glb')
