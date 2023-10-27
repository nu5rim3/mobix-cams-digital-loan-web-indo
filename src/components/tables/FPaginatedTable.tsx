import { Grid, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import * as React from 'react';

export interface IFPaginatedTableProps {
    loading: boolean,
    columns: ColumnsType<any>,
    dataSource: any[],
    rowKey?: string
}

export default function FPaginatedTable ({
    loading,
    columns,
    dataSource,
    rowKey
}: IFPaginatedTableProps) {

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    
  return (
    <div className='overflow-x-auto'>
      <Table 
          loading={loading}
          rowKey={rowKey}
          columns={columns} 
          dataSource={dataSource || []}
          size={screens.xs? 'small' :'middle'}
      />
    </div>
  );
}
