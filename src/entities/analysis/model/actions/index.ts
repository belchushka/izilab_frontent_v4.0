import {AppThunkAction} from "@box/app/store";
import {$host} from "@box/app/http";
import {
    setAnalysisList,
    addToAnalysisList,
    setPagesLeft,
    setGifts,
    setTotal,
    setRecommendations
} from "@box/entities";


export const getFromCategory: AppThunkAction = (name: string, page: number) => async (dispatch) => {
    try {
        const {data} = await $host.get("/analysis/get_from_category", {
            params: {
                category: name,
                page: page
            }
        })
        if (page == 0) {
            dispatch(setAnalysisList(data.analysis))
        } else {
            dispatch(addToAnalysisList(data.analysis))
        }
        dispatch(setPagesLeft(data.pages_left))

        return true
    } catch (e: any) {
        dispatch(setAnalysisList([]))

        return false
    }
}

export const getRecommendations: AppThunkAction = (cart) => async (dispatch) => {
    try {
        const {data} = await $host.post("/analysis/get_recommendations", {
                cart: cart,
        })
        dispatch(setRecommendations(data.recommendations))
        return true
    } catch (e: any) {
        if (e.response.status == 406) {
            dispatch(setAnalysisList([]))
        }

        return false
    }
}

export const getGifts: AppThunkAction = () => async (dispatch) => {
    try {
        const {data} = await $host.get("/analysis/get_gifts")
        dispatch(setGifts(data))
    } catch (e: any) {

    }
}

export const searchAnalysis: AppThunkAction = (query: string, page: number) => async (dispatch) => {
    try {
        const {data} = await $host.get("/analysis/get_from_query", {
            params: {
                query,
                page
            }
        })

        if (page == 0) {
            dispatch(setAnalysisList(data.analysis))
        } else {
            dispatch(addToAnalysisList(data.analysis))
        }
        dispatch(setPagesLeft(data.pages_left))
        dispatch(setTotal(data.total))
    } catch (e: any) {
        dispatch(setAnalysisList([]))
        dispatch(setTotal(0))
    }
}