import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import BookingFlap from './BookingFlap';
import FloatingContacts from './FloatingContacts';
import Seo from './Seo';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo />
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <BookingFlap />
      <FloatingContacts />
    </div>
  );
}
