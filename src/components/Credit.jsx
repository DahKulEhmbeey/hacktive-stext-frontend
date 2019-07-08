import React, { Component } from 'react';

const apiUrl = 'http://a045c35e.ngrok.io';

class Credit extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const bvn = document.querySelector('#bvn').value;
    const accountNumber = document.querySelector('#account-number').value;
    const amount = document.querySelector('#amount').value;
    const oversea_spending = document.querySelector('#foreign-transaction').value;
    const transaction_channel = document.querySelector('#channel').value;
    fetch(`${apiUrl}/debit`, {
      method: 'POST',
      body: JSON.stringify({bvn, amount, oversea_spending, transaction_channel})
    })
      .then(res => res.json())
      .then(res => {
        const c = res.prediction;
        console.log(c);
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-header">
          <span>Simulate Credit Transaction</span>
        </div>
        <div className=" debit-body col-sm-12 my-5">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="bvn">BVN</label>
                <input type="text" className="form-control" id="bvn" placeholder="BVN" />
              </div>
              <div className="form-group col-md-6">
                <label for="account-number">Account Number</label>
                <input type="text" className="form-control" id="account-number" placeholder="Account Number" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="amount">Amount</label>
                <input type="text" className="form-control" id="amount" placeholder="Amount" />
              </div>
              <div className="form-group col-md-6">
                <label for="foreign-transaction">Foreign Transaction</label>
                <input type="text" className="form-control" id="foreign-transaction" placeholder="Foreign Transaction" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="channel">Transaction Channel</label>
                <input type="text" className="form-control" id="channel" placeholder="Banks or Third parties" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Credit Account</button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default Credit