import { Grid, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ExpandableConfig } from 'antd/es/table/interface';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'

export interface IFPaginatedTableProps {
  loading: boolean,
  columns: ColumnsType<any>,
  dataSource: any[],
  rowKey?: string
  rowSelection?: boolean
  expandable?: ExpandableConfig<any> | undefined
}

export default function FPaginatedTable({
  loading,
  columns,
  dataSource,
  rowKey,
  rowSelection,
  expandable
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
        size={screens.xs ? 'small' : 'middle'}
        expandable={expandable}
      // pagination={{
      //   total: 10,
      //   pageSize: 10,
      //   pageSizeOptions: [10, 20, 50, 100]
      // }}
      />
    </div>
  );
}
