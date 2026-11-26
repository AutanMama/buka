import { useState } from 'react'

// Image with a neutral placeholder and a soft fade-in once loaded.
export default function Photo({ src, alt = '', className = '', imgClassName = '', priority = false }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`overflow-hidden bg-sunk ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`size-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
    </div>
  )
}
