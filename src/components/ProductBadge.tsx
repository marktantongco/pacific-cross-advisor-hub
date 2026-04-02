'use client';

import React from 'react';

type BadgeVariant = 'flexishield' | 'blue-royale';

interface ProductBadgeProps {
  variant: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const BADGE_CONFIG: Record<BadgeVariant, { label: string; cssClass: string }> = {
  flexishield: {
    label: 'FLEXISHIELD',
    cssClass: 'product-badge-yellow',
  },
  'blue-royale': {
    label: 'BLUE ROYALE',
    cssClass: 'product-badge-navy',
  },
};

const SIZE_MAP = {
  sm: { padding: '0.15rem 0.5rem', fontSize: '0.55rem' },
  md: { padding: '0.3rem 0.8rem', fontSize: '0.7rem' },
  lg: { padding: '0.4rem 1rem', fontSize: '0.8rem' },
};

export function ProductBadge({ variant, size = 'md', className = '' }: ProductBadgeProps) {
  const config = BADGE_CONFIG[variant];
  const sizeStyle = SIZE_MAP[size];

  return (
    <span
      className={`product-badge ${config.cssClass} ${className}`}
      style={{ padding: sizeStyle.padding, fontSize: sizeStyle.fontSize }}
    >
      {config.label}
    </span>
  );
}

export function FlexiShieldBadge({ size = 'md', className = '' }: Omit<ProductBadgeProps, 'variant'>) {
  return <ProductBadge variant="flexishield" size={size} className={className} />;
}

export function BlueRoyaleBadge({ size = 'md', className = '' }: Omit<ProductBadgeProps, 'variant'>) {
  return <ProductBadge variant="blue-royale" size={size} className={className} />;
}
