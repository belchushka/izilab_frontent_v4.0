import React from "react";

export interface IModalContext {
    showSideMenu:(()=>void),
    hideSideMenu:(()=>void),
    showAnalysisModal: (()=>void),
    hideAnalysisModal: (()=>void),
    showAnalysisCompoundModal: (()=>void),
    hideAnalysisCompoundModal: (()=>void),
    showOfficeSelectModal: (()=>void),
    hideOfficeSelectModal: (()=>void),
    showCitySelectModal: (()=>void),
    hideCitySelectModal: (()=>void),
    showSupportModal: (()=>void),
    hideSupportModal: (()=>void),
}

export const ModalContext = React.createContext<IModalContext>(
    {
        showSideMenu:()=>null,
        hideSideMenu:()=>null,
        showAnalysisModal: ()=>null,
        hideAnalysisModal: ()=>null,
        showAnalysisCompoundModal: ()=>null,
        hideAnalysisCompoundModal: ()=>null,
        showOfficeSelectModal: ()=>null,
        hideOfficeSelectModal: ()=>null,
        showCitySelectModal: ()=>null,
        hideCitySelectModal: ()=>null,
        showSupportModal: ()=>null,
        hideSupportModal: ()=>null,
    }
)