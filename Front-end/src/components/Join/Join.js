import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.scss';

const Join = () => {

  const [hook_NameState, setNameState] = useState('');  //inits 'name' state as empty string
  const [hook_RoomState, setRoomState] = useState('');

  return (

    <div className="container">
      <div className="container-content">

        <h1 className="heading">Join</h1>
        <div><input className="join-input"       onChange={(evt) => {setNameState(evt.target.value); localStorage.setItem('username', evt.target.value)}} placeholder="Name" type="text" /></div>
        <div><input className="join-input mt-20" onChange={(evt) => {setRoomState(evt.target.value); localStorage.setItem('roomID', evt.target.value)}} placeholder="Room ID" type="text" /></div>

        {/* // (used url params for simplicity, also possible by: passing props / redux  */}
        <Link to={`/chatroom?name=${hook_NameState}&roomId=${hook_RoomState}`}
              onClick={ evt => (!hook_NameState || !hook_RoomState) ? evt.preventDefault() : null}>
          <button className="btn mt-20" type="submit">Sign In</button>
        </Link>

      </div>
    </div>

  )
}

export default Join;
