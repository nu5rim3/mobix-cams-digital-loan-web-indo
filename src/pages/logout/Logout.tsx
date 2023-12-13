import { Button } from 'antd';
import {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';

export interface ILogoutProps {
}

export default function Logout (props: ILogoutProps) {

  const navigate = useNavigate()
  const {logOut,login} = useContext<IAuthContext>(AuthContext)

  return (
    <div>
      <h1>
        Digital ME
      </h1>
      <Button onClick={() => {
        console.log("log")
        login()
      }}>
        Login 
      </Button>
    </div>
  );
}
