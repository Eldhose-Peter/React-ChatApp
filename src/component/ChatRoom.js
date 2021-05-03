import React ,{useState,useRef}from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';

import '../App.css'

function ChatRoom() {

    const dummy=useRef()

    const auth = firebase.auth();
    const firestore = firebase.firestore();
    const messagesRef = firestore.collection('messages');  
    const query = messagesRef.orderBy('createdAt').limit(25);
    
    const [messages] = useCollectionData(query, { idField: 'id' });

    const[formValue,setFormValue]=useState('');

    const sendMessage = async(e)=>{

        //to prevent the page from refreshing on clicking Submit.
        e.preventDefault();

        const {uid,photoURL}=auth.currentUser;

        //create a new document in firestore
        await messagesRef.add({

            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });

        //reset the form after sending the mesage
        setFormValue('');

        //scroll down to latest message
        dummy.current.scrollIntoView({behavior:'smooth'})


    }
    

    return (
        <>
            
            <main>
                { messages && messages.map(msg => <ChatMessage key ={msg.id} message={msg} /> )}

                <span ref={dummy}></span>
            </main>

           

            <form onSubmit={sendMessage}>
                <input value={formValue} 
                onChange={(event)=>setFormValue(event.target.value)}
                placeholder='Type a message'/>
                <button type='submit'>send</button>
            </form>

        </>
    )
}

export default ChatRoom
