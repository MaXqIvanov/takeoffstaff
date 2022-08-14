import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/redux'
import styles from '../../scss/Contacts.module.scss'
import { getAllContacts } from '../../store/contactsSlice'
import { RootState } from '../../store/store'

export const AllContacts = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAllContacts())
    }, [])
    const {allContacts} = useSelector((state:RootState)=> state.contacts)
    
  return (
    <div>
        <div>Все контакты</div>
        {allContacts && allContacts.map((elem:{id: number, username: string})=> <div key={elem.id}>
            {elem.username}
            </div>)}
    </div>
  )
}
