interface MarqueeTextProps {
  children: React.ReactNode;
  speed?: 'normal' | 'slow';
  className?: string;
}

export function MarqueeText({ children, speed = 'normal', className = '' }: MarqueeTextProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex">
        <div className={`flex shrink-0 ${speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee'}`}>
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}
