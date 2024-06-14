import './App.css';
import Main from './components/Main';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import {useSelector} from "react-redux";
import { selectValue } from './features/common/commonSlice';
import SignIn from './components/SignIn';
import SellerSignIn from './components/SellerSignIn';
function App() {
  const {register,signin,sellersignin} = useSelector(selectValue);

  if (register){
    return(
      <SignUp/>
    )
  }
  if (signin){
    return(
      <SignIn/>
    )
  }
  if (sellersignin){
    return(
      <SellerSignIn/>
    )
  }
  return (
    <>
      <Navbar/>
      <Main/>
    </>
  );
}

export default App;
