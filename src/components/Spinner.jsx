import React from 'react'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
  <div className="spinner-border inline-block w-8 h-8 border-4 border-b-2 border-gray-900 rounded-full animate-spin" role="status">
  </div>
</div>
  )
}

export default Spinner