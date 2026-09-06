import { presets, type QRPreset } from '../presets'
import QRPreviewMini from './QRPreviewMini'
import type { QRConfig } from './QRPreview'

interface PresetGalleryProps {
  currentConfig: QRConfig
  onApplyPreset: (config: QRConfig) => void
}

export default function PresetGallery({ currentConfig, onApplyPreset }: PresetGalleryProps) {
  const presetToQRConfig = (preset: QRPreset): QRConfig => {
    const color = preset.config.color
    return {
      data: 'https://example.com',
      size: 100,
      margin: 5,
      dotsType: preset.config.dotsType,
      cornerSquareType: preset.config.cornerSquareType,
      cornerDotType: preset.config.cornerDotType,
      fgColor: color.type === 'single' ? color.color : '#000000',
      bgColor: preset.config.bgColor,
      useGradient: color.type === 'gradient',
      gradientType: color.type === 'gradient' ? color.gradientType : 'linear',
      gradientColor1: color.type === 'gradient' ? color.color1 : '#000000',
      gradientColor2: color.type === 'gradient' ? color.color2 : '#ffffff',
      gradientAngle: color.type === 'gradient' ? (color.angle || 0) : 0,
      logo: null,
      logoSize: 0.2,
      logoMargin: 10,
    }
  }

  const applyPreset = (preset: QRPreset) => {
    const color = preset.config.color
    const newConfig: QRConfig = {
      data: currentConfig.data,
      size: currentConfig.size,
      margin: currentConfig.margin,
      dotsType: preset.config.dotsType,
      cornerSquareType: preset.config.cornerSquareType,
      cornerDotType: preset.config.cornerDotType,
      bgColor: preset.config.bgColor,
      useGradient: color.type === 'gradient',
      gradientType: color.type === 'gradient' ? color.gradientType : 'linear',
      gradientColor1: color.type === 'gradient' ? color.color1 : '#000000',
      gradientColor2: color.type === 'gradient' ? color.color2 : '#ffffff',
      gradientAngle: color.type === 'gradient' ? (color.angle || 0) : 0,
      fgColor: color.type === 'single' ? color.color : '#000000',
      logo: currentConfig.logo,
      logoSize: currentConfig.logoSize,
      logoMargin: currentConfig.logoMargin,
    }
    onApplyPreset(newConfig)
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-primary mb-4 font-inter">Style Presets</h2>
      <div className="flex gap-4 overflow-x-auto pt-2 pb-4 scrollbar-thin mask-gradient px-1">
        {presets.map((preset) => {
          const previewConfig = presetToQRConfig(preset)
          return (
            <div
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className="flex-shrink-0 w-[160px] cursor-pointer group"
            >
              <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl px-4 pb-4 pt-3 h-[260px] group-hover:translate-y-[-2px] group-hover:shadow-[inset_0_0_0_1.5px_rgba(124,109,255,0.5)] transition-all duration-300 flex flex-col">
                <div className="flex justify-center">
                  <QRPreviewMini config={previewConfig} />
                </div>
                <div className="mt-3 flex flex-col pl-3">
                  <h3 className="font-medium text-[15px] text-primary font-inter mb-1.5">{preset.name}</h3>
                  <p className="text-[13px] text-muted font-jetbrains tracking-[0.02em] leading-[1.5]">{preset.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
