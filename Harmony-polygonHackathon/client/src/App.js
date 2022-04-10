import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChamaContract from "./contracts/Campaign.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import Home from "./components/home";
import CampaignDetails from "./components/CampaignDetails";
import RecipientsPage from "./components/AvailableChamas";
import Account from "./components/Account";
import { Spinner } from "react-bootstrap";

class App extends Component {
  state = {
    chamCount: 0,
    web3: null,
    accounts: null,
    contract: null,
    chms: [],
    reqCount: 0,
    loansReq: [],
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ChamaContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ChamaContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    const chamCt = await contract.methods.chamaCount();
    const chamas = await contract.methods.chamas(1);
    const requestCt = await contract.methods.requestCount();

    let loanReq = [];
    for (let i = 0; i <= requestCt; i++) {
      const loansRequest = await contract.methods.requests(i);
      if (!loansRequest.complete) {
        loanReq.push({
          requestId: loansRequest.requestID,
          desc: loansRequest.Description,
          amount: loansRequest.Amount,
          recipientAddress: loansRequest.recipient,
          chamaId: loansRequest.ChamaID,
          memberId: loansRequest.MemberNo,
          approvalCt: loansRequest.approvalCount,
        });
      }
    }
    const loansRequested = Object.values(loanReq);

    this.setState({
      chamCount: chamCt,
      chms: chamas,
      reqCount: requestCt,
      loansReq: loansRequested,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <>
            <Navigation />
          </>
          <div>
            {!this.state.web3 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "80vh",
                }}
              >
                <Spinner animation="border" style={{ display: "flex" }} />
                <p className="mx-3 my-0">
                  Loading Web3, accounts, and contract...
                </p>
              </div>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      count={this.state.chamCount}
                      availableChamas={this.state.chamas}
                      requestCnt={this.state.reqCount}
                      loansReq={this.state.loansReq}
                    />
                  }
                />
                <Route path="/create-chama" element={<CreateChama />} />
                <Route path="/chamas" element={<AvailableChamas />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            )}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;