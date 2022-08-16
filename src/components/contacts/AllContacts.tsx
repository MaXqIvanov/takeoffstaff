import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/redux'
import styles from '../../scss/Contacts.module.scss'
import { addUserContact, getAllContacts, searchingContacts } from '../../store/contactsSlice'
import { RootState } from '../../store/store'
import { contacts } from '../../ts/otherTypes'

export const AllContacts = () => {
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState<string>('')
    useEffect(() => {
      dispatch(getAllContacts())
    }, [])
    
    useEffect(() => {
      dispatch(searchingContacts(search))
    }, [search])
    const {allContacts, searchContacts} = useSelector((state:RootState)=> state.contacts)
    
  return (
    <div className={styles.all_contacts_wrapper}>
        <div className={styles.title}>Все контакты <input value={search} onChange={(e)=> setSearch(e.target.value)} className={`${styles.input_search}`}/></div>
        {searchContacts && searchContacts.map((elem:contacts)=> <div key={elem.id}>
                <div className={styles.all_contacts}>
                    <div>{elem.username}</div>
                    <div title='Добавить контакт' className={styles.user_add} onClick={()=>dispatch(addUserContact(elem))}></div>
                </div>
            </div>)}
    </div>
  )
}
