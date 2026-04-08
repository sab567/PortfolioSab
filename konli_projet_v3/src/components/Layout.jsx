import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';


/*
  Layout principal du site.
*/
const Layout = () => {
    return (
        <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <Footer />

            {/* ScrollRestoration remonte en haut de page lors d'un changement de route */}
            <ScrollRestoration />
        </div>
    );
};

export default Layout;
