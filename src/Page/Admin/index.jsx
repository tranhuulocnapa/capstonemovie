import React from 'react'
import Sidebar from './_component/sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function Admin() {
    const authslice = useSelector((state) => state.authslice)
    const { data } = authslice

    if (!data) return <Navigate to="/auth" />



    return (
        <div className="flex">

            <Sidebar />
            <Outlet />

        </div>
    )
}
