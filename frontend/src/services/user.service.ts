import axios from 'axios'
import { UserDataProps } from '../types/user'

// Fetch User Data
export async function fetchUserData(userId: number): Promise<UserDataProps> {
  try {
    const res = await axios.get(`https://dummyjson.com/users/${userId}`)
    return res.data
  } catch (error) {
    console.log(error, 'Error fetching user data')
    throw error
  }
}

export async function getSingleUser(userId: number) {
  try {
    const res = await axios.post(`http://localhost:7000/auth/getProfile`, { uid: userId })
    return res.data
  } catch (error) {
    console.log(error, 'Error fetching single user data')
    throw error
  }
}
