import React from 'react';

// core components
import NavBar from 'components/Navbars/NavBar.js';
import LandingPageHeader from 'components/Headers/LandingPageHeader.js';
// import DemoFooter from 'components/Footers/DemoFooter.js';

function LandingPage() {
  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('profile-page');
    return function cleanup() {
      document.body.classList.remove('profile-page');
    };
  });
  return (
    <>
      <NavBar />
      <LandingPageHeader />
    </>
  );
}

export default LandingPage;
