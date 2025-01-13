
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUp from "./SignUpPage"
import HomePage from "./Home"
import InvoiceFormPage from "./InvoiceFormPage"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path = "/signup" element = {<SignUp />}/>
        <Route path = "/home" element = {<HomePage />}/>
        <Route path="/invoice" element={<InvoiceFormPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
