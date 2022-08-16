export interface contacts{
    id: number | null,
    email: string,
    password: string,
    token: string,
    username: string,
    name?: string
}

export interface ContactsState {
    allContacts: Array<contacts>,
    searchContacts: Array<contacts>,
    loadingContacts: boolean,
    userContacts: Array<contacts>,
    isChange: boolean
}

export interface AuthState{
    auth: boolean,
    loading: boolean,
    user: contacts
    }