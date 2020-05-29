import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import './MessagesList.scss';

const MessagesList = ({ messages, name }) =>  (
  <ScrollToBottom className="messages">
    {messages.map((msg, index) =>
      <div key={index}><Message msg={msg} name={name}/></div>
    )}
  </ScrollToBottom>
)

export default MessagesList;
