import React from 'react';

import './CreateMessage.scss';

const CreateMessage = ({hook_MessageState, setMessageState, sendMessage}) =>  (
  <form className="form">
    <input
     className="input"
     type="text"
     placeholder="Enter new Message"
     value={hook_MessageState}
     onChange={(evt) => setMessageState(evt.target.value)}
     onKeyDown={evt => evt.key = 'Enter' && evt.ctrlKey &&  JSON.parse(localStorage.getItem('settings')).msgSendOnCtrlEnter === 'true'
                ? sendMessage(evt) : null }
    />
    <button className="sendBtn" onClick={(evt) => sendMessage(evt)}>Send</button>
  </form>
)

export default CreateMessage;
