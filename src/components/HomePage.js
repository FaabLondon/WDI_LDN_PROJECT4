import React from 'react';

import '../scss/components/HomePage.scss';

class HomePage extends React.Component{

  state = {
    conceptPresentation: [{
      icon: '',
      subtitle: 'Fashion Freedom',
      description: 'You’ve got hundreds of options at your fingertips. Try new things, have more fun and go for it.'
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
          <h1 className="title is-size-1-desktop is-size-4-touch has-text-black has-text-centered">Refresh your wardrobe for spring</h1>
          <h4 className="subtitle is-size-4-desktop is-size-5-touch has-text-black has-text-centered">Choose from a selection of high-end brands - Just rent your favourite pieces for a fraction of the retail price! </h4>
        </section>

        <section className="section">
          <h2 className="title is-size-2-desktop is-size-4-touch has-text-grey-dark has-text-centered">The Renting Revolution Is Here</h2>
          <div className="columns has-text-centered is-multiline">
            {this.state.conceptPresentation.map((elt, i) =>
              <div key={i} className="column is-half">
                <h3 className="is-size-3-desktop is-size-6-touch has-text-grey-dark">{elt.subtitle}</h3>
                <p className="content has-text-grey-dark">{elt.description}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default HomePage;
