import { useState } from 'react'
import API_URL from '../constants/api'

const getHeaders =  () => {
    const token = localStorage.getItem('token')

    return {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

const createBody = body => body ? { body: JSON.stringify(body) } : {}

const useFetch = ( controlLoading = false ) => {
    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(controlLoading)
    const [ errors, setErrors ] = useState(null)
    
    const fetchData = async request => {
        setErrors(null)
        const headers = getHeaders()
        const body = createBody(request.body)
        const config = {
            headers,
            method: request.method || 'GET',
            ...body,
        }
        const url = API_URL + request.url
        if(!controlLoading) setLoading(true)
        let parsedResp
        try {
            const resp =  await fetch(url, config)
            parsedResp = await resp.json()
            if(parsedResp.error) setErrors(parsedResp.error.messages)
            else setData(parsedResp)
        } catch(err) {
            setErrors(['Something went wrong.'])
            parsedResp = {}
        }
        if(!controlLoading) setLoading(false)
        return parsedResp
    }

    const addSetLoading = controlLoading ? { setLoading } : {}

    return {
        data,
        loading,
        errors,
        fetchData,
        ...addSetLoading,
    }
}

export default useFetch