import React from 'react';

import './RoomHeader.scss';
import onlineIcon from '../../../icons/onlineIcon.png';
import closeIcon from '../../../icons/closeIcon.png';

const RoomHeader = ({ roomId }) => (

  <div className="room-header">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon"/>
      <h4> Room ID: { roomId } </h4>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img className="closeIcon" src={closeIcon} alt="close icon"/></a>

    </div>
  </div>

)

export default RoomHeader;
