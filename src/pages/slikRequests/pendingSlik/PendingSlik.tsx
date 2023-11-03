import React, {useState} from 'react';
import Title from '../../../components/Typography/Tytle';
import Search from '../../../components/Search/Search';
import { useSelector } from 'react-redux';
import GroupUpdate from './GroupUpdate/GroupUpdate';
import IndividualUpdate from './Individual/IndividualUpdate';
import { Radio } from 'antd';
import { actions } from '../../../store/store';

export interface IPendingProps {
}

export default function Pending (props: IPendingProps) {

  const {
    selectedType,
  } = useSelector((state: any) => state.SlikRequest)

  const [searchText, setSearchText] = useState<string>('')

  const slikTypes = [
    { label: 'Group', value: 'group' },
    { label: 'Individual', value: 'individual' }
  ];
  
  return (
    <div>
       <Title 
          style={{margin: 1}} 
          level={5}
          title='Search Items'
        />
        <div className='flex items-center'>
          <Search
            onChange={(value:any) => setSearchText(value)}
          />
          <Radio.Group 
            className='pb-3 pl-4'
            options={slikTypes} 
            onChange={(e:any) => actions.SRchangeType(e.target.value)} 
            value={selectedType} 
          />
        </div>
      {selectedType === 'group'
      ? <GroupUpdate searchText={searchText}/>
      : <IndividualUpdate searchText={searchText}/>
      }
    </div>
  );
}
