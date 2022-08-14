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
  const { 
    register,
    formState: {
    errors,
    isValid
    },
    handleSubmit,
    reset,
    
  } = useForm({
    mode: "onBlur"
  });

  const onSubmit = () =>{
    dispatch(userAuth({nav, email, password}))
  }

  
  
  return (
    <div className={styles.auth}>
        <div className={styles.auth_wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mt-4">
            <input onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mt-4">
            <input onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
            </div>
            {
              !auth ? <input disabled={!isValid} className="w-100 btn btn-lg btn-primary mt-4" type="submit" value={'Войти'}/>
              :
              <input onClick={()=> dispatch(logout())} className="w-100 btn btn-lg btn-primary mt-4" type="button" value={'Выйти'}/>
            }
        </form>
        </div>
    </div>
  )
}
