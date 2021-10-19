import Routes from './routes';
import './styles/global.css'

import { AuthProvider }  from './Context/AuthContext';
function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
