import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LoginPageError from './pages/LoginPageError';
import CreateAccount from './pages/CreateAccount';
import CreateAccountError from './pages/CreateAccountError';
import FindAccountPage from './pages/FindAccountPage';
import FindAccountPageError from './pages/FindAccountPageError';
import LogoutPage from './pages/LogoutPage';
import LogoutPageMessage from './pages/LogoutPageMessage';

function App() {
  return (
    <div style={{ backgroundColor: 'black', color: 'limegreen', minHeight: '100vh', padding: '2rem' }}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login-error" element={<LoginPageError />} />
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/create-error" element={<CreateAccountError />} />
          <Route path="/find" element={<FindAccountPage />} />
          <Route path="/find-error" element={<FindAccountPageError />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/logout-message" element={<LogoutPageMessage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
