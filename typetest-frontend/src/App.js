import './App.css';
import TypingTestComponent from './components/TypingTestComponent';
import HeaderComponent from './components/HeaderComponent';
import ListUsersComponent from './components/ListUsersComponent';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <Routes>
          <Route exact path = "/" element = {<TypingTestComponent />} />
          <Route path = "/home" element = {<TypingTestComponent />} />
          <Route path = "/users" element = {<ListUsersComponent />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
