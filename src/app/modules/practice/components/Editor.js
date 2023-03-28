import React, { useRef, useEffect, useState } from 'react';
import { CKEditor } from 'ckeditor4-react';
import { getKBById } from '../redux/Crud';
import { useParams } from "react-router-dom";


const Editor = ({ onChangeText, editValue = '' }) => {
    const [data, setDataa] = useState()
    const { id } = useParams()

    /**
    * @Author 
    * @Method toFetchEditData
    * @Purpose To fetch data of kb by id
    * @param {} 
    * @Since Oct 2022
   */

    const toFetchEditData = () => {
        getKBById(id)
            .then((res) => {
                setDataa(res.data.items.result[0].body)
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        if (id !== undefined) { toFetchEditData() }
    }, [])


    const config = {};
    const onChangeEventForEditor = (e) => {
        onChangeText(e.editor.getData());
    }

    const editorRef = useRef(CKEditor.instance)
    const [isEditorUpdate, setIsEditorUpdate] = useState(false)

    useEffect(() => {
        if(id && id !== undefined){
        if (editorRef.current) {
            editorRef.current.setData(data)
        } }

    }, [isEditorUpdate])

    const editorLoadedHandler = (e) => {
        editorRef.current = e.editor;
        setIsEditorUpdate(true)
    }


    return (
        <div className="editor">
            <CKEditor debug={true}
                onInstanceReady={editorLoadedHandler}
                initData={editValue}
                onChange={onChangeEventForEditor}
                config={{
                    fillEmptyBlocks:false,
                    entities:false,
                    basicEntities:false,
                    extraPlugins: 'uploadimage',
                    filebrowserUploadMethod: 'form-data',
                    filebrowserUploadUrl: 'https://kb.devitsandbox.com/node/api/v1/kb/imageupload',
                }}
            />
        </div>
    )
}

export default Editor;
                    
                    