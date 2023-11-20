import React, { useState } from 'react';
import { Button, Form, Modal } from 'antd';

interface ResetPasswordProps{
    open: boolean,
    setOpen: any
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
    open,
    setOpen
}) => {
//   const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button> */}
      <Modal
        title="Reset User Password"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
         <Form
            form={form}
            name="register"
            layout='vertical'
            scrollToFirstError
            // onFinish={(e)=> handleAddUser(e)}
            onFieldsChange={(e:any)=> {
            //   if(e[0]?.name[0] == "roles"){
            //     if((e[0]?.value.includes('MFO'))){
            //       setShowMeCode(true)
            //     }else{
            //       setShowMeCode(false)
            //     }
            //   }
            }}
            wrapperCol={{ span: 20}}
            // size={screens.xs? 'middle' :'large'}
      >
        
      </Form>
      </Modal>
    </>
  );
};

export default ResetPassword;