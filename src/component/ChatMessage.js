import React from 'react'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import '../App.css'
function ChatMessage(props) {

    const auth= firebase.auth();
    const {text,uid,photoURL} = props.message;

    //is the message sent by current user ? or received.
    const messageClass = uid===auth.currentUser.uid ? 'sent':'received';


    return( 
        <>
        <div className={`message ${messageClass}`}>
            <img src={photoURL}/>
            <p>{ text }</p>
        </div>
        </>
         
    )
}

export default ChatMessage
