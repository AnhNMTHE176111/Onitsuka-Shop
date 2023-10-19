import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />
              <Banner />
              <HomePage />
              <Footer />
            </>
          } />
        <Route
          path='/home'
          element={
            <>
              <Header />
              <Banner />
              <HomePage />
              <Footer />
            </>
          } />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
