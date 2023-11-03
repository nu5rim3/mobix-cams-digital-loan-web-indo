import React from 'react';
import { Button, Divider, Space, Switch } from 'antd';

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const App: React.FC = () => {
 return (
    <>
    <Space wrap>
        <Button type='primary'>Primary</Button>
        
        <Button type='default'>Primary</Button>
    </Space>
    <div>
        <Switch defaultChecked onChange={onChange} />
    </div>
    </>
 )
}

export default App;