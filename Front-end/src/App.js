import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Join from './components/Join/Join';
import ChatRoom from './components/ChatRoom/ChatRoom';
import Settings from './components/Settings/Settings';

const App = () => {
  return(

    <div className="view">
      <Header />
      <BrowserRouter>
        <Route path="/" exact component={Join} />
        <Route path="/chatroom" component={ChatRoom} />
        <Route path="/settings" component={Settings} />
      </BrowserRouter>
    </div>

  );
}

export default App;
