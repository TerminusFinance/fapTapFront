import React from 'react';
import "./App.css"
import {LoadingScreen} from "./components/screen/loading/Loading.tsx";
import {DataProvider} from "./components/otherViews/DataContext.tsx";
import {ToastProvider} from "./components/otherViews/toast/ToastContext.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {FirstStartScreen} from "./components/screen/firstStart/FirstStart.tsx";
import {FapScreen} from "./components/screen/fap/Fap.tsx";
import {ProfileScreen} from "./components/screen/profile/Profile.tsx";
import {ImproveScreen} from "./components/screen/Improve/Improve.tsx";
import {QuestsScreen} from "./components/screen/quests/Quests.tsx";
import {initSwipeBehavior, postEvent} from "@telegram-apps/sdk";
import { UserLigsScreen } from './components/screen/userLigs/UserLigs.tsx';
import { FriendsScreen } from './components/screen/friends/Friends.tsx';
import {TopScreen} from "./components/screen/top/Top.tsx";
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
                        </Routes>
                    </Router>
                </ToastProvider>
            </DataProvider>
        </div>
    );
};

export default App;
