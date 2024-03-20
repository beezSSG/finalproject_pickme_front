import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './pages/main/Header';
import Footer from './pages/main/Footer';
import Home from './pages/main/Home';
import Login from './pages/login/Login';
import Logingoogle from './pages/login/Logingoogle';
import Loginkakao from './pages/login/Loginkakao';
import Loginnaver from './pages/login/Loginnaver';

function App() {

  return (
    <div>
      <header className='py-10'>
        <Header />
      </header>

      <BrowserRouter>
        <nav className='navbar navbar-expand-md navbar-dark bg-info sticky-top'>
          <div className='container'>
            <div className="collapse navbar-collapse" id="navbar-content">
              <ul className="navbar-nav mr-auto">
                <li className='nav-item'>
                  <Link className='nav-link' to="/">Home</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>
          <div className='py-4'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logingoogle' element={<Logingoogle />} />
              <Route path='/loginkakao' element={<Loginkakao />} />
              <Route path='/loginnaver' element={<Loginnaver />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>

      <footer className='py-4 bg-info text-light'>
        <Footer />
      </footer>
    </div>
  );
}

export default App;