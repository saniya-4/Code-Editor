import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomeScreen from './screens/HomeScreen';
import {PlaygroundScreen}  from "./screens/PlaygroundScreen";
import { PlaygroundProvider } from "./Providers/PlaygroundProvider";
import { ModalProvider } from "./Providers/ModalProvider";
function App() {
  return (
<PlaygroundProvider>
  <ModalProvider>
  <BrowserRouter>
    <Routes>
      <Route>
        <Route path="/" element={<HomeScreen/>}>
        </Route>
        <Route path="/playground/:fileId/:folderId" element={<PlaygroundScreen/>}>
        </Route>

      </Route>
    </Routes>

    </BrowserRouter>
  </ModalProvider>

</PlaygroundProvider>
   
  )

}

export default App;
