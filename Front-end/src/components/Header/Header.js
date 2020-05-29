import React, {useState, useEffect} from 'react';

import './Header.scss';

const Header = ({ location  }) => {

  const [hook_usernameState, setUsernameState] = useState(localStorage.getItem('username'));

  useEffect(() => {
    const keyPressHandler = (e) => {
      setTimeout(() => {
        setUsernameState(localStorage.getItem('username'));
      }, 100);
    };

    document.addEventListener('keydown', keyPressHandler);
    return () => {
      document.removeEventListener('keydown', keyPressHandler);
    };
  });


  return (

    <div className="header">
      <div className="header-innerContainer">
        <a href={'/chatroom?name=' + hook_usernameState + '&roomId=' + localStorage.getItem('roomID')}>
          <h2 className={window.location.pathname.includes('settings')? "" : "underlined"}>
            Chat
          </h2>
        </a>

        <a href="/settings">
          <h3 className={window.location.pathname.includes('settings')? "underlined" : ""}>
            Settings
          </h3>
        </a>

      </div>
    </div>

  )
}

export default Header;
