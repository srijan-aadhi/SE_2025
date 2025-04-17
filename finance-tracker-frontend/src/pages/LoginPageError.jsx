import { useNavigate } from 'react-router-dom';

export default function LoginPageError() {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: 'black',
      color: 'red',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        backgroundColor: '#220000',
        padding: '2rem',
        borderRadius: '10px',
        border: '1px solid red',
        textAlign: 'center',
      }}>
        <h2>❌ Login Failed</h2>
        <p>Incorrect username or password.</p>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '1rem',
            padding: '10px 20px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
