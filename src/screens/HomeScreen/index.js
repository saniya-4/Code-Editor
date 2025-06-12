import {useContext } from "react";
import { ModalContext } from "../../Providers/ModalProvider";
import { Modal } from "../../Providers/Modals/Modals";
import  "./index.scss";
import { RightComponent } from "./RightComponent";
 const HomeScreen=()=>
{
  const modalFeatures=useContext(ModalContext);
  const openCreatePlaygroundModal=()=>
  {
     modalFeatures.openModal("CREATE_PLAYGROUND");
  }
    return (
        <div className="home-container">
            <div className="left-container">
          
              <div className="items-container">
              <img src="code.png" height="200px"/>
              <h1>Schoolpad</h1>
              <h1>Code.Compile.Debug</h1>
              <button onClick={openCreatePlaygroundModal}>
                <span className="material-icons">
                   add 
                </span>
                <span>Create Playground</span>
               </button>
              </div>
              
            </div>
           <RightComponent/>
          <Modal/> 
        </div>

    );
}
export default HomeScreen;