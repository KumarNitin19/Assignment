
import { Route, Routes } from 'react-router';
import './App.css';
import Feed from './Feed/Feed';
import Footer from './Footer/Footer';
import Form from './Form/Form';
import Header from './Header/Header';
import Main from './Main';


function App() {
  return (
    <div className="App">
         <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/upload" element={<Form />} />
            <Route path="*" element={<Main />} />
         </Routes>
    </div>
  );
}

export default App;
