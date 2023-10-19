import { Button } from 'antd';
import * as React from 'react';

export interface IButtonProps {
    label: string
    size: 'small' | 'large',
    onClick: Function,
    loading?: boolean;
    type?: 'primary',
    icon?: React.ReactNode
    shape?: "circle" | "default" | "round" | undefined
}

export default function ButtonContainer ({
    label,
    size,
    onClick,
    type,
    loading,
    icon,
    shape
}: IButtonProps) {
  return (
    <Button 
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
