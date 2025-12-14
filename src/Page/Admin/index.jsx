import React from 'react'
import Sidebar from './_component/sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Admin() {
    const authslice = useSelector((state) => state.authslice)
    const { data } = authslice

    if (!data) return <Navigate to="/auth" replace />

    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            {/* Content bên phải */}
            <div className="flex-1 flex justify-center p-8">

                {/* Outlet render AddUser ở đây */}
                <Outlet />

            </div>

        </div>
    )
}
