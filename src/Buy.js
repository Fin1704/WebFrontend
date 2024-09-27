import logo from './logo.svg';
import './App.css';
import WithSubnavigation from './component/Navbar';
import WithBackgroundImage from './component/ImageScrollBar';

function App() {
  return (
    <div className="App">
      <WithSubnavigation></WithSubnavigation>
      <WithBackgroundImage></WithBackgroundImage>
      
    </div>
  );
}

export default App;
