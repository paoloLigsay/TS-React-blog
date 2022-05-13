import React, { useContext } from "react";
import { loginContext } from "../App";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const userContext: any = useContext(loginContext) || {}

  const handleUserLogin = (id: number, name:string) => {
    userContext.setUser({ id, name })
  }

  return (
    <>
      <h1> Choose a user </h1>
      <div className="login">
        {
          userContext?.users?.data.map((user: { id: number, name: string }) => 
            <Link className="login__item" onClick={() => handleUserLogin(user.id, user.name)} key={user?.id} to="/blog"> 
              { user?.name }
            </Link>
          )
        }
      </div>
    </>
  )
}

export default Login