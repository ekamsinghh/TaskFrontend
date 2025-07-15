import React from 'react'

const BackgroundLayout = ({children}) => {
  return (
    <div className="relative w-screen max-w-full overflow-hidden min-h-screen bg-black text-white">
      
      <div className="absolute top-[-200px] left-[-100px] w-[400px] h-[400px] bg-purple-600 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-pink-500 opacity-20 rounded-full blur-2xl"></div>
      <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-yellow-400 opacity-10 rounded-full blur-[120px]"></div>
      <div className="absolute top-[-200px] right-[-100px] w-[400px] h-[400px] bg-purple-600 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute top-[40%] right-[60%] w-[300px] h-[300px] bg-yellow-400 opacity-10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-150px] left-[-100px] w-[350px] h-[350px] bg-pink-500 opacity-20 rounded-full blur-3xl"></div>

      <div>
        {children}
      </div>
      
    </div>
  )
}

export default BackgroundLayout;