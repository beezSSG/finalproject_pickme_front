import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './pages/main/Header';
import Footer from './pages/main/Footer';
import Home from './pages/main/Home';
import Login from './pages/login/Login';
import Polist from './pages/ceo/Polist';
import ManagerMain from './pages/manager/ManagerMain';
import Event from './pages/manager/Event';
import EventDetail from './pages/manager/EventDetail';
import EventCreate from './pages/manager/EventCreate';

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
              <Route path='/ceo' element={<Polist />} />
              <Route path='/manager' element={<ManagerMain />} />
              <Route path='/event' element={<Event />} />
              <Route path='/eventdetail/:id' element={<EventDetail />} />
              <Route path='/eventcreate' element={<EventCreate />} />
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