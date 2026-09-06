import { useEffect, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'

export type QRConfig = {
  data: string
  size: number
  margin: number
  dotsType: 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded'
  cornerSquareType: 'square' | 'dot' | 'extra-rounded'
  cornerDotType: 'square' | 'dot'
  fgColor: string
  bgColor: string
  useGradient: boolean
  gradientType: 'linear' | 'radial'
  gradientColor1: string
  gradientColor2: string
  gradientAngle: number
  logo: File | null
  logoSize: number
  logoMargin: number
}

interface QRPreviewProps {
  config: QRConfig
  showExportButtons?: boolean
}

export default function QRPreview({ config, showExportButtons = true }: QRPreviewProps) {
  const qrRef = useRef<HTMLDivElement>(null)
  const qrCodeRef = useRef<QRCodeStyling | null>(null)
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null)

  // Convert logo file to data URL
  useEffect(() => {
    if (config.logo) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoDataUrl(e.target?.result as string)
      }
      reader.readAsDataURL(config.logo)
    } else {
      setLogoDataUrl(null)
    }
  }, [config.logo])

  // Initialize QR code instance
  useEffect(() => {
    // Don't initialize if there's no data
    if (!config.data) {
      return
    }

    const dotsOptions: any = {
      type: config.dotsType,
    }

    if (config.useGradient) {
      dotsOptions.gradient = {
        type: config.gradientType,
        colorStops: [
          { offset: 0, color: config.gradientColor1 },
          { offset: 1, color: config.gradientColor2 },
        ],
      }
      if (config.gradientType === 'linear') {
        dotsOptions.gradient.rotation = config.gradientAngle
      }
      dotsOptions.color = undefined
    } else {
      dotsOptions.color = config.fgColor
      dotsOptions.gradient = undefined
    }

    const cornersSquareOptions: any = {
      type: config.cornerSquareType,
    }

    if (config.useGradient) {
      cornersSquareOptions.gradient = {
        type: config.gradientType,
        colorStops: [
          { offset: 0, color: config.gradientColor1 },
          { offset: 1, color: config.gradientColor2 },
        ],
      }
      if (config.gradientType === 'linear') {
        cornersSquareOptions.gradient.rotation = config.gradientAngle
      }
      cornersSquareOptions.color = undefined
    } else {
      cornersSquareOptions.color = config.fgColor
      cornersSquareOptions.gradient = undefined
    }

    const cornersDotOptions: any = {
      type: config.cornerDotType,
    }

    if (config.useGradient) {
      cornersDotOptions.gradient = {
        type: config.gradientType,
        colorStops: [
          { offset: 0, color: config.gradientColor1 },
          { offset: 1, color: config.gradientColor2 },
        ],
      }
      if (config.gradientType === 'linear') {
        cornersDotOptions.gradient.rotation = config.gradientAngle
      }
      cornersDotOptions.color = undefined
    } else {
      cornersDotOptions.color = config.fgColor
      cornersDotOptions.gradient = undefined
    }

    qrCodeRef.current = new QRCodeStyling({
      width: config.size,
      height: config.size,
      margin: config.margin,
      type: 'svg',
      data: config.data,
      image: logoDataUrl || undefined,
      dotsOptions,
      backgroundOptions: {
        color: config.bgColor,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: config.logoMargin,
        imageSize: config.logoSize,
      },
      cornersSquareOptions,
      cornersDotOptions,
      qrOptions: {
        errorCorrectionLevel: config.logo ? 'H' : 'M',
      },
    })

    if (qrRef.current && qrCodeRef.current) {
      qrRef.current.innerHTML = ''
      qrCodeRef.current.append(qrRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.data])

  // Clear QR when data becomes empty (synchronous, before conditional render)
  useEffect(() => {
    if (!config.data && qrRef.current) {
      console.log('Synchronously clearing QR container due to empty data')
      qrRef.current.innerHTML = ''
    }
  }, [config.data])

  // Update QR code when config changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('QRPreview update - config.data:', config.data, 'type:', typeof config.data, 'isEmpty:', !config.data)
      if (qrCodeRef.current) {
        if (!config.data) {
          // Clear the QR when there's no data
          console.log('Clearing QR container')
          if (qrRef.current) {
            qrRef.current.innerHTML = ''
          }
          return
        }

        const dotsOptions: any = {
          type: config.dotsType,
        }

        if (config.useGradient) {
          dotsOptions.gradient = {
            type: config.gradientType,
            colorStops: [
              { offset: 0, color: config.gradientColor1 },
              { offset: 1, color: config.gradientColor2 },
            ],
          }
          if (config.gradientType === 'linear') {
            dotsOptions.gradient.rotation = config.gradientAngle
          }
          dotsOptions.color = undefined
        } else {
          dotsOptions.color = config.fgColor
          dotsOptions.gradient = undefined
        }

        const cornersSquareOptions: any = {
          type: config.cornerSquareType,
        }

        if (config.useGradient) {
          cornersSquareOptions.gradient = {
            type: config.gradientType,
            colorStops: [
              { offset: 0, color: config.gradientColor1 },
              { offset: 1, color: config.gradientColor2 },
            ],
          }
          if (config.gradientType === 'linear') {
            cornersSquareOptions.gradient.rotation = config.gradientAngle
          }
          cornersSquareOptions.color = undefined
        } else {
          cornersSquareOptions.color = config.fgColor
          cornersSquareOptions.gradient = undefined
        }

        const cornersDotOptions: any = {
          type: config.cornerDotType,
        }

        if (config.useGradient) {
          cornersDotOptions.gradient = {
            type: config.gradientType,
            colorStops: [
              { offset: 0, color: config.gradientColor1 },
              { offset: 1, color: config.gradientColor2 },
            ],
          }
          if (config.gradientType === 'linear') {
            cornersDotOptions.gradient.rotation = config.gradientAngle
          }
          cornersDotOptions.color = undefined
        } else {
          cornersDotOptions.color = config.fgColor
          cornersDotOptions.gradient = undefined
        }

        qrCodeRef.current.update({
          width: config.size,
          height: config.size,
          margin: config.margin,
          data: config.data,
          image: logoDataUrl || undefined,
          dotsOptions,
          backgroundOptions: {
            color: config.bgColor,
          },
          imageOptions: {
            crossOrigin: 'anonymous',
            margin: config.logoMargin,
            imageSize: config.logoSize,
          },
          cornersSquareOptions,
          cornersDotOptions,
          qrOptions: {
            errorCorrectionLevel: config.logo ? 'H' : 'M',
          },
        })
      }
    }, 80)

    return () => clearTimeout(timer)
  }, [
    config.data,
    config.size,
    config.margin,
    config.dotsType,
    config.cornerSquareType,
    config.cornerDotType,
    config.fgColor,
    config.bgColor,
    config.useGradient,
    config.gradientType,
    config.gradientColor1,
    config.gradientColor2,
    config.gradientAngle,
    logoDataUrl,
    config.logoSize,
    config.logoMargin,
    config.logo,
  ])

  const handleDownloadPNG = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({ name: 'qr-code', extension: 'png' })
    }
  }

  const handleDownloadSVG = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({ name: 'qr-code', extension: 'svg' })
    }
  }

  const handleDownloadJPEG = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({ name: 'qr-code', extension: 'jpeg' })
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Middle content area - QR/placeholder display */}
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <div className="relative flex items-center justify-center">
          {/* Always render the QR container */}
          <div ref={qrRef} className="rounded-lg" />
          {/* Opaque overlay placeholder when data is empty */}
          {!config.data && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border-2 border-dashed border-glass-border rounded-lg flex items-center justify-center bg-glass-bg backdrop-blur-[20px]">
              <span className="text-muted font-jetbrains text-xs tracking-[0.02em]">Enter details to generate</span>
            </div>
          )}
        </div>
      </div>
      {showExportButtons && config.data && (
        <div className="flex gap-3">
          <button
            onClick={handleDownloadPNG}
            className="px-6 py-2.5 bg-primary text-background font-inter text-sm font-light rounded-full hover:bg-amber transition-colors"
          >
            Download PNG
          </button>
          <button
            onClick={handleDownloadSVG}
            className="px-5 py-2.5 bg-transparent border border-white/15 text-primary font-inter text-sm font-light rounded-full hover:border-amber transition-colors"
          >
            SVG
          </button>
          <button
            onClick={handleDownloadJPEG}
            className="px-5 py-2.5 bg-transparent border border-white/15 text-primary font-inter text-sm font-light rounded-full hover:border-amber transition-colors"
          >
            JPEG
          </button>
        </div>
      )}
    </div>
  )
}
