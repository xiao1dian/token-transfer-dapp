import React, { Component } from 'react';
import { Grid, Header, Container, Image } from 'semantic-ui-react';
import { web3Service } from '../services';
import { call2Action } from '../config';
import Content from './Content';
import Information from './Information';
import Footer from './Footer';
import '../styles/new-design.css';

export default class Layout extends Component {
    constructor (props) {
        super(props);
        this.showUserAddress = this.showUserAddress.bind(this);
        this.setTokenLoaded = this.setTokenLoaded.bind(this);
    }

    state = {
        address: '',
        visible: true,
        tokenLoaded: false
    }

    showUserAddress (address) {
        this.setState({ address });
    }

    setTokenLoaded (tokenLoaded) {
        this.setState({ tokenLoaded });
    }

    handleDismiss = () => {
        this.setState({ visible: false });
    }


    render () {
        return (
            <div>
                {call2Action.message && this.state.visible &&
                    <div className="alertWrapper">
                        <Container style={{ paddingTop: '2em', paddingBottom: '2em' }}>
                            <Grid columns={call2Action.columns || 2}>
                                <Grid.Column width={14}>
                                    <span>
                                        {call2Action.message}
                                    </span>
                                </Grid.Column>
                                <Grid.Column width={2} verticalAlign="middle" textAlign="center">
                                    <a onClick={this.handleDismiss} className="dismiss">DISMISS</a>
                                </Grid.Column>
                            </Grid>
                        </Container>
                    </div>
                }
                <div  className={`header-section ${this.state.tokenLoaded ? 'tokenLoaded' : ''}`}>
                    <Container style={{ paddingTop: '2em', paddingBottom: '3em' }}>
                        <Header as='h1' dividing className='white-bordered'  style={{ paddingBottom: '0.5em' }} >
                            <Grid columns={2}>
                                <Grid.Column className="logo-wrapper" width={10}>
                                    <Image src="../images/icons/logo.svg" className="logo"/>Token Transfer Dapp
                                </Grid.Column>
                                <Grid.Column textAlign="right" width={6}>
                                    {web3Service.isWeb3Viewable &&
                                    <small style={{ fontSize: '55%' }} className="meta-address-holder"><a
                                        href={`${web3Service.explorer}address/${this.state.address}`} target='_blank'
                                        rel="noopener noreferrer">
                                        {this.state.address}
                                    </a>
                                    </small>
                                    }
                                    { !web3Service.isWeb3Viewable &&
                                    <small> Loading Network ...</small>
                                    }
                                </Grid.Column>
                            </Grid>
                        </Header>
                    </Container>
                    <Content {...{ displayAddress: this.showUserAddress, tokenLoadedFunc: this.setTokenLoaded }}/>
                </div>
                <Container style={{ marginTop: '3em' }}>
                    { !this.state.tokenLoaded ?
                        <Information/> :
                        <div></div>
                    }
                </Container>
                <div className="footer-section">
                    <Container style={{ marginTop: '3em' }}>
                    <Footer/>
                    </Container>
                </div>
            </div>
        );
    }
}
