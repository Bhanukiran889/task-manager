import React from 'react'

const Profiles = () => {
  return (
    <div className="flex -space-x-2">
    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
      <img
        src="/src/assets/profile2.png"
        alt="profile"
        className="w-8 h-8 rounded-full"
      />{" "}
    </div>
    <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
      <img
        src="/src/assets/profile3.png"
        alt="profile"
        className="w-8 h-8 rounded-full"
      />{" "}
    </div>
    <div className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center">
      <img
        src="/src/assets/profile4.png"
        alt="profile"
        className="w-8 h-8 rounded-full"
      />{" "}
    </div>
    <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
      <img src="/src/assets/profile5.png" alt="profile" className="w-8 h-8 rounded-full"/>
    </div>
  </div>

  )
}

export default Profiles
