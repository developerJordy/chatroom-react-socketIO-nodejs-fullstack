import React, { useState, useEffect} from 'react'; //useState=hooks, useEffect=lifecycle methods inside hooks
import queryString from 'query-string';
import io from 'socket.io-client';

import RoomHeader from './RoomHeader/RoomHeader';
import MessagesList from './MessagesList/MessagesList';
import CreateMessage from './CreateMessage/CreateMessage';
import './ChatRoom.scss';

let socket;

const ChatRoom = ({ location }) => {

  const ENDPOINT = 'localhost:8080';

  const [hook_NameState, setNameState] = useState('');
  const [hook_RoomIdState, setRoomIdState] = useState('');
  const [hook_MessageState, setMessageState] = useState('');
  const [hook_MessagesState, setMessagesState] = useState([]);
  const [hook_interfaceModeState, setInterfaceModeState] = useState('');



  //runs when component renders, lifecycle hook
  useEffect(() => {

    const { name, roomId } = queryString.parse(location.search);
    setNameState(name);
    setRoomIdState(roomId);

    socket = io(ENDPOINT)
    socket.emit(  'join',           // backend socket.on('join', ())
                  { name, roomId }, // data to be sent to back-end
                  () => {}          // callback

                  // ({ error }) => {  // callback from server handler: here with object destructoring for 'error'
                  //     alert(error);
                  // }
    );

    setInterfaceModeState(JSON.parse(localStorage.getItem('settings')).interfaceColor);


    return () => { // disconnect event when unmounting component
      socket.emit('disconnect');
      socket.off(
      );
    }
  }, [ENDPOINT, location.search]);    {/* useEffect will only activate if values in this arr change */}





  useEffect(() => {
    socket.on('message', (msg) => {
      setMessagesState([...hook_MessagesState, msg])
    })
  }, [hook_MessagesState]);    {/* useEffect will only activate if values in this arr change */}





  const sendMessage = (evt) => {
    evt.preventDefault();

    if(hook_MessageState) {
      socket.emit('sendMessage', hook_MessageState, () => setMessageState(''));
    }
  }


  console.log(hook_MessageState, hook_MessagesState);

  return (

    <div className="chatroom-container">
    <div className={`chatroom-container-content ${hook_interfaceModeState==='Light' ? 'light-mode-bg' : 'dark-mode-bg'}`}>

        <RoomHeader
         roomId={ hook_RoomIdState }
        />

        <MessagesList
         messages={hook_MessagesState}
         name={hook_NameState}
        />

        <CreateMessage
         hook_MessageState={hook_MessageState}
         setMessageState={setMessageState}
         sendMessage={sendMessage}
        />

      </div>
    </div>

  )
}

export default ChatRoom;
