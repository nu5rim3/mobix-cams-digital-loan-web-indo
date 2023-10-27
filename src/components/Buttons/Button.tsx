import { Button } from 'antd';
import * as React from 'react';

export interface IButtonProps {
    label: string
    size: 'small' | 'large',
    onClick: Function,
    loading?: boolean;
    type?: 'primary',
    icon?: React.ReactNode
    shape?: "circle" | "default" | "round" | undefined,
    className?: any
}

export default function ButtonContainer ({
    label,
    size,
    onClick,
    type,
    loading,
    icon,
    shape,
    className
}: IButtonProps) {
  return (
    <Button 
        className={className}
        onClick={() => {
            onClick()
        }} 
        type={type}
        size={size}
        icon={icon}
        shape={shape}
        loading={loading}
        >
        {label}
    </Button>
  );
}
