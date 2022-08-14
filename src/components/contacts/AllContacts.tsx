import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/redux'
import styles from '../../scss/Contacts.module.scss'
import { addUserContact, getAllContacts } from '../../store/contactsSlice'
import { RootState } from '../../store/store'

export const AllContacts = () => {
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState<string>('')
    useEffect(() => {
        if(search.length == 0){
            dispatch(getAllContacts())
          }
        else{

        }
    }, [search])
    const {allContacts} = useSelector((state:RootState)=> state.contacts)
    
  return (
    <div>
        <div>Все контакты <input value={search} onChange={(e)=> setSearch(e.target.value)} className={`${styles.input_search}`}/></div>
        {allContacts && allContacts.map((elem:{id: number, username: string, token: string})=> <div key={elem.id}>
                <div className={styles.all_contacts}>
                    <div>{elem.username}</div>
                    <div title='Добавить контакт' className={styles.user_add} onClick={()=>dispatch(addUserContact(elem))}></div>
                </div>
            </div>)}
    </div>
  )
}
