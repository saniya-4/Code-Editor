import "./EditorContainer.scss"
import { useRef, useState,useContext } from "react"
import Editor from "@monaco-editor/react"
import { PlaygroundContext } from "../../Providers/PlaygroundProvider"
const editorOption={
    fonstSize:18,
    wordWrap:'on'
}
const fileExtensionMapping={
    cpp:'cpp',
    javascript:'js',
    python:'py',
    java:'java'
}
export const EditorContainer=({filderId,folderId})=>

{
    const {getDefaultCode,getLanguage}=useContext(PlaygroundContext);
    

    const [code,setCode]=useState(()=>
    {
        return getDefaultCode(filderId,folderId); 
    });
    //to not rerender the component again and again
    const codeRef=useRef();
    const [language,setLanguage]=useState(()=>
    {
       getLanguage (filderId,folderId);
    });
    const [theme,setTheme]=useState('vs-dark');
    const onChangeLanguage=(e)=>
    {
        setLanguage(e.target.value);
       
    }
    const onChangeTheme=(e)=>
    {
        setTheme(e.target.theme);
    }
    const onChangeCode=(newCode)=>
    {
       codeRef.current=newCode;
    }
    const exportCode=()=>
    {
       
        const codeValue =codeRef.current?.trim();
        if(!codeValue)
        {
            
            alert("Please Type Some Code in the editor before exporting");
            return;
        }
        const codeBlob=new Blob ([codeValue],{type:"text/plain"})
        const downloadUrl=URL.createObjectURL(codeBlob);
        const link=document.createElement("a" )
        link.href=downloadUrl;
        const fileExtension=link.download=`code.${fileExtensionMapping[language]}`
        link.click();
    } 
    
    const onUploadCode=(event)=>
    {
        const file=event.target.files[0];
        const fileType=file.type.includes("text")
        if (fileType){
         const fileReader=new FileReader();
         fileReader.readAsText(file)
         fileReader.onload=function(value){
            const importedCode=value.target.result;
            setCode(importedCode);
            codeRef.current=importedCode;

         }
        }
        else
        {
            alert("Please choose a program file");
        }
    }
    return (
        <div className="root-editor-container">
            <div className="editor-header">
            <div className="editor-left-container">
              <b className="title">{"title of the card"}</b>  
              <span className="material-icons">edit</span>
              <button>Save Code</button>
            </div>
            <div className="editor-right-container">
                    <select onChange={onChangeLanguage}  value={language}>
                    <option value="cpp">cpp</option>
                    <option value="javascript">javascript</option>
                    <option value="java">java</option>
                    <option value="python">python</option>

                    </select>
                    <select onChange={onChangeTheme} > 
                        <option value="vs-dark">vs-dark</option>
                        <option value="vs-light">vs-light</option>
                    </select>
                </div>
            </div>
            <div className="editor-body">
                <Editor 
                 height={"100%"}
                 language={language}
                 options={editorOption}
                 theme={theme}
                 onChange={onChangeCode}
                 value={code}
                />
            </div>
            <div className="editor-footer">
                <button className="btn">
                <span className="material-icons">fullscreen</span>
                <span>Full Screen</span>
                </button>
               
                <label htmlFor="import-code" className="btn">
                    <span className="material-icons">cloud_download</span>
                    <span>Import Code</span>
                </label>
                <input type="file" id="import-code" style={{display:'none'}} onChange={onUploadCode}/>
                <button className="btn" onClick={exportCode}>
                    <span className="material-icons">cloud_upload</span>
                    <span>Export Code</span>
                </button>
                <button className="btn">
                    <span className="material-icons">play_arrow</span>
                    <span>Run Code</span>
                </button>
            </div>
        </div>
    )
}//646