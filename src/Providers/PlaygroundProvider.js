 
import { createContext, useContext, useState, useEffect } from "react";
import { v4 } from 'uuid';

export const PlaygroundContext = createContext();

const initialData = [
    {
        id: v4(),
        title: 'DSA',
        files: [
            {
                id: v4(),
                title: 'index',
                code: `cout<<"Hello World";`,
                language: 'cpp',
            }
        ]
    },
    {
        id: v4(),
        title: 'Frontend',
        files: [
            {
                id: v4(),
                title: 'test',
                code: `console.log("hello frontend");`,
                language: 'javascript',
            }
        ]
    },
];

 export const defaultCode = {
    'cpp': `#include<iostream>
    using namespace std;
    int main()
    {
        cout<<"Hello world";
        return 0;
    }`,
    'javascript': `console.log("hello javascript")`,
    'python': `print("hello python")`,
    "java": `public class Main {
        public static void main(String[] args) {
            System.out.println("Hello World");
        }
    }`
};

export const PlaygroundProvider = ({ children }) => {
    const [folders, setFolders] = useState(() => {
        const localData = localStorage.getItem('data');
        if (localData) {
            try {
                return JSON.parse(localData);
            } catch (error) {
                console.error("Error parsing localStorage data:", error);
                localStorage.removeItem('data'); // Clear invalid data
            }
        }
        return initialData;
    });

    const createNewPlayground = (newPlayground) => {
        const { fileName, folderName, language } = newPlayground;
        const newFolders = [...folders];
        newFolders.push({
            id: v4(),
            title: folderName,
            files: [
                {
                    id: v4(),
                    title: fileName,
                    code: defaultCode[language],
                    language
                }
            ]
        });
        localStorage.setItem('data', JSON.stringify(newFolders));
        setFolders(newFolders);
    };
    const createNewFolder=(folderName)=>
    {
        const newFolder={
            id:v4(),
            title:folderName,
            files:[]
        }
        const allFolders=[...folders,newFolder]
        localStorage.setItem('data',JSON.stringify(allFolders));
        setFolders(allFolders);
    }
    const deleteFolder=(id)=>
    {
        const updatedFolderList=folders.filter((folderItem)=>
        {
           return folderItem.id !== id;

        })
        localStorage.setItem('data',JSON.stringify(updatedFolderList))
        setFolders(updatedFolderList);

    }
    const  editFolderTitle=(newFolderName,id)=>
    {
        const updatedFoldersList=folders.map((folderItem)=>
        {
            if(folderItem.id===id)
            {
                folderItem.title=newFolderName;
            }
            return folderItem;
        })
        localStorage.setItem('data',JSON.stringify(updatedFoldersList));
        setFolders(updatedFoldersList);
     
    }
   const editFileTitle=(newFileName,folderId,fileId)=>
   {
    const copiedfolders=[...folders];
    for(let i=0;i<folders.length;i++)
    {
        if(folderId===folders[i].id)
        {
            const files=folders[i].files
            for(let j=0;j<files.length;j++)
            {
                if(files[j].id===fileId)
                {
                    files[j].title=newFileName;
                    break;
                }
            }
            break;
        }
    }
    localStorage.setItem('data',JSON.stringify(copiedfolders));
    setFolders(copiedfolders);
   }
    const deleteFile=(folderId,fileId)=>
    {
      const copiedFolders=[...folders]
      for(let i=0;i<copiedFolders.length;i++)
      {
        if(copiedFolders[i].id===folderId)
        {
            const files=[...copiedFolders[i].files];
            copiedFolders[i].files=files.filter((file)=>
            {
                return file.id !==fileId;
            })
            break;

        }
      }
      localStorage.setItem('data',JSON.stringify(copiedFolders));
      setFolders(copiedFolders);
    }
    const createPlayground=(folderId,file)=>
    {
        const copiedFolders=[...folders]
        for(let i=0;i<copiedFolders.length;i++)
        {
            if(copiedFolders[i].id===folderId)
            {
                copiedFolders[i].files.push(file);
                break;
            }
        }
        localStorage.setItem('data',JSON.stringify(copiedFolders));
        setFolders(folders);
    }
    useEffect(() => {
        if (!localStorage.getItem('data')) {
            // Reset the local storage only if there is no data already present
            localStorage.setItem('data', JSON.stringify(folders));
        }
    }, [folders]);
    const getDefaultCode=(filderId,folderId)=>
    {
        for(let i=0;i<folders.length;i++)
        {
            if (folders[i].id===folderId)
            {
                for(let j=0;j<folders[i].files.length;j++)
                {
                    const currentFile=folders[i].files[j]
                    if(filderId===currentFile.id)
                    {
                        return currentFile.code;
                    } 
                }
            }
        }

    }
    const getLanguage=(filderId,folderId)=>
        {
            for(let i=0;i<folders.length;i++)
            {
                if (folders[i].id===folderId)
                {
                    for(let j=0;j<folders[i].files.length;j++)
                    {
                        const currentFile=folders[i].files[j]
                        if(filderId===folders[i].files[j].id)
                        {
                            return currentFile.language;
                        }
                    }
                }
            }
    
        }

    const playgroundFeatures = {
        folders,
        createNewPlayground,
        createNewFolder,
        deleteFolder,
        editFolderTitle,
        editFileTitle,
        deleteFile,
        createPlayground,
        getDefaultCode,
        getLanguage
        
    };

    return (
        <PlaygroundContext.Provider value={playgroundFeatures}>
            {children}
        </PlaygroundContext.Provider>
    );
};