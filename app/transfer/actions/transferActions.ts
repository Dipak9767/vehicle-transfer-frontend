import axios from "axios"

export const fetchTransfer = async () => {
    try {
        const response = await axios.get('http://localhost:5000/transfer')
        return response
    } catch (error) {
        return error
    }
}

export const createTransfer = async (payload:any) => {
    try {
        const response = await axios.post('http://localhost:5000/transfer',payload)
        return response
    } catch (error) {
        return error
    }
}