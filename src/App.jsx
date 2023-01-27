import { useState } from 'react'
import io from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import Chat from './Chat'

const socket = io.connect('https://chatdeploy-production.up.railway.app')


function App() {
  const [room, setRoom] = useState('')
  const [name, setName] = useState('')
  const [showChat, setShowChat] = useState(false)


  


  const joinRoom = () => {
    if (!!name && !!room) {
      socket.emit("join_room", room)
      setShowChat(true)
      toast.success('Você entrou na Sala!', {icon: "🦎", theme: 'light'})
    }
  }


  return (
  <div className="App">
    {!showChat ? (
       <div className='joinChatContainer'>
       <h2>Entre em um Chat &#129422;</h2>
      <input type="text" placeholder='Seu nome'
       onChange={(event) => {setName(event.target.value)}}
       id="yourName"/>
      <input type="text" placeholder='ID da Sala'
       onChange={(event) => {setRoom(event.target.value)}}
       onKeyDown={(event) => {event.key == "Enter" && joinRoom();}}
       />
      <button onClick={joinRoom}>Entrar</button>
     </div>

    ) : (<Chat socket={socket} name={name} room={room} />)
  
      }
    
      <ToastContainer position='top-center' closeOnClick pauseOnFocusLoss={false} pauseOnHover={false}/>
  </div>
  )
}


export default App
