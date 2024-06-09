// import React from 'react'
import loader from '../../assets/loader.gif'

const Loader = () => {
  // Loading animation: To run during function await
  return (
    <div className='w-12 md:w-16 lg:w-16 mx-auto'>
        <img src={loader} alt="loading animation" />
      </div>
  )
}

export default Loader