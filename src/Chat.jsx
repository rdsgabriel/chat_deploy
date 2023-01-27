import { useEffect } from "react"
import { useState } from "react"
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat ({socket, name, room}) {

  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  const sendMessage =  async () => {
    if (!!currentMessage) {
      const messageData = {
      room: room,
      author: name,
      message: currentMessage,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      }

      await socket.emit('send_message', messageData )
      setMessageList((list) => [...list, messageData])
      setCurrentMessage('')
    }
  }

    useEffect(() => {
      socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data])
      } )
    }, [socket])


  return (
    <div className="chat-window">
      <div className="chat-header">
        <div id="on">
          <div id="ball"></div>
          <div>Online</div>
        </div>
        
      </div>

      <div className="chat-body">
        <ScrollToBottom scrollViewClassName="teste" className="message-container">
        {messageList.map((messageContent) => {
          return (
          <div className="message" 
          id={name === messageContent.author ? "you" : "other"}>

          <div>

            <div className="message-content">
              <p>{messageContent.message}</p>
            </div>

            <div className="message-meta">
              <p id="time">{messageContent.time}</p>
              <p id="author">{messageContent.author}</p>
            </div>

          </div>

        </div>
        )
        })} 
        </ScrollToBottom>
      </div>

      <div className="chat-footer">
        <input type='text' placeholder="Digite uma mensagem"  onChange={(event) => {setCurrentMessage(event.target.value)}}
          value={currentMessage}
          onKeyDown={(event) => {event.key == "Enter" && sendMessage();}}
        />
        <button onClick={sendMessage}>{svg}</button>
      </div>

    </div>
  )
}





const svg = <svg fill="#43a047" height="15px" width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
viewBox="0 0 512.662 512.662" xmlSpace="preserve">
<g>
<g>
 <path d="M505.021,5.868c-0.064-0.043-0.085-0.107-0.128-0.149c-0.128-0.107-0.256-0.128-0.384-0.235
   c-1.131-0.981-2.475-1.621-3.797-2.325c-0.427-0.213-0.747-0.576-1.195-0.768c-0.064-0.021-0.107-0.021-0.149-0.043
   c-0.469-0.192-0.853-0.533-1.323-0.704c-1.771-0.661-3.648-0.875-5.547-1.045c-0.576-0.043-1.131-0.299-1.707-0.299
   c-2.475-0.021-4.971,0.384-7.403,1.259L14.055,172.225c-7.445,2.709-12.779,9.323-13.867,17.173
   c-1.045,7.851,2.304,15.637,8.768,20.245l141.888,101.355l20.032,140.309c1.237,8.533,7.488,15.488,15.851,17.643
   c1.749,0.448,3.541,0.661,5.291,0.661c6.592,0,12.971-3.072,17.045-8.533l50.347-67.093l132.032,113.237
   c3.947,3.371,8.875,5.141,13.909,5.141c2.389,0,4.779-0.405,7.125-1.216c7.168-2.56,12.48-8.768,13.845-16.277l85.995-468.928
   C513.725,18.262,510.738,10.71,505.021,5.868z M240.125,348.396l-1.536,2.219l-32.747,43.669l-12.395-86.827l185.109-160.448
   L240.125,348.396z"/>
</g>
</g>
</svg>

export default Chat