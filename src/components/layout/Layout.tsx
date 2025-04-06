
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 pt-4 px-4 max-w-7xl w-full mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
