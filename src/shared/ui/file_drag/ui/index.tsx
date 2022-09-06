import React, {useCallback, useState} from 'react';
import s from "./style.module.scss"
import Cloud from "@assets/icons/cloud.svg"
import FileFilled from "@assets/icons/file_filled.svg"
import SmallCross from "@assets/icons/small_cross.svg"
import {Button, ComponentAnimateWrapper} from "@box/shared";
import {useDropzone} from "react-dropzone";


interface IFileDrag {
    onSelect: (file: any)=>void
    file: File | null
}

const check_ext = (file: any)=>{
    if (file){
        const ext = file.name.split('.').pop();
        if (['docs', 'csv', 'xlsx', 'txt', 'pdf'].includes(ext)){
           return true
        }
    }
    return false
}

const FileDragNowrap: React.FC<IFileDrag> = ({onSelect, file}) => {
    const [error, setError] = useState<boolean>(false)
    const onDrop = useCallback((acceptedFiles: any) => {
        if (acceptedFiles[0]){
            if (check_ext(acceptedFiles[0])){
                onSelect(acceptedFiles[0])
            }else{
                setError(true)
                setTimeout(()=>{
                    setError(false)
                },2000)
            }
        }
    }, [])

    const clearFile = ()=>{
        onSelect(null)
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <>
            <div {...getRootProps()} className={`${s.body} ${error && s.body_error}`}>
                <input {...getInputProps()}/>
                <img src={Cloud} alt=""/>
                <p>Перетащите Ваш файл сюда
                    <br/>
                    Или</p>
                <Button onClick={()=>null} width={200} type={"order"}>
                    <span>Выберете файл</span>
                </Button>

            </div>
            <ComponentAnimateWrapper condition={file!=null}>
                <div className={s.loaded_file}>
                    <p>Загруженный файл</p>
                    <div className={s.loaded_file_body}>
                        <div className={s.loaded_file_body_name}>
                            <img src={FileFilled} alt=""/>
                            <p>{file?.name}</p>
                        </div>
                        <div className={s.loaded_file_body_cross} onClick={clearFile}>
                            <img src={SmallCross} alt=""/>
                        </div>
                    </div>
                </div>
            </ComponentAnimateWrapper>

        </>


    );
};

export const FileDrag = React.memo(FileDragNowrap)