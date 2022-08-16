import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import styles from '../../scss/Auth.module.scss'
import { logout, userAuth } from '../../store/authSlice'
import { RootState } from '../../store/store'

export const AuthComponent = () => {
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const { auth } = useSelector((state:RootState)=> state.auth)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSubmit = () =>{
    dispatch(userAuth({nav, email, password}))
  }

  
  
  return (
    <div className={styles.auth}>
        <div className={styles.auth_wrapper}>
            <div className="form-floating mt-4">
            <input onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mt-4">
            <input onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
            </div>
            {
              !auth ? <input onClick={()=> onSubmit()} disabled={email.length == 0 && password.length == 0} className={`${styles.btn_auth} btn btn-lg btn-primary mt-4`} type="button" value={'Войти'}/>
              :
              <input onClick={()=> dispatch(logout())} className={`${styles.btn_auth} btn btn-lg btn-primary mt-4`} type="button" value={'Выйти'}/>
            }
        </div>
    </div>
  )
}
