import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Pong from './pages/Game/Pong';
import Test from './pages/test';
import SocketPong from './pages/Game/socketpong';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='pong' element={<Pong />} />
          <Route path='test' element={<SocketPong />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;