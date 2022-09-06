import React, {useCallback, useEffect, useState} from 'react';
import {IconInput, useDebounce, useEffectAfterMount} from "@box/shared";
import SearchIcon from "@assets/icons/search.svg"
import {useTypedDispatch} from "@box/app/store/hooks";
import {setSearch} from "@box/entities";

interface ISearch {
    className?: string,
    containerClassName?: string
}

export const Search: React.FC<ISearch> = ({className, containerClassName}) => {
    const [value, setValue] = useState<string>("")
    const searchInputDebounce = useDebounce<string>(value, 200)
    const dispatch = useTypedDispatch()
    const onInput = useCallback((val: string)=>{
        setValue(val)
    },[])
    useEffectAfterMount(()=>{
        dispatch(setSearch(searchInputDebounce))
    }, [searchInputDebounce])

    useEffect(()=>{
       return ()=>{
           dispatch(setSearch(""))
       }
    },[])
    return (
        <IconInput value={value} containerClassName={containerClassName}
                   className={className} icon={SearchIcon}
                   onInput={onInput}
                   placeholder={"Введите название анализа"}/>
    );
};
