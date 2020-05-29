import React, { Component, useState, useEffect } from 'react';

import './Settings.scss';

const Settings = () => {

  const [hook_interfaceModeState, setInterfaceModeState] = useState('Light');

  let username = localStorage.getItem('username');
  let settings = {
    interfaceColor: 'Light',
    clockDisplay: '24h',
    msgSendOnCtrlEnter: 'true',
    language: 'English',
    roomId: null
  }
  if(localStorage.getItem('settings') !== null) {
    settings = JSON.parse(localStorage.getItem('settings'));
  }


  useEffect(() => {
    setInterfaceModeState(settings.interfaceColor);
  });


  const myChangeHandler = (event) => {
    settings[event.target.name] = event.target.value;
    console.log("settings: ", settings);
    localStorage.setItem('settings', JSON.stringify(settings));
    if(event.target.name==='interfaceColor'){
      setInterfaceModeState(settings.interfaceColor);
    }
  }

  const myUsernameChangeHandler = (event) => {
      username = event.target.value;
      localStorage.setItem('username', username);
  }

  const resetSettings = () => {
    console.log("RESET");
    settings.interfaceColor= 'Light';
    settings.clockDisplay= '12h';
    settings.msgSendOnCtrlEnter= 'true';
    settings.language= 'English';
    localStorage.setItem('settings', JSON.stringify(settings));
    window.location.reload(false);
  }


  return (

    <div className="settings-container">
      <div className={`settings-container-content ${hook_interfaceModeState==='Light' ? 'light-mode-bg' : 'dark-mode-bg'}`}>

        <form>

         <h1>Settings</h1>

         <div className="form-field">
           <p>User name:</p>
           <input type='text' name='userName' defaultValue={username} onChange={myUsernameChangeHandler}/>
           </div>

         <div className="form-field">
           <p>Interface color</p>
           <input type="radio" name="interfaceColor" value={'Light'} onChange={myChangeHandler} defaultChecked={settings.interfaceColor === 'Light'}/>  Light
           <input type="radio" name="interfaceColor" value={'Dark'} onChange={myChangeHandler} defaultChecked={settings.interfaceColor === 'Dark'}/> Dark
         </div>

         <div className="form-field">
           <p>Clock display</p>
           <input type="radio" name="clockDisplay" value={'12h'} onChange={myChangeHandler} defaultChecked={settings.clockDisplay === '12h'}/> 12 Hours
           <input type="radio" name="clockDisplay" value={'24h'} onChange={myChangeHandler} defaultChecked={settings.clockDisplay === '24h'}/> 24 Hours
         </div>

         <div className="form-field">
           <p>Send messages on CTRL+ENTER</p>
           <input type="radio" name="msgSendOnCtrlEnter" value={true} onChange={myChangeHandler} defaultChecked={settings.msgSendOnCtrlEnter == 'true'} /> On
           <input type="radio" name="msgSendOnCtrlEnter" value={false} onChange={myChangeHandler} defaultChecked={settings.msgSendOnCtrlEnter == 'false'} /> Off
         </div>

         <div className="form-field">
          <p>Language</p>
          <select name="language">
            <option value="English" defaultValue={settings.language = "English"}>English</option>
            <option value="Dutch" defaultValue={settings.language = "Dutch"}>Dutch</option>
          </select>
         </div>

         <div className="form-field">
           <a className="resetBtn" onClick={() => resetSettings()}>
               Reset to defaults
           </a>
         </div>



         </form>

      </div>
    </div>

  )
}

export default Settings;
