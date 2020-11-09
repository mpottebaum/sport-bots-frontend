import { useState } from 'react'

const useAuthInputs = ( initialAuth = {}) => {
    const authObj = {
        name: '',
        email: '',
        password: '',
        ...initialAuth
    }
    const [ auth, setAuth ] = useState(authObj)

    const onChange = e => {
        const { value, name } = e.target
        setAuth({
            ...auth,
            [name]: value
        })
    }

    const resetInputs = inputs => setAuth(inputs || authObj)

    return [ auth, onChange, resetInputs ]
}

export default useAuthInputs