 import {useParams} from "react-router-dom"
 import { EditorContainer  } from "./EditroContainer"
 import "./index.scss"
import { EditorConatiner } from "./EditroContainer"
import { useState ,useRef} from "react"
 export const PlaygroundScreen=()=>
{
    const[input,setInput]=useState('');
    const[output,setOutput] =useState('');
    const importInput=(e)=>
    {
        const file=e.target.files[0];
        const fileType=file.type.includes("text")
        if (fileType){
         const fileReader=new FileReader();
         fileReader.readAsText(file);
         fileReader.onload=(e)=>
         {
           setInput(e.target.result);


         }

         }
    
        else
        {
            alert("Please choose a program file");
        }
       

    }
    const exportOutput=()=>
    {
        const outputValue=output.trim();
        if(!outputValue)
        {
            alert("Output is empty");
            return ;
        }
        const blob=new Blob([outputValue],{type:"text/plain"})
        const url=URL.createObjectURL(blob);
        const link=document.createElement("a");
        link.href=url;
        link.download=`output.txt`;
        link.click();
    }

    const params=useParams();
    const {filderId,folderId}=params;
    return (<div className="playground-container">
        <div className="header-container">
            <img src="/code.png" className="logo" height="100px" />
        </div>
        <div className="content-container">
        <div className="editor-container">
        <EditorContainer fileId={filderId} folderId={folderId}  /></div>  
        <div className="input-output-container">
            <div className="input-header">
            <b>Input:</b>
            <label htmlFor="input" className="icon-conatiner">
            <span className="material-icons">cloud_download</span>
            <span className="">Import Input</span>
            </label>
            <input type="file" id="input" style={{display:'none'}}
            onChange={importInput}/>
            </div>
            <textarea value={input} onChange={(e)=>setInput(e.target.value)}></textarea>
        </div>
        <div className="input-output-container">
            <div className="input-header">
                <b>Output:</b>
               
                <label htmlFor="input" className="icon-conatiner" onClick={exportOutput}>
            <span className="material-icons">cloud_upload</span>
            <span className="">Export Output</span>
            </label>
            </div>
            <textarea  value={output} onChange={(e)=>setOutput(e.target.value)
            }>

            </textarea>
        </div>
        </div>
       

    </div>
    )
  
}
