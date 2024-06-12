import React, { useEffect, useRef, useCallback } from 'react';
import lottie, { AnimationConfigWithData, AnimationDirection, AnimationItem } from 'lottie-web';

interface LottieAnimationProps {
  animationData: any; // You can define a more specific type if available
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
  speed?: number;
  direction?: AnimationDirection;
  className?: string;
  width?: string,
  height?: string,
  onComplete?: () => void;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  loop = false,
  autoplay = true,
  style,
  speed = 1,
  direction = 1,
  width = '100%',
  height = '100%',
  className,
  onComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use useCallback to ensure onComplete doesn't change reference unless necessary
  const handleComplete = useCallback(() => {
    if (onComplete) {
      onComplete();
      console.log('complete ...');
    }
  }, [onComplete]);

  useEffect(() => {
    const animationConfig: AnimationConfigWithData = {
      container: containerRef.current!,
      renderer: 'svg',
      loop,
      autoplay,
      animationData
    };

    const animation: AnimationItem = lottie.loadAnimation(animationConfig);

    animation.setSpeed(speed);
    animation.setDirection(direction);

    // Attach complete event listener if provided
    animation.addEventListener('complete', handleComplete);

    return () => {
      animation.removeEventListener('complete', handleComplete);
      animation.destroy(); // Cleanup animation on unmount
    };
  }, [autoplay]);

  return <div 
            ref={containerRef}
            style={{...style, width, height}}
            className={className}></div>;
};

export default LottieAnimation;
