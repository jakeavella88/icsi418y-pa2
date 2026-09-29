import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'


function App() {
  const [currentView, setCurrentView] = useState('login')


  return (
    <>
      <main className="app-container"> 
      <nav className="auth-nav">
        <button 
          className={currentView === 'login' ? 'active' : ''} 
          onClick={() => setCurrentView('login')}
        >
          Login
        </button>
        <button 
          className={currentView === 'signup' ? 'active' : ''} 
          onClick={() => setCurrentView('signup')}
        >
          Sign Up
        </button>
      </nav>

      <section className="auth-content">
        {currentView === 'login' && <Login />}
        {currentView === 'signup' && <Signup />}
      </section>
      </main>
    </>
  )
}

export default App
