import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/redux'
import styles from '../../scss/Contacts.module.scss'
import { getUserContacts } from '../../store/contactsSlice'
import { RootState } from '../../store/store'

export const MyContacts = () => {
    const {user} = useSelector((state:RootState)=> state.auth)
    const {userContacts} = useSelector((state:RootState)=> state.contacts)
    const dispatch = useAppDispatch()
    useEffect(() => {
      dispatch(getUserContacts(user))
    }, [])
    
  return (
    <div>
        <div>Ваши контакты</div>
        {userContacts && userContacts.map((elem:{id: number, username: string, token: string})=>
            <div className={styles.user_contacts} key={elem.id}>
                    <div>{elem.username}</div>
                    <div className={styles.group_btn}>
                        <div title='Удалить из контактов' className={styles.remove_user}></div>
                        <div title='Редактировать контакт' className={styles.edit_user}></div>
                    </div>
            </div>)}
    </div>
  )
}
