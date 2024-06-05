import { Grid, PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ExpandableConfig, TablePaginationConfig } from 'antd/es/table/interface';


export interface IBPaginatedTableProps {
    loading: boolean,
    columns: ColumnsType<any>,
    dataSource: any[],
    rowKey?: string,
    rowSelection?: boolean,
    expandable?: ExpandableConfig<any> | undefined,
    pagination?: PaginationProps,
    handlePaginationChange?: (page: number, pageSize?: number) => void,
}

export default function BPaginatedTable({
    loading,
    columns,
    dataSource,
    rowKey,
    rowSelection,
    expandable,
    pagination,
    handlePaginationChange,
}: IBPaginatedTableProps) {
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    const handleTableChange = (
        pagination: TablePaginationConfig,
    ) => {
        handlePaginationChange && handlePaginationChange(pagination.current ?? 1, pagination.pageSize ?? 7);
    };

    return (
        <>
            <div className="overflow-x-auto">
                <Table
                    className='text-gray-500'
                    loading={loading}
                    rowKey={rowKey}
                    columns={columns}
                    dataSource={dataSource || []}
                    size={screens.md ? "small" : "middle"}
                    expandable={expandable}
                    pagination={pagination}
                    bordered
                    onChange={handleTableChange}
                />
            </div>
        </>
    );
}
