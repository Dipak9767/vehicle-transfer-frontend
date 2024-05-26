import axios from "axios"

export const fetchVehicles = async () => {
    try {
        const response = await axios.get('http://localhost:5000/vehicle/getAllVehicles')
        return response
    } catch (error) {
        return error
    }
}

export const createVehicle = async (payload:any) => {
    try {
        const response = await axios.post('http://localhost:5000/vehicle',payload)
        return response
    } catch (error) {
        return error
    }
}