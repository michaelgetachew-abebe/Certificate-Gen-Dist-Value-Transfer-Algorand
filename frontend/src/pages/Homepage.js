import React from 'react';

// core components
//import NavBar from 'components/Navbars/NavBar.js';
//import LandingPageHeader from 'components/Headers/LandingPageHeader.js';

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
      <h1>10 ACADEMY CERTIFICATION PLATFORM</h1>
      <h3>Secure and Smart Certificate Generation, Distribution and Value Transfer Patform</h3>
      <button href="/admin" className="btn-round mr-1" color="neutral" outline style={{ margin: '1rem' }}>Admin Panel</button>
        <button className="btn-round" color="neutral" type="button" outline href="/trainee" style={{ margin: '1rem' }}>Trainee</button>
    </>
  );
}

export default LandingPage;