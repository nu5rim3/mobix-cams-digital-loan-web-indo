import { Grid, Typography } from 'antd';
import * as React from 'react';

export interface ITitleProps {
    title: string,
    level: 5 | 1 | 2 | 3 | 4 | undefined;
    style?: React.CSSProperties
}

export default function Title ({
    title,
    level,
    style
}: ITitleProps) {

    const { Title } = Typography;
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    
  return (
    <Title 
        level={
            typeof level === 'number' && level >= 1 && level <= 4
            ? (screens.xs ? level + 1 : level) as 5 | 1 | 2 | 3 | 4
            : level
        }
        style = {style}
    >
        {title}
    </Title>
  );
}
