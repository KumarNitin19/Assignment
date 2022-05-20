
import { Route, Routes } from 'react-router';
import './App.css';
import Feed from './Feed/Feed';
import Footer from './Footer/Footer';
import Form from './Form/Form';
import Header from './Header/Header';


function App() {
  return (
    <div className="App">
      <Header></Header>
         <Routes>
            <Route exact path="/" element={<Feed />} />
            <Route path="/upload" element={<Form />} />
            <Route path="*" element={<Feed />} />
         </Routes>
       <Footer></Footer>  
    </div>
  );
}

export default App;
