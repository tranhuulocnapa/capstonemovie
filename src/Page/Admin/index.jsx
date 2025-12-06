import React from 'react'
import Sidebar from './_component/sidebar'
import { Outlet } from 'react-router-dom'

export default function Admin() {
    return (
        <div className="flex">

            <Sidebar />
            <Outlet />

        </div>
    )
}
