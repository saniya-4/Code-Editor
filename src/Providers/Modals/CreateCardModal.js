import "./createPlaygroundModal.scss"
import { defaultCode, PlaygroundContext } from "../PlaygroundProvider"
import {useContext} from "react"
import {ModalContext} from "../ModalProvider"
import {v4} from "uuid"
export const CreateCardModal=()=>
{
    const {closeModal,modalPayload}=useContext(ModalContext)
    const {createPlayground} =useContext(PlaygroundContext)
    const onSubmitModal=(e)=>
    {
        e.preventDefault();
        const fileName=e.target.fileName.value
        const language=e.target.language.value
         const file={
            id:v4(),
            title:fileName,
            language,
            code:defaultCode[language]
         }
         createPlayground(modalPayload,file);
         closeModal();
    }
  
    return <div className="modal-container">
        <form className="modal-body" onSubmit={onSubmitModal}>
            <span onClick={closeModal} className="material-icons close">close</span>
            <h1>Create New Playground</h1>
    <div className="item">
        <p>Enter card name</p>
        <input name="fileName" required placeholder="Enter card title"/>
     </div>
     <div className="item">
        <select name="language" required>
            <option value="cpp">Cpp</option>
            <option value="java">Java</option>
            <option value="javascript">Javascript</option>
            <option value="Python">Python</option>
        </select>
        <button type="submit">
            Create Playground
        </button>
     </div>

        </form>
    </div>
}