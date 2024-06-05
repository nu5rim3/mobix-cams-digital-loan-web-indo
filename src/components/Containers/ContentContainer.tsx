import { Grid, theme } from 'antd';
import * as React from 'react';

export interface IContentContainerProps {
    children: React.ReactNode
}

export default function ContentContainer ({
    children
}: IContentContainerProps) {
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const {
        token: { colorBgContainer, borderRadiusOuter},
      } = theme.useToken();

  return (
    <div
        style={{
            width: '100%',
            overflow: 'auto',
            backgroundColor: colorBgContainer,
            borderRadius: borderRadiusOuter
        }}
        className={screens.xs? 'p-2': 'p-4'}
    >
      {children}
    </div>
  );
}
