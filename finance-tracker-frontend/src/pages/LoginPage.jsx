import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => 
    {
    e.preventDefault();

    // Simple authentication check - in a real application, this would connect to a backend API
    // Currently using hardcoded credentials (admin/1234) for demonstration purposes
    if (email === 'admin' && password === '1234')
    {
      alert('Login successful!');
    } else 
    {
      navigate('/login-error');
    }
  };

  return (
    <div style={{
      
      // THIS IS THE BACKGROUND COLOR, before it was backgroundColor: 'BLACK'
      backgroundColor: '#EDF2F7',
      color: 'limegreen',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
    }}>
      <form onSubmit={handleLogin} style={{
        backgroundColor: '#111',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 0 10px limegreen',
        minWidth: '300px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>

        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          placeholder="Enter username"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          placeholder="Enter password"
        />

        <button type="submit" style={buttonStyle}>Login</button>








        {/*  THIS IS THE CREATE NEW ACCOUNT BUTTON */}
        <button
          type="button"
          onClick={() => navigate('/create')}
          style={{ ...buttonStyle, marginTop: '1rem', backgroundColor: '#333', color: 'limegreen' }}
        >
          Create New Account
        </button>
      </form>
    </div>
  );
}











const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0 20px 0',
  borderRadius: '5px',
  border: '1px solid limegreen',
  backgroundColor: '#000',
  color: 'limegreen',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: 'limegreen',
  color: 'black',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};
