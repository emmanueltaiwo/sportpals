import React from 'react'
import Header from './header';
import Footer from './footer';

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return <div>
    <Header />
    {props.children}
    <Footer />
  </div>;
};

export default Layout