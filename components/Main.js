import { Component } from 'react';
import Head from 'next/head';
import getConfig from 'next/config'
import {connect} from "react-redux";
const {cloudinary} = getConfig().publicRuntimeConfig




class Main extends Component {
	constructor(props) {
    super(props);

    this.state = {
			backToTop: false,
			collapseHeight: 0
    };
  }

	componentDidMount() {
		window.addEventListener('scroll', this.listenToScroll)
		window.addEventListener('resize', this.listenToResize);

		let scroll = window.pageYOffset
		this.listenToScroll()
		scroll > this.props.headerHeight && this.props.dispatch({type: 'FIXNAVBAR', fixedNav: true})
		this.props.dispatch({type: 'UPDATEHEADERHEIGHT', headerHeight: scroll <= 900 ? document.querySelector("header").offsetHeight : document.querySelector("nav").offsetHeight})
		this.updateHeaderHeight()
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.listenToScroll)
		window.removeEventListener('resize', this.updateHeaderHeight);

	}

	updateHeaderHeight = (height = 0) => {
			this.props.dispatch({type: 'UPDATEHEADERHEIGHT', headerHeight: document.querySelector("nav").offsetHeight})
	}

	listenToResize = () => {
		if ( window.innerWidth > 720 && this.props.mobileMenu)
			this.props.dispatch({type: 'SETMOBILEMENU', mobileMenu: false})
		else if ( window.innerWidth <= 720 && !this.props.mobileMenu )
			this.props.dispatch({type: 'SETMOBILEMENU', mobileMenu: true })
		this.updateHeaderHeight()
	}

	listenToScroll = () => {
		let el = 	document.getElementById("header")
		let collapseHeight = el.offsetHeight

		if ( window.pageYOffset > collapseHeight && !this.props.fixedNav) {
			this.props.dispatch({type: 'FIXNAVBAR', fixedNav: true})
			this.updateHeaderHeight()
		}	else {
			if ( window.pageYOffset > 900 && !this.state.backToTop ) {
				this.setState({ backToTop: true})
			}
			if ( this.props.fixedNav && window.pageYOffset <= collapseHeight) {
				this.props.dispatch({type: 'FIXNAVBAR', fixedNav: false})
			}

			if (this.state.backToTop && window.pageYOffset < 900) {
				document.querySelector(".backToTop").style.opacity = "0"
				setTimeout(() => {
					this.setState({ backToTop: false })
				}, 500)
			}

		}
	}

	scrollToTop = () => {
		window.scrollTo({
		  top: 0,
		  left: 0,
		  behavior: 'smooth'
		});
	}

	render() {
		let {headerHeight, fixedNav} = this.props
		return (
			<main className='w-100 center flex flex-column cover pa0 flex-grow-1 relative overflow-hidden'>
				{/* { (this.props.cart && window.location.pathname !== '/ostukorv')&& <FixedCart />} */}
				{
					this.state.backToTop &&
					<div className='backToTop nav-bg ph1 br2 z-1' onClick={() => this.scrollToTop()}><img height="35px" width="35px" src={`${cloudinary}/static/arrow-up.png`} /></div>
				}
				<div className='content flex flex-column flex-wrap ph2'>
					{this.props.content}
				</div>
				<style jsx>
					{`
						@keyframes fade {
							0% {opacity: 0}
							100% {opacity: 1}
						}
						main {
							// transition: margin .6s;
							background-image: url(${cloudinary}/f_auto,q_auto,dpr_auto/static/bg.jpg);
							background-attachment: fixed;
							margin-top: ${!fixedNav ? 0 : headerHeight}px;
						}
						.backToTop {
							transition: opacity .5s;
							animation: fade .5s;
							position: fixed;
							right: 0;
							bottom: 0;
							margin-right: 3%;
							margin-bottom: 3%;
							box-shadow: 0px 0px 5px 0px #000;
						}
						.content {
							margin-top: 3rem;
							margin-left: 5%;
							margin-right: 5%;
						}
					`}
				</style>
			</main>
		)

	}
}

export default connect(state => state)(Main)
