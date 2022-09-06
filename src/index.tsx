import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import {Helmet, HelmetProvider} from "react-helmet-async";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <HelmetProvider>
        <Helmet>

        </Helmet>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </HelmetProvider>
)

