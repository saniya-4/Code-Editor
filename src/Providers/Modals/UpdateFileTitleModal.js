import {useContext} from "react";
import { Modal } from "./Modals";
import { ModalContext } from "../ModalProvider";
import { createFolderStyles } from "./CreateFolderModal";
import "./createPlaygroundModal.scss";
import { PlaygroundContext } from "../PlaygroundProvider";
export const UpdateFileTitle=()=>
{
    const {closeModal,modalPayload}=useContext(ModalContext);
    const {editFileTitle}=useContext(PlaygroundContext)
    const onSubmitModal=(e)=>
    {
        e.preventDefault();
        const fileName=e.target.fileName.value;
        editFileTitle(fileName, modalPayload.folderId, modalPayload.fileId);
        closeModal();
         

    }
     return <div className="modal-container">
        <form  onSubmit={onSubmitModal} className="modal-body">
            <span onClick={closeModal} className="material-icons close">close</span>
            <h1>Update Card Title</h1>
            <div style={createFolderStyles.inputContainer}>
        <input name="fileName" style={createFolderStyles.input} placeholder="Enter Folder Name"/>
        <button style={createFolderStyles.btn} type="submit">Create Folder</button>
        </div> 

        </form>
     </div>
}
