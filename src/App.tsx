import { useState, useEffect, useRef } from 'react'
import QRPreview from './components/QRPreview'
import PresetGallery from './components/PresetGallery'
import Accordion from './components/Accordion'
import type { QRConfig } from './components/QRPreview'
import './App.css'

const PRINT_DPI = 300

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const animationFrameRef = useRef<number | undefined>(undefined)
  const targetPositionRef = useRef({ x: 50, y: 50 })
  const currentPositionRef = useRef({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPositionRef.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      }
    }

    const animate = () => {
      // Lerp towards target position for smooth following
      currentPositionRef.current = {
        x: currentPositionRef.current.x + (targetPositionRef.current.x - currentPositionRef.current.x) * 0.08,
        y: currentPositionRef.current.y + (targetPositionRef.current.y - currentPositionRef.current.y) * 0.08
      }

      setMousePosition(currentPositionRef.current)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])
  const [sizeUnit, setSizeUnit] = useState<'px' | 'mm'>('px')
  const [config, setConfig] = useState<QRConfig>({
    data: 'https://example.com',
    size: 300,
    margin: 10,
    dotsType: 'square',
    cornerSquareType: 'square',
    cornerDotType: 'square',
    fgColor: '#000000',
    bgColor: '#ffffff',
    useGradient: false,
    gradientType: 'linear',
    gradientColor1: '#000000',
    gradientColor2: '#ffffff',
    gradientAngle: 0,
    logo: null,
    logoSize: 0.2,
    logoMargin: 10,
  })

  const pxToMm = (px: number): number => {
    return (px / PRINT_DPI) * 25.4
  }

  const mmToPx = (mm: number): number => {
    return Math.round((mm / 25.4) * PRINT_DPI)
  }

  const getSizeInCurrentUnit = (): number => {
    return sizeUnit === 'px' ? config.size : pxToMm(config.size)
  }

  const handleSizeChange = (value: number): void => {
    const newSize = sizeUnit === 'px' ? value : mmToPx(value)
    setConfig({ ...config, size: newSize })
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setConfig({ ...config, logo: file })
  }

  return (
    <div className="min-h-screen font-inter relative overflow-hidden">
      {/* Base background color */}
      <div className="fixed inset-0 pointer-events-none -z-30" style={{ backgroundColor: '#0b0b0f' }} />

      {/* Static background depth layers */}
      <div className="fixed inset-0 pointer-events-none -z-20">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[220px]" style={{ backgroundColor: 'rgba(124,109,255,0.08)' }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[180px]" style={{ backgroundColor: 'rgba(255,176,32,0.08)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ backgroundColor: 'rgba(30,58,138,0.06)' }} />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[160px]" style={{ backgroundColor: 'rgba(168,85,247,0.05)' }} />
      </div>

      {/* Interactive cursor-following glow */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(124,109,255,0.12), transparent 400%)`,
          filter: 'blur(10px)'
        }}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-[clamp(40px,5vw,64px)] font-inter text-primary leading-[1.05] mb-4">QR Studio</h1>
          <p className="text-muted font-jetbrains text-lg max-w-[48ch] mx-auto">Create custom QR codes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            {/* Data Input */}
            <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl p-6">
              <label className="block text-primary font-inter text-lg tracking-[0.02em] mb-2 text-muted font-medium">
                Your link
              </label>
              <input
                type="text"
                value={config.data}
                onChange={(e) => setConfig({ ...config, data: e.target.value })}
                className="w-full px-4 py-3 bg-background/50 border border-glass-border rounded-lg text-primary font-jetbrains text-xs tracking-[0.02em] focus:outline-none focus:border-violet focus:ring-1 focus:ring-violet/50"
                placeholder="Enter URL or text"
              />
            </div>

            {/* Preset Gallery */}
            <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl p-6">
              <PresetGallery currentConfig={config} onApplyPreset={setConfig} />
            </div>

            {/* Settings Accordions */}
            <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl">
              <Accordion title="Size & Margin" defaultOpen={true}>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-muted font-jetbrains text-xs tracking-[0.02em]">
                        Size: {Math.round(getSizeInCurrentUnit())} {sizeUnit}
                      </label>
                      <div className="flex bg-background/50 rounded-lg p-0.5">
                        <button
                          onClick={() => setSizeUnit('px')}
                          className={`px-2 py-0.5 text-xs font-jetbrains tracking-[0.02em] rounded transition-colors ${
                            sizeUnit === 'px'
                              ? 'bg-violet text-background'
                              : 'text-muted hover:text-primary'
                          }`}
                        >
                          px
                        </button>
                        <button
                          onClick={() => setSizeUnit('mm')}
                          className={`px-2 py-0.5 text-xs font-jetbrains tracking-[0.02em] rounded transition-colors ${
                            sizeUnit === 'mm'
                              ? 'bg-violet text-background'
                              : 'text-muted hover:text-primary'
                          }`}
                        >
                          mm
                        </button>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={sizeUnit === 'px' ? 160 : Math.round(pxToMm(160))}
                      max={sizeUnit === 'px' ? 640 : Math.round(pxToMm(640))}
                      step={sizeUnit === 'px' ? 1 : 1}
                      value={getSizeInCurrentUnit()}
                      onChange={(e) => handleSizeChange(parseFloat(e.target.value))}
                      className="w-full accent-violet"
                    />
                    {sizeUnit === 'mm' && (
                      <p className="text-muted font-jetbrains text-[10px] tracking-[0.02em] mt-1">
                        Assumes 300 DPI print resolution — very small sizes (under ~20mm) may be hard to scan depending on data density.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-muted font-jetbrains text-xs tracking-[0.02em] mb-2">
                      Margin: {config.margin}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={config.margin}
                      onChange={(e) => setConfig({ ...config, margin: parseInt(e.target.value) })}
                      className="w-full accent-violet"
                    />
                  </div>
                </div>
              </Accordion>

              <Accordion title="Dot Style">
                <div className="space-y-4">
                  <div>
                    <label className="block text-muted font-jetbrains text-xs tracking-[0.02em] mb-2">
                      Dots
                    </label>
                    <select
                      value={config.dotsType}
                      onChange={(e) => setConfig({ ...config, dotsType: e.target.value as any })}
                      className="w-full px-4 py-3 bg-background/50 border border-glass-border rounded-lg text-primary font-jetbrains text-xs tracking-[0.02em] focus:outline-none focus:border-violet focus:ring-1 focus:ring-violet/50"
                    >
                      <option value="square">Square</option>
                      <option value="dots">Dots</option>
                      <option value="rounded">Rounded</option>
                      <option value="classy">Classy</option>
                      <option value="classy-rounded">Classy Rounded</option>
                      <option value="extra-rounded">Extra Rounded</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-muted font-jetbrains text-xs tracking-[0.02em] mb-2">
                      Corner Squares
                    </label>
                    <select
                      value={config.cornerSquareType}
                      onChange={(e) => setConfig({ ...config, cornerSquareType: e.target.value as any })}
                      className="w-full px-4 py-3 bg-background/50 border border-glass-border rounded-lg text-primary font-jetbrains text-xs tracking-[0.02em] focus:outline-none focus:border-violet focus:ring-1 focus:ring-violet/50"
                    >
                      <option value="square">Square</option>
                      <option value="dot">Dot</option>
                      <option value="extra-rounded">Extra Rounded</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-muted font-jetbrains text-xs tracking-[0.02em] mb-2">
                      Corner Dots
                    </label>
                    <select
                      value={config.cornerDotType}
                      onChange={(e) => setConfig({ ...config, cornerDotType: e.target.value as any })}
                      className="w-full px-4 py-3 bg-background/50 border border-glass-border rounded-lg text-primary font-jetbrains text-xs tracking-[0.02em] focus:outline-none focus:border-violet focus:ring-1 focus:ring-violet/50"
                    >
                      <option value="square">Square</option>
                      <option value="dot">Dot</option>
                    </select>
                  </div>
                </div>
              </Accordion>

              <Accordion title="Colors">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-muted font-jetbrains text-xs tracking-[0.02em] mb-2">
                        Foreground
                      </label>
                      <input
                        type="color"
                        value={config.fgColor}
                        onChange={(e) => setConfig({ ...config, fgColor: e.target.value })}
                        className="w-full h-10 border border-glass-border rounded-lg cursor-pointer"
                        disabled={config.useGradient}
                      />
                    </div>
                    <div>
                      <label className="block text-muted font-jetbrains text-xs tracking-[0.02em] mb-2">
                        Background
                      </label>
                      <input
                        type="color"
                        value={config.bgColor}
                        onChange={(e) => setConfig({ ...config, bgColor: e.target.value })}
                        className="w-full h-10 border border-glass-border rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="useGradient"
                      checked={config.useGradient}
                      onChange={(e) => setConfig({ ...config, useGradient: e.target.checked })}
                      className="w-4 h-4 accent-violet"
                    />
                    <label htmlFor="useGradient" className="text-primary font-jetbrains text-xs tracking-[0.02em]">
                      Use gradient
                    </label>
                  </div>

                  {config.useGradient && (
                    <div className="space-y-4 pl-4 border-l border-glass-border">
                      <div>
                        <label className="block text-muted font-jetbrains text-xs tracking-[0.02em] mb-2">
                          Type
                        </label>
                        <select
                          value={config.gradientType}
                          onChange={(e) => setConfig({ ...config, gradientType: e.target.value as any })}
                          className="w-full px-4 py-3 bg-background/50 border border-glass-border rounded-lg text-primary font-jetbrains text-xs tracking-[0.02em] focus:outline-none focus:border-violet focus:ring-1 focus:ring-violet/50"
                        >
                          <option value="linear">Linear</option>
                          <option value="radial">Radial</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-muted font-jetbrains text-xs tracking-[0.02em] mb-2">
                            Color 1
                          </label>
                          <input
                            type="color"
                            value={config.gradientColor1}
                            onChange={(e) => setConfig({ ...config, gradientColor1: e.target.value })}
                            className="w-full h-10 border border-glass-border rounded-lg cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-muted font-jetbrains text-xs tracking-[0.02em] mb-2">
                            Color 2
                          </label>
                          <input
                            type="color"
                            value={config.gradientColor2}
                            onChange={(e) => setConfig({ ...config, gradientColor2: e.target.value })}
                            className="w-full h-10 border border-glass-border rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>

                      {config.gradientType === 'linear' && (
                        <div>
                          <label className="block text-muted font-jetbrains text-xs tracking-[0.02em] mb-2">
                            Angle: {config.gradientAngle}°
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={config.gradientAngle}
                            onChange={(e) => setConfig({ ...config, gradientAngle: parseInt(e.target.value) })}
                            className="w-full accent-violet"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Accordion>

              <Accordion title="Logo">
                <div className="space-y-4">
                  <div>
                    <label className="block text-muted font-jetbrains text-xs tracking-[0.02em] mb-2">
                      Upload image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="w-full px-4 py-3 bg-background/50 border border-glass-border rounded-lg text-primary font-jetbrains text-xs tracking-[0.02em] focus:outline-none focus:border-violet focus:ring-1 focus:ring-violet/50"
                    />
                    {config.logo && (
                      <p className="text-muted font-jetbrains text-xs tracking-[0.02em] mt-2">
                        {config.logo.name}
                      </p>
                    )}
                  </div>

                  {config.logo && (
                    <div className="space-y-4 pl-4 border-l border-glass-border">
                      <div>
                        <label className="block text-muted font-jetbrains text-xs tracking-[0.02em] mb-2">
                          Size: {(config.logoSize * 100).toFixed(0)}%
                        </label>
                        <input
                          type="range"
                          min="0.1"
                          max="0.4"
                          step="0.01"
                          value={config.logoSize}
                          onChange={(e) => setConfig({ ...config, logoSize: parseFloat(e.target.value) })}
                          className="w-full accent-violet"
                        />
                      </div>

                      <div>
                        <label className="block text-muted font-jetbrains text-xs tracking-[0.02em] mb-2">
                          Margin: {config.logoMargin}px
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="40"
                          value={config.logoMargin}
                          onChange={(e) => setConfig({ ...config, logoMargin: parseInt(e.target.value) })}
                          className="w-full accent-violet"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Accordion>
            </div>
          </div>

          {/* Right Panel - Sticky Preview */}
          <div className="lg:sticky lg:top-8 h-fit relative">
            {/* Accent Glow Blob */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber/50 via-violet/40 to-amber/50 blur-[120px] opacity-50 rounded-full pointer-events-none -z-10"></div>
            
            <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl p-8 relative">
              {/* Top Row with Chips and Preview Heading */}
              <div className="flex items-center justify-between mb-6">
                <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-full px-3 py-1">
                  <span className="text-muted font-jetbrains text-xs tracking-[0.02em]">EC-M</span>
                </div>
                <h2 className="text-2xl font-medium text-primary font-inter">Preview</h2>
                <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-full px-3 py-1">
                  <span className="text-muted font-jetbrains text-xs tracking-[0.02em]">{config.size}px</span>
                </div>
              </div>
              <QRPreview config={config} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App