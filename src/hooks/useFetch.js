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

const useFetch = ( initialLoading = false ) => {
    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(initialLoading)
    
    const fetchData = async request => {
        const headers = getHeaders()
        const body = createBody(request.body)
        const config = {
            headers,
            method: request.method || 'GET',
            ...body,
        }
        const url = API_URL + request.url

        setLoading(true)
        const resp = await fetch(url, config)
        const parsedResp = await resp.json()
        setData(parsedResp)
        setLoading(false)
        return parsedResp
    }

    return {
        data,
        loading,
        fetchData,
    }
}

export default useFetch