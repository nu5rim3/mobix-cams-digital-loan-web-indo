import { Grid, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

export interface ISearchProps {
    onChange: Function,
    className?: any,
    placeholder?: string
}

export default function Search({
    className,
    onChange,
    placeholder
}: ISearchProps) {

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    return (
        <div className=
            {className ?
                className
                :
                screens.xs
                    ? 'pb-3 flex w-3/4'
                    : 'pb-3 flex w-1/4'
            }>
            <Input
                size="middle"
                allowClear
                placeholder={placeholder ?? " Search"}
                prefix={<SearchOutlined />}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
