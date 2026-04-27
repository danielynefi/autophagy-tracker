import { formatDuration } from '../data/phases'

interface ShareCardParams {
  elapsedSeconds: number
  phaseName: string
  phaseEmoji: string
  phaseColor: string
  userName: string
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

export async function generateShareCard(params: ShareCardParams): Promise<Blob> {
  const { elapsedSeconds, phaseName, phaseEmoji, phaseColor, userName } = params
  const W = 400, H = 580

  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  try { await document.fonts.load('800 64px "Space Grotesk"') } catch {}

  // Background
  ctx.fillStyle = '#050a12'
  ctx.fillRect(0, 0, W, H)

  // Top glow
  const topGlow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 280)
  topGlow.addColorStop(0, phaseColor + '50')
  topGlow.addColorStop(1, 'transparent')
  ctx.fillStyle = topGlow
  ctx.fillRect(0, 0, W, H)

  // Center soft glow
  const cGlow = ctx.createRadialGradient(W / 2, 270, 0, W / 2, 270, 180)
  cGlow.addColorStop(0, phaseColor + '18')
  cGlow.addColorStop(1, 'transparent')
  ctx.fillStyle = cGlow
  ctx.fillRect(0, 0, W, H)

  // Top border line
  const tLine = ctx.createLinearGradient(0, 0, W, 0)
  tLine.addColorStop(0, 'transparent')
  tLine.addColorStop(0.5, phaseColor)
  tLine.addColorStop(1, 'transparent')
  ctx.strokeStyle = tLine
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(80, 1); ctx.lineTo(W - 80, 1)
  ctx.stroke()

  // AUTOPHA label
  ctx.textAlign = 'center'
  ctx.font = '700 17px "Space Grotesk", sans-serif'
  ctx.fillStyle = phaseColor
  ctx.fillText('AUTOPHA', W / 2, 52)

  ctx.font = '400 11px "Space Grotesk", sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.28)'
  ctx.fillText('autophagy tracker', W / 2, 70)

  // Emoji
  ctx.font = '76px serif'
  ctx.fillText(phaseEmoji, W / 2, 185)

  // Time
  ctx.font = '800 60px "Space Grotesk", monospace'
  ctx.fillStyle = 'white'
  ctx.fillText(formatDuration(elapsedSeconds), W / 2, 282)

  ctx.font = '400 14px "Space Grotesk", sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.38)'
  ctx.fillText('horas de ayuno completadas', W / 2, 308)

  // Phase pill
  const pW = 230, pH = 42, pX = W / 2 - pW / 2, pY = 342
  rrect(ctx, pX, pY, pW, pH, 21)
  ctx.fillStyle = phaseColor + '22'
  ctx.fill()
  rrect(ctx, pX, pY, pW, pH, 21)
  ctx.strokeStyle = phaseColor + '55'
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.font = '700 15px "Space Grotesk", sans-serif'
  ctx.fillStyle = phaseColor
  ctx.fillText(phaseName, W / 2, pY + 27)

  // User name
  if (userName) {
    ctx.font = '500 13px "Space Grotesk", sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.45)'
    ctx.fillText(userName, W / 2, 420)
  }

  // Bottom border
  const bLine = ctx.createLinearGradient(0, 0, W, 0)
  bLine.addColorStop(0, 'transparent')
  bLine.addColorStop(0.5, phaseColor + '45')
  bLine.addColorStop(1, 'transparent')
  ctx.strokeStyle = bLine
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(80, H - 1); ctx.lineTo(W - 80, H - 1)
  ctx.stroke()

  ctx.font = '400 11px "Space Grotesk", sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.18)'
  ctx.fillText('autopha.app', W / 2, H - 18)

  return new Promise(resolve => canvas.toBlob(b => resolve(b!), 'image/png'))
}

export async function shareOrDownload(blob: Blob) {
  const file = new File([blob], 'autopha-ayuno.png', { type: 'image/png' })
  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title: 'Mi ayuno en Autopha' })
  } else {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'autopha-ayuno.png'
    a.click()
    URL.revokeObjectURL(url)
  }
}
