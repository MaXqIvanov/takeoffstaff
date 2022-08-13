import React, { useState } from 'react'
import { AuthComponent } from '../components/auth/AuthComponent'
import { RegistrationComponent } from '../components/auth/RegistrationComponent'

export const AuthPage = () => {
    const [isAuth, ChangeIsAuth] = useState<boolean>(true)

  return (
    <div>
        {isAuth ? 
        <AuthComponent isAuth={isAuth} ChangeIsAuth={ChangeIsAuth}/>
        :
        <RegistrationComponent />
        }
    </div>
  )
}
