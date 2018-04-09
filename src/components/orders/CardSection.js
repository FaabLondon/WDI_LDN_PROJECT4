import React from 'react';
import {CardElement} from 'react-stripe-elements';
import '../../scss/components/cardSection.scss';

const handleChange = change => {
  //console.log('[change]', change);
};


//test cards for stripe for UK
// 4000 0082 6000 0000	tok_gb	United Kingdom (GB)	Visa
// 4000 0582 6000 0005	tok_gb_debit	United Kingdom (GB)	Visa (debit)

class CardSection extends React.Component {
  render() {
    return (
      <label className="labelCardForm">
        Card details
        <CardElement
          onChange={handleChange}
          style={{base: {fontSize: '18px'}}} />
        {this.props.errorPayment && <small>{this.props.errorPayment}</small>}
      </label>
    );
  }
}

export default CardSection;
