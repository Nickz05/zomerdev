import { useState } from 'react'

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

export default function BlurImage({ src, alt, className = '', style, ...props }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        ...style,
        filter: loaded ? 'none' : 'blur(12px)',
        transform: loaded ? (style?.transform ?? 'scale(1)') : `scale(1.04)${style?.transform ? ` ${style.transform}` : ''}`,
        transition: 'filter 600ms ease, transform 600ms ease',
      }}
      onLoad={() => setLoaded(true)}
      {...props}
    />
  )
}
