import React, {useState} from 'react';
import { CollapseContainer } from '../ApplicationView';
import ImageUpload from './ImageUpload';
import Achnowledgement from './Achnowledgement';
import Approval from './Approval';
import { UploadFile } from 'antd';
import { useSelector } from 'react-redux';

export interface IApprovalEndProps {
}

export default function ApprovalEnd (props: IApprovalEndProps) {

    const [fileList, setFileList] = useState<UploadFile[]>([])
    const {
        selectedRole
    } = useSelector((state: any) => state.AppData)

  return (
    <div>
        {
            // selectedRole === 'CA' || selectedRole === 'BM'?
                <CollapseContainer
                    key={'imageUpload'}
                    label={'Image Upload'}
                    children={<ImageUpload setFileList={setFileList} fileList={fileList}/>}
                /> 
            // :
            //     null
        }

        <CollapseContainer
            key={'Achnowledgement'}
            label={'Achnowledgement'}
            children={<Achnowledgement/>}
        />

        <CollapseContainer
            key={'Approval'}
            label={'Approval'}
            children={<Approval fileList={fileList}/>}
        />
    </div>
  );
}
