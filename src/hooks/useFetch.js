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
    
    const fetchData = async request => {
        const headers = getHeaders()
        const body = createBody(request.body)
        const config = {
            headers,
            method: request.method || 'GET',
            ...body,
        }
        const url = API_URL + request.url
        if(!controlLoading) setLoading(true)
        const resp = await fetch(url, config)
        const parsedResp = await resp.json()
        setData(parsedResp)
        if(!controlLoading) setLoading(false)
        return parsedResp
    }

    const addSetLoading = controlLoading ? { setLoading } : {}

    return {
        data,
        loading,
        fetchData,
        ...addSetLoading,
    }
}

export default useFetch