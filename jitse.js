import React, { useState } from 'react'
import Jitsi from 'react-jitsi'
import Loader from './components/Loader'
 
export const App = () => {
 
  const [displayName, setDisplayName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [password, setPassword] = useState('')
  const [onCall, setOnCall] = useState(false)
 
  //JITSE API
const domain = 'meet.jit.si';
const options = {
    
    devices: {
        audioInput: '<deviceLabel>',
        audioOutput: '<deviceLabel>',
        videoInput: '<deviceLabel>'
    },
    
};
const api = new JitsiMeetExternalAPI(domain, options);
 

  return onCall
    ? (<button className="btn btn-lg  btn-warning">
      Meet now
      <Jitsi
        roomName={roomName}
        displayName={displayName}
        password={password}
        loadingComponent={Loader}
        onAPILoad={JitsiMeetAPI => console.log('Good Morning everyone!')}
      /></button>)
    : (
      <>
        <h1>Crate a Meeting</h1>
        <input type='text' placeholder='Room name' value={roomName} onChange={e => setRoomName(e.target.value)} />
        <input type='text' placeholder='Your name' value={displayName} onChange={e => setDisplayName(e.target.value)} />
        <button onClick={() => setOnCall(true)}> Let&apos;s start!</button>
      </>
    )
 
}