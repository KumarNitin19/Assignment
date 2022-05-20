
import { Route, Routes } from 'react-router';
import './App.css';
import Feed from './Feed/Feed';
import Form from './Form/Form';


function App() {
  return (
    <div className="App">
         <Routes>
            <Route exact path="/" element={<Feed />} />
            <Route path="/upload" element={<Form />} />
            <Route path="*" element={<Feed />} />
         </Routes>
    </div>
  );
}

export default App;
