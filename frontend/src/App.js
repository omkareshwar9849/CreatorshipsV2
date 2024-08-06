import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/MainSectionComponents/Header';
import Main from './components/Main';
import Footer from './components/MainSectionComponents/Footer';
import Signin from './components/Singnin';
import Signup from './components/Signup';
import Alert from './components/Alert';
import BusinessForm from './components/BusinessForm';
import ContactForm from './components/ContactForm';
import CreatorForm from './components/CreatorForm';
import BusinessDetails from './components/BusinessDetails';
import CreatorDetails from './components/CreatorDetails';
import About from './components/About';
import CompanyListings from './components/CompanyListings';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <Router>
      <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <Header />
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/CreatorshipsV2" element={<Main />} />
          <Route path="/signin" element={<Signin showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route path="/submit-business" element={<BusinessForm showAlert={showAlert} />} />
          <Route path="/submit-creator" element={<CreatorForm showAlert={showAlert} />} />
          <Route path="/contact" element={<ContactForm showAlert={showAlert} />} />
          <Route path="/businesses" element={<BusinessDetails showAlert={showAlert} />} />
          <Route path="/creators" element={<CreatorDetails showAlert={showAlert} />} />
          <Route path="/about" element={<About showAlert={showAlert} />} />
          <Route path="/other-businesses" element={<CompanyListings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
