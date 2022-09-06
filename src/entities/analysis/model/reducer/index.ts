import {createSlice} from "@reduxjs/toolkit";
import {categories, ICategory} from "@box/shared";

interface IAnalysisData {
    id: number
    analysis_id: number | null
    name: string
    price: number
    execution_period: number
    biomaterial: string
    result_type: string
    description: string
    preparation: string
    prescribing: string
    example_result_link: string
    additional_conditions: string
    research_method: string
    material_sampling: string
    material_sampling_price: number
    material_sampling_times: number
    has_stock: boolean
    stock_until: Date | null
    gradient_1: string | null
    gradient_2: string | null
    stock_image_link: string | null
    prev_stock_price: number
    sample_preparation_price: number | null
    additional_order_time: number
    available_until: Date | null
    is_main_biomaterial: boolean
    announcement: string | null
    available_at_home: boolean
    age_limit: string | null
    is_gift: boolean
}

export interface IAnalysis {
    id: number
    code: string
    show_in_menu: boolean
    category_id: number
    is_complex: boolean
    complex_id: number | null
    performed_in_all_offices: boolean
    only_in_complex: boolean
    has_sample_preparation: boolean
    created_at: Date
    deleted_at: Date | null
    analysis_data: IAnalysisData
    complex_compound: Array<IAnalysis>
    only_in_complex_with_parent: Array<IAnalysis>
    not_performed_in_offices:Array<{
        office_id: number
    }>
    sample_preparation_stack_parent: Array<IAnalysis>
}

interface IInitialState {
    analysis: IAnalysis | null,
    analysis_compound: IAnalysis | null
    analysis_list: Array<IAnalysis>,
    gifts:  Array<IAnalysis>,
    search: string,
    category: ICategory | null,
    pages_left: number,
    total: number,
    recommendations: Array<IAnalysis>
}

const initialState: IInitialState = {
    analysis: null,
    analysis_compound: null,
    analysis_list: [],
    category: categories[0],
    search: "",
    gifts:[],
    pages_left: 0,
    total: 0,
    recommendations: []
}

const analysisSlice = createSlice({
    name: "analysis",
    initialState,
    reducers: {
        setAnalysis(state, action){
          state.analysis = action.payload
        },
        setAnalysisCompound(state, action){
            state.analysis_compound = action.payload
        },
        setCategory(state, action) {
            state.category = action.payload
        },
        setAnalysisList(state, action) {
            state.analysis_list = action.payload
        },
        addToAnalysisList(state, action) {
            state.analysis_list = [...state.analysis_list, ...action.payload]
        },
        setPagesLeft(state, action){
            state.pages_left = action.payload
        },
        setGifts(state, action){
            state.gifts = action.payload
        },
        setSearch(state, action){
            state.search = action.payload
        },
        setTotal(state, action){
            state.total = action.payload
        },
        setRecommendations(state, action){
            state.recommendations = action.payload
        }
    }
})

export const analysisReducer = analysisSlice.reducer
export const {setCategory, addToAnalysisList, setAnalysisList,setPagesLeft, setGifts, setAnalysis, setAnalysisCompound, setSearch, setTotal, setRecommendations} = analysisSlice.actions
