import React from 'react';
import { useParallax } from '../hooks/useParallax';

export interface ParallaxImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  speed?: number;
  maxOffset?: number;
  scale?: number;
  containerClassName?: string;
  wrapperClassName?: string;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  wrapperClassName = '',
  speed = 0.12,
  maxOffset = 22,
  scale = 1.08,
  style,
  ...props
}) => {
  const { ref, style: parallaxStyle } = useParallax<HTMLDivElement>({
    speed,
    maxOffset,
    scale,
  });

  return (
    <div
      ref={ref}
      className={`overflow-hidden relative ${containerClassName}`}
    >
      <div
        style={parallaxStyle}
        className={`w-full h-full transition-transform duration-100 ease-out ${wrapperClassName}`}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${className}`}
          style={style}
          {...props}
        />
      </div>
    </div>
  );
};
