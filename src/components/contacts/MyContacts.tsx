import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/redux'
import styles from '../../scss/Contacts.module.scss'
import { changeUserContact, deleteUserContact, getUserContacts, setIsChange } from '../../store/contactsSlice'
import { RootState } from '../../store/store'

export const MyContacts = () => {
    const {user} = useSelector((state:RootState)=> state.auth)
    const {userContacts, isChange} = useSelector((state:RootState)=> state.contacts)
    const [name, setName] = useState<string>('')
    const [currentUser, setCurrentUser] = useState<{id: number | undefined, username: string}>({id: undefined, username: ''})
    const dispatch = useAppDispatch()
    useEffect(() => {
      dispatch(getUserContacts(user))
    }, [])
    
  return (
    <div className={styles.user_contacts_wrapper}>
        <div className={styles.title}>Ваши контакты</div>
        {userContacts && userContacts.map((elem:{id: number, username: string, token: string})=>
            <div className={styles.user_contacts} key={elem.id}>
                    <div>{elem.username}</div>
                    <div className={styles.group_btn}>
                        <div onClick={()=> dispatch(deleteUserContact(elem))} title='Удалить из контактов' className={styles.remove_user}></div>
                        <div onClick={()=> [dispatch(setIsChange()), setName(elem.username), setCurrentUser(elem)]} title='Редактировать контакт' className={styles.edit_user}></div>
                    </div>
            </div>)}
    {isChange &&
        <div className={styles.modal}>
            <div className={styles.modal_wrapper}>
                <input className={styles.input_name} value={name} onChange={(e)=> setName(e.target.value)}/>
                <input onClick={()=> dispatch(changeUserContact({...currentUser, name}))} type={'button'} className={styles.input_btn} value={'принять изменения'}/>
                <div onClick={()=> dispatch(setIsChange())} className={styles.close_btn}></div>
            </div>
        </div>}
    </div>
  )
}
