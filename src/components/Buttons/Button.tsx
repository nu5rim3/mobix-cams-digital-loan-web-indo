import { Button, Grid } from 'antd';
import * as React from 'react';

export interface IButtonProps {
  label: string
  size?: 'small' | 'large' | 'middle',
  onClick: Function,
  loading?: boolean;
  type?: 'primary' | 'default' | 'dashed' | 'danger' | 'link',
  icon?: React.ReactNode
  shape?: "circle" | "default" | "round" | undefined,
  className?: any,
  disabled?: boolean
}

export default function ButtonContainer({
  label,
  size,
  onClick,
  type,
  loading,
  icon,
  shape,
  className,
  disabled,
}: IButtonProps) {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <Button
      className={`${className} hover:shadow-md`}
      onClick={() => {
        onClick();
      }}
      type={type !== "danger" ? type : undefined}
      size={screens.xs ? "small" : size}
      icon={icon}
      shape={shape}
      loading={loading}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}
