import axios from "axios"

export const fetchDrivers = async () => {
    try {
        const response = await axios.get('http://localhost:5000/driver/getAllDrivers')
        return response
    } catch (error) {
        return error
    }
}

export const createDriver = async (payload:any) => {
    try {
        const response = await axios.post('http://localhost:5000/driver',payload)
        return response
    } catch (error) {
        return error
    }
}