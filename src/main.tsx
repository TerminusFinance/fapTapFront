import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {SDKProvider} from "@telegram-apps/sdk-react";
import {TonConnectUIProvider} from "@tonconnect/ui-react";
import './core/translations/i18n.ts';

const manifestUrl = 'https://wm-mariupol.com/api/manifest';


createRoot(document.getElementById('root')!).render(
    <SDKProvider acceptCustomStyles debug>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </TonConnectUIProvider>
    </SDKProvider>
)
