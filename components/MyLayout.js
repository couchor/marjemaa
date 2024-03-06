import Header from './Header/Header';
import Main from './Main';
import Footer from './Footer/Footer';
import Terms from './Global/Terms'
import Head from 'next/head';
import 'tachyons';
import {connect} from "react-redux";
import { initGA, logPageView } from '../utils/analytics'

class Layout extends React.Component {
	componentDidMount () {
	    if (!window.GA_INITIALIZED) {
	      initGA()
	      window.GA_INITIALIZED = true
	    }
	    logPageView()
	}

	render () {
		return (
	  <div className='flex flex-column min-vh-100'>
			<Head>
				<meta name='viewport' content='width=device-width,initial-scale=1' />
				<meta httpEquiv="Accept-CH" content="DPR, Width" />
				{/* ~55 characters */}
				<title>{this.props.seo_title}</title>
				{/* 120 - 158 characters */}
				<meta name='description' property='description' content={this.props.seo_description || ""} />
				{/* 60-90 characters */}
				{/* <meta name='og:title' property='og:title' content={props.ogTitle || ""} /> */}
				{/* ~200 characters */}
				{/* <meta name='og:description' property='og:description' content={props.ogDescription || ""} /> */}
				{/* 1200x627px - up to 5MB */}
				{/* <meta name='og:image' property='og:image' content={props.ogImage || ""} /> */}
				<link href="https://fonts.googleapis.com/css?family=Raleway:400,500&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css?family=Courgette&display=swap" rel="stylesheet" />
				<link rel="apple-touch-icon" sizes="152x152" href="/static/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
				<link rel="manifest" href="/static/site.webmanifest" />
				<link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#000066" />
				<meta name="msapplication-TileColor" content="#000066" />
				<meta name="theme-color" content="#ffffff" />
			</Head>
	    <Header />
			{ this.props.termsIsOpen && <Terms />}

			<Main content={this.props.children} />
			<Footer />
			<style jsx global>{`
	      html{box-sizing:border-box}*,::after,::before{box-sizing:inherit}:root{-moz-tab-size:4;tab-size:4}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'}hr{height:0}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:SFMono-Regular,Consolas,'Liberation Mono',Menlo,Courier,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{padding:0}progress{vertical-align:baseline}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}
				body {
					font-family: 'Raleway', sans-serif;
				}

				.info-wrapper {
					font-family: 'Kalam', cursive;
					font-family: 'Courgette', cursive;
					background-color: rgb(255, 240, 197);
					font-size: 1.1rem;
					width: max-content;
					max-width: 100%;
					margin-left: auto;
					margin-right: auto;
					line-height: 1.25em;
					padding: 2em;
					border-radius: 3em;
				}


				@media only screen and ( min-width: 768px ) {
					.info-wrapper {
						max-width: 80%;
					}
					.cat-card-wrap {
						justify-content: space-between;
					}
				}
				.modal-open {
					overflow: hidden;
				}
				button {
					border: none;
					cursor: pointer;
				}
				.main-bg {
					background-color: rgb(254, 222, 200);
					border: 2px solid rgba(0, 0, 102, 0.6);
				}

				.nav-bg {
					background-color: #7fffc3;
				}

				.callButton {
					transition: transform .2s;
					border-radius: .25rem;
					text-align: center;
					padding: .5rem;
					font-weight: 500;
				}
				.callButton:hover {
					transform: scale(1.02)
				}

				.btn {
					box-shadow: 0px 0px 5px #000;
					border-style: none;
					border-radius: 2px;
				}

				.btn-confirm {
					background-color: #4c4883;
				}

				.btn-deny {
					background-color: #a41a2e;
				}

				.remove {
					min-width: max-content;
				}

				.update {
					position: relative;
					background-color: rgb(76, 66, 132);
					color: white;
				}


				// .callButton:before, .update:before {
				// 	z-index: -1;
				//   content: "";
				//   position: absolute;
				//   left: 0;
				//   top: 0;
				//   width: 100%;
				//   height: 100%;
				// 	border-radius: .25rem;
				//   background-color: inherit;
				//   transition: transform .3s;
				// 	// transform-origin: right;
				// }
				// .callButton:hover:before, .update:hover:before {
				// 	transform: scale(1.05);
				// 	// padding-left: 1rem;
				// 	// padding-right: 1rem;
				// }

				.red-bg {
					background-color: rgb(252, 146, 146);
				}
				.icon {
					height: 1.25rem;
				}
				.box-shadow-10 {
					box-shadow: 0px 0px 10px 0px #000;
				}
				.box-shadow-5 {
					box-shadow: 0px 0px 5px 0px #000;
				}

				.noScroll {
					overflow: hidden;
	    		position: fixed;
				}

				.basis {
					flex-basis: 100%;
					margin-bottom: 4rem;
				}

				@media only screen and (min-width: 600px) {
					.basis {
						flex-basis: 50%;
						padding: 0 1rem;
					}
				}

				@media only screen and (min-width: 1200px) {
					.basis {
						flex-basis: 33%;
						padding: 0 2rem;
						margin-bottom: 6rem;
					}
				}

				@media only screen and (min-width: 1800px) {
					.basis {
						flex-basis: 25%;
					}
				}
	    `}</style>
	  </div>
		)
	}
}

export default connect(state => state)(Layout)
