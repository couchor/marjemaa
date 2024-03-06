import MenuLink from './MenuLink';
import getConfig from 'next/config'
import {connect} from "react-redux";
import Link from 'next/link'
// import FixedCart from '../Cart/FixedCart'

const {cloudinary} = getConfig().publicRuntimeConfig
const cloudinaryLink = cloudinary + "/static/icon-close.png"


class NavMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
			categories: [],
			verseCategories: [],
			textImageCategories: [],
			headerHeight: 0
    };
  }


	async componentDidMount() {
		// const hostName = window.origin
		// const resp = await fetch(`${hostName}/kategooriad/fotod`)
		// const data = await resp.json()

		// const verseResp = await fetch(`${hostName}/kategooriad/salmid`)
		// const verseData = await verseResp.json()

		// const textImagesResp = await fetch(`${hostName}/kategooriad/read-pildil`)
		// const textImagesData = await textImagesResp.json()

		let element = document.querySelector("body");
		if ( element.classList.contains("modal-open") )
			element.classList.toggle("modal-open")

		let mobileMenu = false
		if ( window.innerWidth < 720 )
			mobileMenu = true

		this.setState({
			// categories: data.categories.map(entry => entry.title),
			// verseCategories: verseData.categories.map(entry => entry.title),
			// textImageCategories: textImagesData.categories.map(entry => entry.title),
			pathName: window.location.pathname,
			headerHeight: window.pageYOffset <= 900 ? document.querySelector("header").offsetHeight : document.querySelector("nav").offsetHeight
		})
	}
	

  toggle() {
		let element = document.querySelector("body");
		element.classList.toggle("modal-open");
		if ( this.state.isOpen ) {
			document.querySelector(".mobile-nav").style.height = 0
			setTimeout(() => {
				this.setState({
					isOpen: !this.state.isOpen,
				});
			}, 350)
		} else {
			this.setState({
				isOpen: !this.state.isOpen,
			});
		}

  }

	render() {
		let {isOpen} = this.state
		let {headerHeight, fixedNav} = this.props

		return (
		  <nav className={`f4 nav-bg pv1 pv0-ns ${fixedNav && 'fixed top-0 w-100'}`}>

			{ this.props.mobileMenu ?
				<div className='flex h-100 relative'>
				{ !this.state.isOpen ?
						<div onClick={this.toggle} className='ma0 pa0 tc main-nav flex items-center w-100 list'>
							<button className='h2 bg-transparent flex flex-column justify-around items-center z-2 pointer ba b--black-10 br2 pv1 ml2 mr1'>
								<span></span>
								<span></span>
								<span></span>
							</button>
							Menüü
						</div>
					:
					<div onClick={this.toggle} className='flex items-center'>
						<button className='h2 bg-transparent flex flex-column justify-around items-center z-2 pointer pv1 ml2 mr1'>
							<img src={cloudinaryLink} />
						</button>
						Sulge
					</div>
				}
				{	this.state.isOpen &&
					<ul className={`mobile-nav nav-bg ma0 pa0 tc items-center flex-column justify-between justify-around w-100 f3 list`}>
						<MenuLink href='/' isMobile={true} title='Pealeht' />
						<MenuLink href='/fotod' title='Fotod' pathName={this.state.pathName} isMobile={true}/>
						<MenuLink href='/read-pildil' isMobile={true} title='Read pildil' pathName={this.state.pathName} />
						{/* <MenuLink href='/sutsuke-salme' isMobile={true} title='Sutsuke salme' pathName={this.state.pathName}/> */}
						<MenuLink href='/tellimine' isMobile={true} title='Tellimine' />
						<MenuLink href='/info' title='Info' />
					</ul>
				}
				</div>
				:
				<ul className={`ma0 pa0 tc main-nav items-center flex-ns flex-wrap justify-between-l justify-around w-100 list`}>
					<MenuLink href='/' title='Pealeht' />
					<MenuLink href='/fotod' title='Fotod' pathName={this.state.pathName}/>
					<MenuLink href='/read-pildil' title='Read pildil' pathName={this.state.pathName} />
					{/* <MenuLink href='/sutsuke-salme' title='Sutsuke salme' pathName={this.state.pathName}/> */}
					<MenuLink href='/tellimine' title='Tellimine' />
					<MenuLink href='/info' title='Info' />
				</ul>
			}
			{/* { (this.props.cart && window.location.pathname !== '/ostukorv') && <FixedCart />} */}



				<style jsx>
					{`
						@keyframes transition-height {
							0% {height: 0}
							100% {height: calc(100vh - ${headerHeight}px)}
						}

						.mobile-nav {
							transition: height .4s;
							animation: transition-height .4s;
							position: absolute;
							overflow: hidden;
							width: 100vw;
							height: calc(100vh - ${headerHeight}px + 1px);
							top: ${headerHeight - 1}px;
							z-index: 3;
						}
						nav {
							touch-action: none;
							height: 55px;
						}
						button {
							width: 2.5rem;
						}

						span {
							display: block;
						  width: 1.9rem;
						  height: .25rem;
						  background: rgba(0,0,0, .6);
						  border-radius: 4px;
						  z-index: 1;
						}

					`}
				</style>
		  </nav>
		)
	}
}

export default connect(state => state)(NavMenu)
