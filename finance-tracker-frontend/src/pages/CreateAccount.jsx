import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();

    if (!email || !password || !confirm) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirm) {
      navigate('/create-error');
    } else {
      alert('Account created!');
      navigate('/');
    }
  };

  return (
    <div style={{
      backgroundColor: 'black',
      color: 'limegreen',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
    }}>
      <form onSubmit={handleCreate} style={{
        backgroundColor: '#111',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 0 10px limegreen',
        minWidth: '300px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Create Account</h2>

        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          placeholder="Enter email"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          placeholder="Enter password"
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={inputStyle}
          placeholder="Confirm password"
        />

        <button type="submit" style={buttonStyle}>Create</button>
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
