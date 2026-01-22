import ProfileCard from '../../components/ui/card/ProfileCard'
import useUserData from '../../hooks/useUserData'

const Profile = () => {
  const { userData, isLoading, error } = useUserData(1)
  return (
    <div className='container'>
      {isLoading ? 'Loading' : <>
        <ProfileCard userData={userData}/>
      </>}
    </div>
  )
}

export default Profile