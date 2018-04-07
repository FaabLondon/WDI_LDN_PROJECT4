import React from 'react';

import '../scss/components/HomePage.scss';

const HomePage = () => {
  return(
    <main>
      <section className="hero is-medium homepage">
        <h1 className="title is-size-3-desktop is-size-4-touch has-text-white has-text-centered">Get unlimited clothing for spring</h1>
        <h4 className="subtitle is-size-4-desktop is-size-5-touch has-text-white has-text-centered">Refresh your wardrobe with high-end brands - Just rent them for a fraction of the retail price! </h4>
      </section>

      <section className="section">
        <h1 className="title is-size-3-desktop is-size-4-touch has-text-white has-text-centered">The Renting Revolution Is Here</h1>
        <div className="columns has-text-centered">
          <div className="column"></div>
          <div className="column is-one-third">
            <h3 className="subtitle is-size-4-desktop is-size-5-touch has-text-grey">Lorem</h3>
            <div className="content has-text-grey-light">lorem</div>
          </div>
          <div className="column"></div>
          <div className="column is-one-third">
            <h3 className="subtitle is-size-4-desktop is-size-5-touch has-text-grey">lorem</h3>
            <div className="content has-text-grey-light">lorem </div>
          </div>
          <div className="column"></div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
