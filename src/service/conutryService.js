import axios from "axios"

export async function getAllCountry() {
    try {
        const res =await axios.get("http://localhost:8800/country")
        return res.data
    } catch (error) {
        return []
    }
}