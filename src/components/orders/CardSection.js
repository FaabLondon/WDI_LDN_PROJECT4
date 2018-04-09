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

{/* <div className="column is-half">
  <h5 className="subtitle is-size-5 is-italic"><strong>3) Please enter your payment information</strong></h5>
  <div className="field">
    <label className="label" htmlFor="creditCardNumber">Credit card number</label>
    <div className="control has-icons-left">
      <input
        className="input"
        placeholder="Enter your credit card number"
        name="creditCardNumber"
        onChange={this.handleChange}
        maxLength="12"
        minLength="12"
        required
      />
      <span className="icon is-small is-left"><i className="far fa-credit-card"></i></span>
    </div>
  </div>
  <div className="field">
    <label className="label" htmlFor="nameCard">Name on the card</label>
    <div className="control has-icons-left">
      <input
        className="input"
        placeholder="Enter your name as written on your card"
        name="nameCard"
        onChange={this.handleChange}
        required
      />
      <span className="icon is-small is-left"><i className="far fa-credit-card"></i></span>
    </div>
  </div>
  <div className="field expCard">
    <label className="label" htmlFor="expCard">Card expiry</label>
    <div className="control has-icons-left">
      <input
        className="input"
        placeholder="mm/yy"
        name="expCard"
        onChange={this.handleChange}
        required
      />
      <span className="icon is-small is-left"><i className="far fa-credit-card"></i></span>
    </div>
  </div>
  <div className="field">
    <label className="label" htmlFor="ccvCard">ccv</label>
    <div className="control has-icons-left">
      <input
        className="input"
        placeholder="ccv"
        name="ccvCard"
        onChange={this.handleChange}
        required
      />
      <span className="icon is-small is-left"><i className="far fa-credit-card"></i></span>
    </div>
  </div>
</div> */}
