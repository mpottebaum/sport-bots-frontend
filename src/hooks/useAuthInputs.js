import { useState } from 'react'

const useAuthInputs = ( initialAuth = {}) => {
    const [ auth, setAuth ] = useState({
        name: '',
        email: '',
        password: '',
        ...initialAuth
    })

    const onChange = e => {
        const { value, name } = e.target
        setAuth({
            ...auth,
            [name]: value
        })
    }

    return [ auth, onChange ]
}

export default useAuthInputs