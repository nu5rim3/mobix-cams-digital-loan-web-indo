import { Grid, Input } from 'antd';
import * as React from 'react';
import {SearchOutlined} from '@ant-design/icons' 

export interface ISearchProps {
    onChange: Function,
    className?: any
}

export default function Search ({
    className,
    onChange
}: ISearchProps) {
    
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

  return (
    <div className=
        {className?
            className
        :
            screens.xs
            ? 'pb-3 flex w-3/4'
            : 'pb-3 flex w-1/4'
        }> 
        <Input 
            size="large" 
            placeholder=" Search" 
            prefix={<SearchOutlined />} 
            onChange={(e) => onChange(e.target.value)}
        />
      </div>
  );
}
