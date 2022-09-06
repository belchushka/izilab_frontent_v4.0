import React from 'react';
import {Route, Switch} from "react-router-dom";
import {Landing, Order} from "@box/pages";
import {Service, Footer, Advantages, Faq, Feedback} from "@box/widgets";


export const Navigation = () => {
    return (
                <Switch>
                    <Route path="/" exact={true} component={Landing} />
                    <Route path="/order" exact={true} component={Order} />
                    <Route path="/map" exact={true} component={()=><Service withHeader={false}/>} />
                    <Route path="/contacts" exact={true} component={()=>{
                        return <>
                            <Faq/>
                            <Footer></Footer>
                        </>
                    }} />
                    <Route path="/advantages" exact={true} component={()=>{
                        return <>
                            <Advantages></Advantages>
                            <Feedback/>

                        </>
                    }} />
                </Switch>
    );
};

