import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";

import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage";

function App() {
	return (
		<>
			{/* Routes Configuration */}
			<Routes>
				{/* SSO Callback route for authentication */}
				<Route
					path='/sso-callback'
					element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
				/>
				
				{/* Authentication callback page */}
				<Route path='/auth-callback' element={<AuthCallbackPage />} />
				
				{/* Admin page route, accessible for admins */}
				<Route path='/admin' element={<AdminPage />} />

				{/* Main layout wrapper for all main pages */}
				<Route element={<MainLayout />}>
					{/* Home page route */}
					<Route path='/' element={<HomePage />} />
					
					{/* Chat page route */}
					<Route path='/chat' element={<ChatPage />} />
					
					{/* Album page route with dynamic albumId parameter */}
					<Route path='/albums/:albumId' element={<AlbumPage />} />
					
					{/* 404 page route for undefined URLs */}
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>

			{/* Toast notifications for UI feedback */}
			<Toaster />
		</>
	);
}

export default App;
