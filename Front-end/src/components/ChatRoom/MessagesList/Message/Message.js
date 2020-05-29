import React from 'react';
import ReactEmoji from 'react-emoji';

import './Message.scss';

const Message = ({ msg:{user,text,timestamp}, name }) =>  {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser ?
      (
        <div className="messageContainer justifyEnd">
          <div className="msgBox bg-blue">
            <p className="sentTxt">{trimmedName}, {new Date(timestamp).toLocaleString("en-US",{ hour12: JSON.parse(localStorage.getItem('settings')).clockDisplay==='12h' ? true : false })}</p>
            <p className="msgTxt colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )
      :
      (
        <div className="messageContainer justifyStart">
          <div className="msgBox bg-lightGrey">
            <p className="sentTxt">{user}, {new Date(timestamp).toLocaleString("en-US",{ hour12: JSON.parse(localStorage.getItem('settings')).clockDisplay==='12h' ? true : false })}</p>
            <p className="msgTxt colorDarkGrey">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )
  )
}

export default Message;
