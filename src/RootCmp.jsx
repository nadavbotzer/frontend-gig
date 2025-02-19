import React from 'react'
import { Routes, Route } from 'react-router'
import { useLocation } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'
import { UserDetails } from './pages/UserDetails'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { GigDetails } from './pages/GigDetails.jsx'
import { GigIndex } from './pages/GigIndex.jsx'
import { Checkout } from './pages/Checkout'

import { AppHeader } from './cmps/AppHeader'
import { TagsHeader } from './cmps/TagsHeader.jsx'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'

import { ScrollProvider } from '../src/cmps/ScrollProvider'
import { SellerDashboard } from './pages/SellerDashboard.jsx'

export function RootCmp() {
    const { pathname } = useLocation()
    return (
        <ScrollProvider>
            <div className="main-container">

                <AppHeader />
                {(pathname === "/" || pathname === "/gig/") && <TagsHeader />}
                <UserMsg />

                <main>
                    <Routes>
                        <Route path="" element={<HomePage />} />
                        <Route path="about" element={<AboutUs />}>
                            <Route path="team" element={<AboutTeam />} />
                            <Route path="vision" element={<AboutVision />} />
                        </Route>
                        <Route path="gig" element={<GigIndex />} />
                        <Route path="gig/:gigId" element={<GigDetails />} />
                        <Route path="user/:id" element={<UserDetails />} />
                        <Route path="review" element={<ReviewIndex />} />
                        <Route path="gig/:gigId/checkout" element={<Checkout />} />
                        <Route path="dashboard" element={<SellerDashboard />} />


                        <Route path="chat" element={<ChatApp />} />
                        <Route path="admin" element={<AdminIndex />} />
                        <Route path="login" element={<LoginSignup />}>
                            <Route index element={<Login />} />
                            <Route path="signup" element={<Signup />} />
                        </Route>
                    </Routes>
                </main>
                <AppFooter />

            </div>
        </ScrollProvider>
    )
}