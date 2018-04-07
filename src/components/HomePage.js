import React from 'react';

import '../scss/components/HomePage.scss';

class HomePage extends React.Component{

  state = {
    conceptPresentation: [{
      icon: '',
      subtitle: 'Fashion Freedom',
      description: 'You’ve got 100,000s of options at your fingertips. Try new things, have more fun and go for it.'
    }, {
      icon: '',
      subtitle: 'Total wardrobe Flexibility',
      description: 'Let’s be real: your style, size and budget change over time. Now, your closet can too.'
    }, {
      icon: '',
      subtitle: 'Smarter Closet',
      description: 'Imagine a closet that has exactly what you want. Takes up no space. And does your dry cleaning.'
    }, {
      icon: '',
      subtitle: 'Smaller Clothing Footprint',
      description: 'Clothes end up in the back of closets or landfills. Power the sharing economy and rent instead.'
    }]
  };

  render(){
    return(
      <main>
        <section className="hero is-medium homepage">
          <h1 className="title is-size-3-desktop is-size-4-touch has-text-white has-text-centered">Get unlimited clothing for spring</h1>
          <h4 className="subtitle is-size-4-desktop is-size-5-touch has-text-white has-text-centered">Refresh your wardrobe with high-end brands - Just rent them for a fraction of the retail price! </h4>
        </section>

        <section className="section">
          <h1 className="title is-size-3-desktop is-size-4-touch has-text-grey has-text-centered">The Renting Revolution Is Here</h1>
          <div className="columns has-text-centered is-multiline">
            {this.state.conceptPresentation.map((elt, i) =>
              <div key={i} className="column is-half">
                <h3 className="is-size-3-desktop is-size-6-touch has-text-grey">{elt.subtitle}</h3>
                <p className="content has-text-grey-light">{elt.description}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default HomePage;
