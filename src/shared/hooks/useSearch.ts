import {useMemo} from "react";
import {useTypedSelector} from "@box/app/store/hooks";

export function useSearch(){
    const search = useTypedSelector(state=>state.analysis.search)
    const searchActive = useMemo<boolean>(() => {
        if (search.trim().length > 0) {
            return true
        }
        return false
    }, [search])

    return {
        search,
        searchActive
    }
}