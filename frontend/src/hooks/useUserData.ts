import { useEffect, useState } from 'react'
import { UserDataProps } from '../types/user'
import { fetchUserData } from '../services/user.service'

function useUserData(userId: number) {
  const [userData, setUserData] = useState<UserDataProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const userData = async () => {
      try {
        const data = await fetchUserData(userId)
        setUserData(data)
        setIsLoading(false)
      } catch (error: any) {
        console.log(error, 'Error getting user data')
        setError(error)
        setIsLoading(false)
      }
    }
    userData()
  }, [userId])
  return { userData, isLoading, error }
}

export default useUserData
