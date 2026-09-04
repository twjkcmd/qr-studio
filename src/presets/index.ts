export type ColorType = 'single' | 'gradient'

export type SingleColor = {
  type: 'single'
  color: string
}

export type GradientColor = {
  type: 'gradient'
  gradientType: 'linear' | 'radial'
  color1: string
  color2: string
  angle?: number
}

export type PresetColor = SingleColor | GradientColor

export type QRPreset = {
  id: string
  name: string
  description: string
  config: {
    dotsType: 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded'
    cornerSquareType: 'square' | 'dot' | 'extra-rounded'
    cornerDotType: 'square' | 'dot'
    colorType: ColorType
    color: PresetColor
    bgColor: string
  }
}

export const presets: QRPreset[] = [
  {
    id: 'ink',
    name: 'Ink',
    description: 'Classic square dots, black on cream',
    config: {
      dotsType: 'square',
      cornerSquareType: 'square',
      cornerDotType: 'square',
      colorType: 'single',
      color: {
        type: 'single',
        color: '#1a1a1a',
      },
      bgColor: '#f5f5dc',
    },
  },
  {
    id: 'neon-grid',
    name: 'Neon Grid',
    description: 'Electric dots with gradient on dark',
    config: {
      dotsType: 'dots',
      cornerSquareType: 'square',
      cornerDotType: 'dot',
      colorType: 'gradient',
      color: {
        type: 'gradient',
        gradientType: 'linear',
        color1: '#00f5ff',
        color2: '#8a2be2',
        angle: 45,
      },
      bgColor: '#0a0a0a',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm gradient rounded dots',
    config: {
      dotsType: 'rounded',
      cornerSquareType: 'extra-rounded',
      cornerDotType: 'dot',
      colorType: 'gradient',
      color: {
        type: 'gradient',
        gradientType: 'linear',
        color1: '#ff6b35',
        color2: '#f7931e',
        angle: 135,
      },
      bgColor: '#fff8f0',
    },
  },
  {
    id: 'mono-glass',
    name: 'Mono Glass',
    description: 'Minimalist semi-transparent gray',
    config: {
      dotsType: 'extra-rounded',
      cornerSquareType: 'extra-rounded',
      cornerDotType: 'square',
      colorType: 'single',
      color: {
        type: 'single',
        color: '#808080',
      },
      bgColor: '#ffffff',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Nature-inspired classy gradient',
    config: {
      dotsType: 'classy-rounded',
      cornerSquareType: 'square',
      cornerDotType: 'dot',
      colorType: 'gradient',
      color: {
        type: 'gradient',
        gradientType: 'linear',
        color1: '#20b2aa',
        color2: '#32cd32',
        angle: 90,
      },
      bgColor: '#f0fff0',
    },
  },
  {
    id: 'print-stamp',
    name: 'Print Stamp',
    description: 'Two-tone contrast with accent',
    config: {
      dotsType: 'square',
      cornerSquareType: 'square',
      cornerDotType: 'dot',
      colorType: 'single',
      color: {
        type: 'single',
        color: '#ff006e',
      },
      bgColor: '#ffffff',
    },
  },
]
