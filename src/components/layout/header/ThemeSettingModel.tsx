import { ColorPicker, Divider, Modal, Switch } from 'antd';
import * as React from 'react';

export interface IThemeSettingModelProps {
  showSettings: boolean
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>,
  handleTheme : any,  // take these to redux
  primary: any, 
  setPrimary: any
}

export default function ThemeSettingModel ({
  showSettings,
  setShowSettings,
  handleTheme , // take these to redux
  primary,
  setPrimary,
}: IThemeSettingModelProps) {
  return (
    <Modal 
      title="Theme Settings" 
      open={showSettings} 
      // onOk={setNewTheme} 
      onCancel={() => setShowSettings(false)}
    >
    <Switch
      checkedChildren={'Light'}
      unCheckedChildren={'Dark'}
      onChange={(value) => {
        return value? handleTheme('light'): handleTheme('dark')
      
    }}
    />
      <Divider />
      <ColorPicker showText value={primary} onChangeComplete={(color) => setPrimary(color.toHexString())} />
  </Modal>
  );
}
