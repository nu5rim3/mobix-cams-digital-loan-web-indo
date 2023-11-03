import { Button, ConfigProvider, Space } from 'antd';
import React from 'react';

const ThemeBlueWhite: React.FC<{children: React.ReactNode}> = ({children}) => (<ConfigProvider
                  // theme={{
                  //   token: {
                  //     // Seed Token
                  //     colorPrimary: '#00b96b',
                  //     borderRadius: 2,

                  //     // Alias Token
                  //     colorBgContainer: '#f6ffed',
                  //   },
                  // }}
                  theme={{
                    // 1. Use dark algorithm
                    // algorithm: theme.defaultAlgorithm,
                    // algorithm: userTheme === 'light'? theme.defaultAlgorithm : theme.darkAlgorithm,
                    token: {
                      colorPrimary: '#DAC0A3',
                      colorBgContainer: '#102C57',
                      // colorBgElevated: '#102C57',
                      // colorBgLayout: "#DAC0A3",
                      // colorFill: '#FFFFFF',
                      colorTextBase: '#FFFFFF',
                      colorPrimaryBg: '#102C57',
                    }
                    // 2. Combine dark algorithm and compact algorithm
                    // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
                  }}
                >
                    {children}
                </ConfigProvider>);

export default ThemeBlueWhite;