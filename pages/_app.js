import React from "react";
import {Provider} from "react-redux";
import App, {Container} from "next/app";
import withRedux from "next-redux-wrapper";

import makeStore from '../store'

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
*/

class MyApp extends App {
		componentDidMount() {
			const cart = localStorage.getItem('marjemaa-cart');
			if (cart !== null) {
				this.props.store.dispatch({type: 'FILLCART', payload: JSON.parse(cart)})
			}
			if ( window.innerWidth <= 720 ) {
				this.props.store.dispatch({type: 'SETMOBILEMENU', mobileMenu: true})
			}
		}

    render() {
        const {Component, pageProps, store} = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }

}

export default withRedux(makeStore)(MyApp);
