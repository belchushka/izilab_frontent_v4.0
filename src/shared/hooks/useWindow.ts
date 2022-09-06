import {useCallback} from "react";

export function useWindow(){
    const body = document.body
    const cutContent = useCallback(()=>{
        body.style.height = `${window.innerHeight}px`
        body.style.overflow = "hidden"
    },[])
    const showContent = useCallback(()=>{
        body.style.height = "auto"
        body.style.overflowY = "visible"
        body.style.overflowX = "hidden"
    },[])
    return {
        cutContent,
        showContent
    }
}