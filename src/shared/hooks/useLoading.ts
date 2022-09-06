import {useCallback, useState} from "react";

type useLoadingType = {
    loading: boolean
    startLoading: ()=>void
    stopLoading:()=>void
}

export function useLoading():useLoadingType {
    const [loading, setLoading] = useState<boolean>(false)

    const startLoading = useCallback(()=>{
        setLoading(true)
    },[])

    const stopLoading = useCallback(()=>{
        setLoading(false)
    },[])

    return {
        loading,
        startLoading,
        stopLoading
    }
}