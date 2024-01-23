import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AccountsPage from './pages/accountsPage/AccountsPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import CampaignsPage from './pages/campaignsPage/campaignsPage';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<AccountsPage/>}/>
        <Route path="profile/:id/" element={<ProfilePage />} />
        <Route path="profile/:id/campaigns/:profileId" element={<CampaignsPage />} /> 
      </Route> 
    </Routes>
    </>
  )
}

export default App as React.FC
