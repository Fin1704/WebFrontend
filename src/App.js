import logo from './logo.svg';
import './App.css';
import WithSubnavigation from './component/Navbar';
import WithBackgroundImage from './component/ImageScrollBar';
import { Box } from '@chakra-ui/react';
import { usePleaseStay } from 'react-use-please-stay';
function App() {
  usePleaseStay({
    titles: [
      "VnbNode ✉",
      "VnbNode"
    ],
    interval: 1000,
    animationType: Animation.LOOP,
})
  return (
    <Box className="App" height={"100vh"} background={"#020717"}>
      <WithSubnavigation></WithSubnavigation>
      <WithBackgroundImage></WithBackgroundImage>
      
    </Box>
  );
}

export default App;
