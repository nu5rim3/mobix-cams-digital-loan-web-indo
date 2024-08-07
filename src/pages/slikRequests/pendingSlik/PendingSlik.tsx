/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Search from '../../../components/Search/Search';
import { useSelector } from 'react-redux';
import GroupUpdate from './GroupUpdate/GroupUpdate';
import IndividualUpdate from './Individual/IndividualUpdate';
import { Radio, RadioChangeEvent, notification } from 'antd';
import { actions } from '../../../store/store';
import Button from '../../../components/Buttons/Button';
import { API } from '../../../services/Services';

export interface IPendingProps {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Pending(_props: IPendingProps) {

  const {
    selectedType,
    slikRequestsPaginatedData
  } = useSelector((state: any) => state.SlikRequest)
  const {
    selectedRole
  } = useSelector((state: any) => state.AppData)

  const [searchText, setSearchText] = useState<string | number>('')
  const [isUpdateBtnLoading, setIsUpdateBtnLoading] = useState<boolean>(false);
  const [isUpdateDisabled, setIsUpdateDisabled] = useState<boolean>(true);

  const slikTypes = [
    { label: 'Group', value: 'group' },
    { label: 'Individual', value: 'individual' }
  ];

  /**
   * update slik btach number updated data
   */
  const updateSlikBulk = async () => {
    try {
      setIsUpdateBtnLoading(true)
      const batchUpdatedData = slikRequestsPaginatedData?.data?.content?.filter((item: any) => item.batchNumber !== null && item.batchNumber !== '')
      await API.slikServices.updateSlikBulck(batchUpdatedData)
      notification.success({
        message: 'Batches Updated Successfully'
      })
      setIsUpdateBtnLoading(false)
    } catch (error) {
      console.error(error);
      setIsUpdateBtnLoading(false)
      notification.error({
        message: 'Batches Not Updated Successfully'
      })
    }
  }

  useEffect(() => {
    const _batchUpdatedData = slikRequestsPaginatedData?.data?.content?.filter((item: any) => item.batchNumber !== null && item.batchNumber !== '') ?? []
    if (_batchUpdatedData.length > 0) {
      setIsUpdateDisabled(false)
    } else {
      setIsUpdateDisabled(true)
    }
    return () => {
      setIsUpdateDisabled(true)
    }
  }, [slikRequestsPaginatedData])


  useEffect(() => {
    setSearchText('');
    return () => {
      setSearchText('');
    }
  }, [selectedType])

  return (
    <>
      <div className='flex flex-col sm:flex-row items-center justify-between my-2 gap-2'>
        <div className='w-2/3 flex flex-col sm:flex-row items-center gap-3'>
          <Radio.Group
            options={slikTypes}
            onChange={(e: RadioChangeEvent) => actions.SRchangeType(e.target.value)}
            value={selectedType}
            optionType="button"
            size='middle'
          />
          <Search
            placeholder='Search by Appraisal No.'
            className={'w-full sm:w-1/3'}
            value={searchText}
            onChange={(value: string | number) => setSearchText(value)}
          />

        </div>
        <div className='flex items-center justify-between gap-3'>
          {selectedType !== 'group' &&
            <Button size='middle' type='primary' onClick={() => updateSlikBulk()} label='Update Batch' disabled={selectedRole === 'ADMIN' || isUpdateDisabled} loading={isUpdateBtnLoading} />
          }
          {/* <Button size='middle' type='default' onClick={() => console.log('[DOWNLOAD BUTTON]')} label='Download Excel' /> */}
        </div>
      </div>
      {selectedType === 'group'
        ? <GroupUpdate searchText={searchText} />
        : <IndividualUpdate searchText={searchText} />
      }
    </>
  );
}
