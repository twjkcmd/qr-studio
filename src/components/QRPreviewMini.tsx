import { useEffect, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'
import type { QRConfig } from './QRPreview'

interface QRPreviewMiniProps {
  config: QRConfig
}

export default function QRPreviewMini({ config }: QRPreviewMiniProps) {
  const qrRef = useRef<HTMLDivElement>(null)
  const qrCodeRef = useRef<QRCodeStyling | null>(null)

  // Initialize QR code instance
  useEffect(() => {
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
    } else {
      dotsOptions.color = config.fgColor
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
    } else {
      cornersSquareOptions.color = config.fgColor
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
    } else {
      cornersDotOptions.color = config.fgColor
    }

    qrCodeRef.current = new QRCodeStyling({
      width: config.size,
      height: config.size,
      margin: config.margin,
      type: 'svg',
      data: config.data,
      dotsOptions,
      backgroundOptions: {
        color: config.bgColor,
      },
      cornersSquareOptions,
      cornersDotOptions,
      qrOptions: {
        errorCorrectionLevel: 'M',
      },
    })

    if (qrRef.current && qrCodeRef.current) {
      qrRef.current.innerHTML = ''
      qrCodeRef.current.append(qrRef.current)
    }
  }, [])

  // Update QR code when config changes
  useEffect(() => {
    if (qrCodeRef.current) {
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
      } else {
        dotsOptions.color = config.fgColor
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
      } else {
        cornersSquareOptions.color = config.fgColor
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
      } else {
        cornersDotOptions.color = config.fgColor
      }

      qrCodeRef.current.update({
        width: config.size,
        height: config.size,
        margin: config.margin,
        data: config.data,
        dotsOptions,
        backgroundOptions: {
          color: config.bgColor,
        },
        cornersSquareOptions,
        cornersDotOptions,
        qrOptions: {
          errorCorrectionLevel: 'M',
        },
      })
    }
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
  ])

  return (
    <div className="flex justify-center items-center w-[100px] h-[100px]">
      <div ref={qrRef} className="w-full h-full" />
    </div>
  )
}
