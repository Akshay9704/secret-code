import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './UI/components/header';
import Main from "./pages/main";
import Secret from './pages/secret';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route exact path="/secret" element={<Secret/>} />
      </Routes>
    </Router>
  );
}

export default App;
