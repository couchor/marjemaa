import Router from 'next/router';
import getConfig from 'next/config'
import Link from 'next/link'
import {connect} from "react-redux";

const {cloudinary} = getConfig().publicRuntimeConfig
const cloudinaryLink = cloudinary + "/static/"

const FixedCart = props => {
	const {cart} = props

  return (
    <div className='flex flex-column items-center nav-bg br2 tc pv1 mt2 mr2 ml2 fw5 absolute right-0 cart overflow-hidden'>
			<span href='/ostukorv' className='flex items-center justify-center mt1 mb1 ph2 black link cart-title'>
				<span>Ostukorv</span>
				<img src={`${cloudinaryLink}shopping-cart.png`} alt=''/>
				<p className='ma0'>{cart.items.length}</p>
			</span>
			<div className='cartContent pa0'>
				{cart.items.map((item, i) => {
					return (
						<div key={i} className='border flex items-center justify-between fw4 pv1 ph2'>
							<span className='preview flex justify-center items-center'><img src={`${cloudinary}/f_auto,q_auto,w_60,h_40,c_limit/${item.imgSrc}`} alt=''/></span>
							<div className='flex w-100 title items-center'>
								<a className='w-80 link black' href={item.link}>{item.title.replace(/_/g," ")}</a>
								<span className='w-20'> €{item.price}</span>
							</div>
							<span
								onClick={() => props.dispatch({type: 'REMOVEFROMCART', title: item.title})}
								className='pointer flex items-center remove' ><img className='icon pointer' src={`${cloudinaryLink}icon-delete.svg`} alt=''/></span>
						</div>
					)
				})}
			<div className='flex justify-center ph2 pb1 f5'>
				<div className='flex justify-center items-center mt2 mr3 cta'>
					<Link href='/ostukorv' as='/ostukorv'>
						<a className='link black flex align-items justify-center'>
							<span className='callButton btn btn-confirm self-center white pointer pa2'>Vormista ost</span>
						</a>
					</Link>
				</div>
				<div className='flex justify-center items-center mt2 cta'>
					<span onClick={() => props.dispatch({type:'CLEARCART'})} className='callButton btn btn-deny self-center white pointer pa2'>Tühjenda korv</span>
				</div>
			</div>

			</div>

		<style jsx>
			{`
				.title {
					max-width: 300px;
				}
				.title a {
					font-size: 1rem;
				}
				span {
					font-size: .9em;
				}
				.fixed {
					max-width: 100vw;
				}
				.preview {
					width: 60px;
					height: 40px;
				}
				.border {
					border-bottom: 1px dotted #000;
				}

				.border:last-child {
					border: none;
				}
				.cart {
					cursor: default;
					transition: box-shadow .4s;
					box-shadow: 0px 0px 5px 0px #000;
				}

				.cart:hover > .cartContent, .cart:focus > .cartContent {
					opacity: 1;
					margin-right: 0px;
					height: max-content;
					max-height: calc(100vh - ${props.headerHeight + 50}px);
					overflow-y: auto;
				}

				.cart:hover, .cart:focus {
					box-shadow: 0px 0px 10px 0px #000;
				}

				.cartContent {
					box-sizing: content-box;
					transition: margin .4s, height .4s, width .4s;
					margin-right: -600px;
					height: 0px;
					background-color: transparent;
					opacity: 0;
				}
				.cta {
					transition: transform .4s;
				}
				.cta:hover {
					transform: scale(1.05);
				}
				.remove {
					height: 20px;
					width: 20px;
				}
			`}
		</style>
		</div>
  );
};

export default connect(state => state)(FixedCart);
