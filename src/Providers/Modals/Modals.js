import {useContext} from "react";
import { CreateFolderModal } from "./CreateFolderModal";
import {modalConstants,ModalContext} from "../ModalProvider"
import {CreatePlaygroundModal} from "./CreatePlaygroundModal";
import { UpdateFileTitle } from "./UpdateFileTitleModal";
import { UpdateFolderTitle } from "./UpdateFolderTitle";
import { CreateCardModal } from "./CreateCardModal";

export const Modal=()=>
{
    const modalFeatures=useContext(ModalContext);
    console.log(modalFeatures.activeModal);
    return <>
    {modalFeatures.activeModal===modalConstants.CREATE_PLAYGROUND && <CreatePlaygroundModal/>}
    {modalFeatures.activeModal===modalConstants.CREATE_FOLDER && <CreateFolderModal/>}
     {modalFeatures.activeModal===modalConstants.UPDATE_FOLDER_TITLE && <UpdateFolderTitle/> }
     {modalFeatures.activeModal===modalConstants.UPDATE_FILE_TITLE &&<UpdateFileTitle/>}
     {modalFeatures.activeModal===modalConstants.CREATE_CARD  && <CreateCardModal/>}
    </>
}