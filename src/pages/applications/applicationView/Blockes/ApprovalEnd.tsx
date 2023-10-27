import React, {useState} from 'react';
import { CollapseContainer } from '../ApplicationView';
import ImageUpload from './ImageUpload';
import Achnowledgement from './Achnowledgement';
import Approval from './Approval';
import { UploadFile } from 'antd';

export interface IApprovalEndProps {
}

export default function ApprovalEnd (props: IApprovalEndProps) {

    const [fileList, setFileList] = useState<UploadFile[]>([])

  return (
    <div>
        <CollapseContainer
            key={'imageUpload'}
            label={'Image Upload'}
            children={<ImageUpload setFileList={setFileList} fileList={fileList}/>}
        /> 

        <CollapseContainer
            key={'Achnowledgement'}
            label={'Achnowledgement'}
            children={<Achnowledgement/>}
        />

        <CollapseContainer
            key={'Achnowledgement'}
            label={'Achnowledgement'}
            children={<Approval fileList={fileList}/>}
        />
    </div>
  );
}
