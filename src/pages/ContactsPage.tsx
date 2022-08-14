import React from 'react'
import { AllContacts } from '../components/contacts/AllContacts'
import { MyContacts } from '../components/contacts/MyContacts'
import styles from '../scss/Contacts.module.scss'

export const ContactsPage = () => {
  return (
    <div className={styles.contacts}>
      <div className={styles.contacts_wrapper}>
        <MyContacts />
        <AllContacts />
      </div>
    </div>
  )
}
