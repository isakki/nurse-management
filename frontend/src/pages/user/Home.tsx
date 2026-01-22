import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import PrimaryBtn from '../../components/common/buttons/PrimaryBtn'
import { getSingleUser } from '../../services/user.service'

const Home = () => {

  const [count, setCount] = useState(10);


  const handleGetSingleUser = async () => {
    try {
      const userData = await getSingleUser(1)
      console.log(userData)
    } catch (error) {
      console.log(error, 'Error fetching single user data')
    }
  }

  return (
    <div className='container'>
      <h1>Home Page {count}</h1>
      <button onClick={handleGetSingleUser} className='btn btn-primary mb-4'>Get Single User</button>
      {/* <Link to='/profile'>
        <PrimaryBtn title='Profile' />
      </Link> */}
    </div>
  )
}

export default Home
