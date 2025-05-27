"use client"

import { useState, useEffect, useRef } from "react"

export default function AdvancedEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Simplified canvas effects
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      life: number
      maxLife: number
    }> = []

    const createParticle = (x: number, y: number) => {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 60 + 280}, 70%, ${50 + Math.random() * 20}%)`,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create fewer particles
      if (Math.random() < 0.1) {
        createParticle(mousePosition.x, mousePosition.y)
      }

      // Random sparkles (reduced)
      if (Math.random() < 0.03) {
        createParticle(Math.random() * canvas.width, Math.random() * canvas.height)
      }

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        const alpha = (1 - particle.life / particle.maxLife) * 0.3

        ctx.fillStyle = particle.color.replace("hsl", "hsla").replace(")", `, ${alpha})`)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        if (particle.life >= particle.maxLife) {
          particles.splice(index, 1)
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [mousePosition])

  return (
    <>
      {/* Simplified Canvas Effects */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-50"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Reduced Morphing Shapes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="absolute w-24 h-24 rounded-full opacity-5 animate-morph"
            style={{
              background: `linear-gradient(45deg, hsl(${280 + i * 30}, 70%, 50%), hsl(${320 + i * 30}, 70%, 50%))`,
              left: `${30 + i * 40}%`,
              top: `${20 + i * 40}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: "12s",
              transform: `translateY(${scrollY * 0.05 * (i + 1)}px)`,
            }}
          />
        ))}
      </div>

      {/* Simplified Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-3">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
      </div>

      {/* Reduced Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-random opacity-10"
            style={{
              width: `${30 + Math.random() * 20}px`,
              height: `${30 + Math.random() * 20}px`,
              background: `radial-gradient(circle, hsl(${280 + i * 40}, 70%, 60%), transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
              filter: "blur(2px)",
            }}
          />
        ))}
      </div>

      {/* Reduced Matrix Rain */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs font-mono animate-matrix-rain"
            style={{
              left: `${i * 10}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            {Array.from({ length: 20 }, () => String.fromCharCode(0x30a0 + Math.random() * 96)).join("")}
          </div>
        ))}
      </div>

      {/* Reduced Quantum Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-quantum"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              boxShadow: "0 0 10px currentColor",
            }}
          />
        ))}
      </div>
    </>
  )
}
