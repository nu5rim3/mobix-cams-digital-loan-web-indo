import { Layout, theme } from 'antd';
import * as React from 'react';

export interface IFooterContainerProps {
}

const footerStyle: React.CSSProperties = {
    textAlign: 'right',
    height: 30,
    padding: 5,
    paddingRight: 20,
    fontWeight: 800
  };

  const { Footer} = Layout;

export default function FooterContainer (props: IFooterContainerProps) {

    const {
        token: { colorBgContainer},
      } = theme.useToken();

  return (
    <Footer 
        style={{
            ...footerStyle,
            backgroundColor: colorBgContainer,
        }}
    >
        {/* get this from redux common place */}
        v0.0.3 
    </Footer>
  )
}
