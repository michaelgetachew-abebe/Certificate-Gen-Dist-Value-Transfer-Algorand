import React from 'react';

// reactstrap components
import { Button, Container } from 'reactstrap';

// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          'translate3d(0,' + windowScrollTop + 'px,0)';
      };
      window.addEventListener('scroll', updateScroll);
      return function cleanup() {
        window.removeEventListener('scroll', updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url(' + require('assets/img/coursebg.jpg').default + ')',
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1>Ten Academy</h1>
            <h3>Learn and get your signed certificate</h3>
            <br />
            <Button
              href="/admin"
              className="btn-round mr-1"
              color="neutral"
              // target="_blank"
              outline
              style={{ margin: '1rem' }}
            >
              Admin
            </Button>
            <Button
              className="btn-round"
              color="neutral"
              type="button"
              outline
              href="/trainee"
              style={{ margin: '1rem' }}
            >
              Trainee
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default LandingPageHeader;
