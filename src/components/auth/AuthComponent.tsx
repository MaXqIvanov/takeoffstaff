import React from 'react'
import styles from '../../scss/Auth.module.scss'

export const AuthComponent = ({isAuth, ChangeIsAuth}: {isAuth: boolean, ChangeIsAuth: CallableFunction }) => {
  return (
    <div className={styles.auth}>
        <div className={styles.auth_wrapper}>
        <form>
            <div className="form-floating mt-4">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mt-4">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary mt-4" type="submit">Войти</button>
            <div onClick={()=>ChangeIsAuth(!isAuth)} className={styles.change_window}>уже есть аккаунт ?</div>
        </form>
        </div>
    </div>
  )
}
