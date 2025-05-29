'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const LinkPreview = dynamic(() => import('@/components/LinkPreview'), { ssr: false });

type HoverLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function HoverLink({ href, children }: HoverLinkProps) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <span
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative' }}
    >
      <Link href={href}>{children}</Link>
      {show && <LinkPreview url={href} position={pos} />}
    </span>
  );
}
