import { useState } from 'react'
import './App.css'
import { Button, ConfigProvider , theme, } from 'antd'
import { AuthProvider } from 'react-oauth2-code-pkce'
import {authConfig} from './authorization/authConfig'
import LayoutContainer from './components/layout/Layout'

function App() {
  const [userTheme, setUserTheme] = useState('light')
  const [primary, setPrimary] = useState('#102C57');

  return (
    <>
    <ConfigProvider
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
        algorithm: userTheme === 'light'? theme.defaultAlgorithm : theme.darkAlgorithm,
        token: {
          // colorPrimary: primary,
          borderRadiusOuter: 10,
        },
        components: {
          Table: {
            headerBg : '#E2EAF2',
            headerColor : primary,
            borderColor: '#E2EAF2'
          },
          Button:{
            colorPrimary: primary
            // primaryColor: primary
          },
          Typography:{
            colorTextHeading: primary,
            titleMarginTop: 0
          },
          Form:{
            labelColor : primary,
            labelHeight: 40,
            verticalLabelPadding: 0
          }
        }
        // 2. Combine dark algorithm and compact algorithm
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <AuthProvider authConfig={authConfig}>
        <LayoutContainer
          handleTheme = {setUserTheme}
          primary={primary}
          setPrimary = {setPrimary}
        />
         
      </AuthProvider>
  </ConfigProvider>
    </>
  )
}

export default App
