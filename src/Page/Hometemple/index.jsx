import { Outlet } from 'react-router-dom'
import Header from './_component/header'
import Footer from './_component/footer'

export default function Hometemple() {
    return (
        <div>
            <Header />

            <Outlet />

            <Footer />

        </div>
    )
}
