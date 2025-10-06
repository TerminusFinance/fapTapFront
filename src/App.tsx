import React, { Suspense, lazy } from 'react';
import "./App.css"
import {LoadingScreen} from "./components/screen/loading/Loading.tsx";
import {DataProvider} from "./components/otherViews/DataContext.tsx";
import {ToastProvider} from "./components/otherViews/toast/ToastContext.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {initSwipeBehavior, postEvent} from "@telegram-apps/sdk";

// Lazy load components for code splitting
const FirstStartScreen = lazy(() => import("./components/screen/firstStart/FirstStart.tsx").then(module => ({ default: module.FirstStartScreen })));
const FapScreen = lazy(() => import("./components/screen/fap/Fap.tsx").then(module => ({ default: module.FapScreen })));
const ProfileScreen = lazy(() => import("./components/screen/profile/Profile.tsx").then(module => ({ default: module.ProfileScreen })));
const ImproveScreen = lazy(() => import("./components/screen/Improve/Improve.tsx").then(module => ({ default: module.ImproveScreen })));
const QuestsScreen = lazy(() => import("./components/screen/quests/Quests.tsx").then(module => ({ default: module.QuestsScreen })));
const UserLigsScreen = lazy(() => import('./components/screen/userLigs/UserLigs.tsx').then(module => ({ default: module.UserLigsScreen })));
const FriendsScreen = lazy(() => import('./components/screen/friends/Friends.tsx').then(module => ({ default: module.FriendsScreen })));
const TopScreen = lazy(() => import("./components/screen/top/Top.tsx").then(module => ({ default: module.TopScreen })));
const AirDrop = lazy(() => import("./components/screen/airDrop/AirDrop.tsx"));
const ClanMore = lazy(() => import("./components/screen/top/clanMore/ClanMore.tsx").then(module => ({ default: module.ClanMore })));

// Loading fallback component
const LoadingFallback = () => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#121215',
        color: '#fff'
    }}>
        Loading...
    </div>
);
const App: React.FC = () => {



    try {
        postEvent('web_app_expand');
        // const [miniApp] = initMiniApp();
        // miniApp.setHeaderColor('#121215');
        try {
            const [swipeBehavior] = initSwipeBehavior();
            swipeBehavior.disableVerticalSwipe();
        } catch (e) {
            console.log("change behavor - err", e)
        }
    }catch (e) {
        console.log("change theme - err", e)
    }

    return (
        <div className="app-container" >
            <DataProvider>
                <ToastProvider>
                    <Router >
                        <Suspense fallback={<LoadingFallback />}>
                            <Routes>
                                <Route path="/" element={<LoadingScreen />} />
                                <Route path="/start" element={<FirstStartScreen />} />
                                <Route path="/fap" element={<FapScreen />} />
                                <Route path="/profile" element={<ProfileScreen />} />
                                <Route path="/improve" element={<ImproveScreen />} />
                                <Route path="/quests" element={<QuestsScreen />} />
                                <Route path="/userLigs" element={<UserLigsScreen/>}/>
                                <Route path="/friends" element={<FriendsScreen/>}/>
                                <Route path="/top" element={<TopScreen/>}/>
                                <Route path="/airDrop" element={<AirDrop/>}/>
                                <Route path="/clanMore" element={<ClanMore/>}/>
                            </Routes>
                        </Suspense>
                    </Router>
                </ToastProvider>
            </DataProvider>
        </div>
    );
};

export default App;
