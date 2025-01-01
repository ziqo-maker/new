'use client'
import React, { useEffect,useState } from "react";
import {WebApp} from '@twa-dev/types'

declare global {
  interface Window{
     Telegram?: {
        WebApp:WebApp
     }
  }
}

function Home(){
  const [user,setUser] = useState<any>(null)
  const [error,setError] = useState<string | null>(null)
  const[notification,setNotification] = useState('')

  useEffect(() => {
      if(typeof window !== 'undefined' && window.Telegram?.WebApp){
        const tg = window.Telegram?.WebApp
        tg.ready()
           
        const initData = tg.initData || ''
        const initDataUnsafe = tg.initDataUnsafe || {}

        if(initDataUnsafe.user){
           fetch('/api/user',{
              method: 'POST',
              headers: {
                 'Content=Type' : 'application/json'
              },
              body: JSON.stringify(initDataUnsafe.user),
           })
           .then((res) => res.json())
           .then((data) => {
            if(data.error){
              setError(data.error)
            }else{
              setUser(data)
            }
           })
           .catch((err) => {
              setError('failed to fetch user')
           })
        }else{
           setError('No user data available')
        }
      }else{
        setError('this app should open in telegram')
      }

  },[])

  if(error){
     return <div className="cointainer mx-auto p-4 text-red-500">{error}</div>
  }

if(!user) return <div className="container mx-auto p-4">Loading...</div>

   return <div className="flex flex-col h-screen relative">
     <h1 className="text-2x1 font-bold mb-4">welcome,{user.firstname}</h1>
      <div className="flex items-center justify-center mt-16">
        
      </div>
   </div>
}

export default Home;
