import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons'

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
            // wrapperCol={{ span: 20}}
            // size={screens.xs? 'middle' :'large'}
      >
        <Form.Item
                  // className={screens.xs? 'w-full' :'w-1/2'}
                  name="password"
                  label="Current Password"
                  rules={[
                    {
                      required: true,
                    },
                    // ({ getFieldValue }) => ({
                    //   validator(_, value) {
                    //     var pattern = new RegExp(
                    //       "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
                    //     );

                    //     if (value && pattern.test(value)) {
                    //       return Promise.resolve();
                    //     }
                    //     return Promise.reject(new Error(''));
                    //   },
                    // }),
                  ]}
                  style={{
                    fontWeight: 600,
                    // height: 20
                  }}
                  hasFeedback
                  // tooltip={{ title: 'Password should contain a digit[0-9], A lower case letter[a-z], An upper case letter[A-Z], one of !@#$%&* characters', icon: <InfoCircleOutlined /> }}
                >
                  <Input.Password style={{margin: 0}} autoComplete="off"/>
                </Form.Item>

                <Form.Item
                  // className={screens.xs? 'w-full' :'w-1/2'}
                  name="password"
                  label="New Password"
                  rules={[
                    {
                      required: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        var pattern = new RegExp(
                          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
                        );

                        if (value && pattern.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(''));
                      },
                    }),
                  ]}
                  style={{
                    fontWeight: 600,
                    // height: 20
                  }}
                  hasFeedback
                  tooltip={{ title: 'Password should contain a digit[0-9], A lower case letter[a-z], An upper case letter[A-Z], one of !@#$%&* characters', icon: <InfoCircleOutlined /> }}
                >
                  <Input.Password style={{margin: 0}} autoComplete="off"/>
                </Form.Item>

                <Form.Item
                  // className={screens.xs? 'w-full' :'w-1/2'}
                  name="confirmPassword"
                  label="Confirm Password"
                  rules={[
                    {
                      required: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                      },
                    }),
                  ]}
                  style={{
                    fontWeight: 600,
                    // height: 20
                  }}
                  hasFeedback
                  dependencies={['password']}
                >
                  <Input.Password style={{margin: 0}}/>
                </Form.Item>
      </Form>
      </Modal>
    </>
  );
};

export default ResetPassword;