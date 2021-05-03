import React from 'react'; 
import './App.css';


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth'
import ChatRoom from './component/ChatRoom';
import SignIn from './component/SignIn';
import SignOut from './component/SignOut';

firebase.initializeApp({
  //my config
  apiKey: "AIzaSyD28-2k8J5Q7vc1f8VAPu-3NiuWzncJwzE",
  authDomain: "react-chatapp-35571.firebaseapp.com",
  projectId: "react-chatapp-35571",
  storageBucket: "react-chatapp-35571.appspot.com",
  messagingSenderId: "353438515673",
  appId: "1:353438515673:web:d2768968e68964f32959c8"  
})

const auth = firebase.auth();

function App() {

  //useAuthState returns a user OBJ if the user is signed in, else return null.
  const[user] =useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat Room</h1>
        <SignOut/>
      </header>
        <section>
          {user ? <ChatRoom /> : <SignIn/>}
        </section>
      
      
    </div>
  );
}

export default App;
