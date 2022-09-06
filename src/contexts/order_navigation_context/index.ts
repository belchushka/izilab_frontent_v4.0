import React from "react";

export interface IOrderNavigationContext {
    goNext: ()=>void,
    goTo: (page:number)=>void,
    goBack:()=>void
}

export const OrderNavigationContext = React.createContext<IOrderNavigationContext>({
    goBack:()=>null,
    goNext:()=>null,
    goTo:()=>null,
})