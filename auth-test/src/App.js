import React, { useState, useEffect } from 'react'
import './App.css'
import { auth, generateUserDocument, signInWithGoogle } from './core/firebase'

function makeEmail() {
  var strValues = 'abcdefg12345'
  var strEmail = ''
  var strTmp
  for (var i = 0; i < 10; i++) {
    strTmp = strValues.charAt(Math.round(strValues.length * Math.random()))
    strEmail = strEmail + strTmp
  }
  strTmp = ''
  strEmail = strEmail + '@'
  for (var j = 0; j < 8; j++) {
    strTmp = strValues.charAt(Math.round(strValues.length * Math.random()))
    strEmail = strEmail + strTmp
  }
  strEmail = strEmail + '.com'
  return strEmail
}

function generatePassword() {
  var length = 8,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    retVal = ''
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal
}

function useUser(onNotify) {
  const [user, setUser] = useState({ user: null })

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth)
      setUser({ user })
      if (user) {
        onNotify('Logged in')
      } else {
        onNotify('not logged in')
      }
    })
  }, [])

  return user
}

function SignInForm({ user, email, password, onNotify }) {
  const login = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      onNotify('Error signing in with password and email!')
      console.error('Error signing in with password and email', error)
    })
  }
  return <button onClick={login}> sign in </button>
}

function SignUpForm({ user, email, password, onNotify }) {
  const signUp = async () => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      generateUserDocument(user, { displayName: `User: ${email}` })
      onNotify('Created user')
    } catch (error) {
      onNotify('Error Signing up with email and password')
    }
  }
  return (
    <>
      <button onClick={signUp}>Sign up</button>
      <button onClick={signInWithGoogle}>Login with google</button>
    </>
  )
}

function App() {
  const [email, setEmail] = useState(makeEmail())
  const [password, setPassword] = useState(generatePassword())

  useEffect(() => {
    const data = localStorage.getItem('userInfo')
    if (data) {
      const userInfo = JSON.parse(data)
      setEmail(userInfo.email)
      setPassword(userInfo.password)
    } else {
      generate()
    }
  }, [])

  const [message, setMessage] = useState('None')

  const user = useUser(setMessage)

  const generate = () => {
    const email = makeEmail()
    const password = generatePassword()

    localStorage.setItem('userInfo', JSON.stringify({ email, password }))

    setEmail(email)
    setPassword(password)
  }

  return (
    <div className="App">
      <div>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={generate}>Generate Password</button>
      <hr />
      <div>
        <pre>{JSON.stringify(user)}</pre>
      </div>
      <div>status: {message}</div>
      <div>
        {message == 'Logged in' ? (
          <button
            onClick={() => {
              auth
                .signOut()
                .then(function () {
                  // Sign-out successful.
                  console.log('sign out successful')
                })
                .catch(function (error) {
                  console.error(error)
                })
            }}
          >
            Log out
          </button>
        ) : (
          <SignInForm
            email={email}
            password={password}
            user={user}
            onNotify={setMessage}
          />
        )}
      </div>
      <div>
        <SignUpForm
          email={email}
          password={password}
          user={user}
          onNotify={setMessage}
        />
      </div>
    </div>
  )
}

export default App
