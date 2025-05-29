declare module '@microlink/react' {
  import * as React from 'react';

  interface MicrolinkProps {
    url: string;
    size?: 'small' | 'large';
    media?: 'logo' | 'image' | 'video' | 'audio';
    lazy?: boolean;
    style?: React.CSSProperties;
    className?: string;
  }

  const Microlink: React.FC<MicrolinkProps>;
  export default Microlink;
}
