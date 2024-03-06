import { Component } from 'react';
import Lightbox from 'react-image-lightbox';
// import AddToCart from '../Cart/AddToCart'
import 'react-image-lightbox/style.css';
import getConfig from 'next/config'
import InfiniteScroll from 'react-infinite-scroller'
import {connect} from "react-redux";
const {cloudinary} = getConfig().publicRuntimeConfig

class CatContents extends Component {
	constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
			hasMoreItems: this.props.images.length > 15 ? true : false,
			loadedImages: this.props.images.slice(0,15)
    };
  }


	imageURL(width, height) {
		if ( width / height > 1 ) width = width / 2
		return `${cloudinary}/f_auto,q_auto,dpr_auto/l_watermark,w_${Math.floor(width / 5)},g_south_east,x_20,y_20,e_brightness:50/`
	}
	loadImages = (page) => {
		if ( this.state.hasMoreItems ) {
			if ( this.state.loadedImages.length >= this.props.images.length )
				this.setState({ hasMoreItems: false })
			else
				this.setState({ loadedImages: this.props.images.slice(0, page * 15)} )
		}
	}

	render () {
		const { photoIndex, isOpen } = this.state;
		const images = this.state.loadedImages;
		const OWNUSE = {
			photos: 17,
			textImages: 12
		}
		return (
		<InfiniteScroll
			pageStart={0}
			initialLoad={false}
			loadMore={this.loadImages}
			hasMore={this.state.hasMoreItems}
			loader={<div className="loader tc" key={0}>Pildil laadimisel...</div>}
			>
			<div className='flex flex-wrap justify-around '>
				{
					this.state.loadedImages.map((image, i) => {
					// let price = image.context ? image.context.custom.hind : false
					let price = false
					if ( this.props.title == 'Soovid' )
						price = 8

					 return (
						 <div key={i} className='basis flex'>
							 <div className='w-100 flex flex-column justify-center items-center'>
								 <picture className='tc'>
									<source
										media='(min-width: 1800px)'
										srcSet={`${cloudinary}/f_auto,q_auto,c_limit,w_500,h_500/${encodeURI(image.public_id)},
										${cloudinary}/f_auto,q_auto,c_limit,w_1000,h_1000/${encodeURI(image.public_id)} 2x`} />
									<source
										media='(min-width: 1200px)'
										srcSet={`${cloudinary}/f_auto,q_auto,c_limit,w_460,h_460/${encodeURI(image.public_id)},
										${cloudinary}/f_auto,q_auto,c_limit,w_920,h_920/${encodeURI(image.public_id)} 2x`} />
									<source
										media='(min-width: 900px)'
										srcSet={`${cloudinary}/f_auto,q_auto,c_limit,w_450,h_450/${encodeURI(image.public_id)},
										${cloudinary}/f_auto,q_auto,c_limit,w_900,h_900/${encodeURI(image.public_id)} 2x`} />
									<source
										media='(min-width: 600px)'
										srcSet={`${cloudinary}/f_auto,q_auto,c_limit,w_320,h_320/${encodeURI(image.public_id)},
										${cloudinary}/f_auto,q_auto,c_limit,w_640,h_640/${encodeURI(image.public_id)} 2x`} />
									{!this.props.mobileMenu ?
										<img className='pointer ba bw3 b--white' onClick={() => this.setState({ isOpen: true, photoIndex: i })}
										 srcSet={`${cloudinary}/f_auto,q_auto,c_limit,w_370,h_370/${encodeURI(image.public_id)},
											 ${cloudinary}/f_auto,q_auto,c_limit,w_740,h_740/${encodeURI(image.public_id)} 2x`}
										 alt={image.hasOwnProperty('context') && image.context.custom.hasOwnProperty('alt') ? image.context.custom.alt : image.public_id.substring(image.public_id.lastIndexOf('/') + 1).replace(/_/g," ") } />
										:
										<img className='pointer ba bw3 b--white'
										srcSet={`${cloudinary}/f_auto,q_auto,c_limit,w_370,h_370/${encodeURI(image.public_id)},
											${cloudinary}/f_auto,q_auto,c_limit,w_740,h_740/${encodeURI(image.public_id)} 2x`}
										alt={image.hasOwnProperty('context') && image.context.custom.hasOwnProperty('alt') ? image.context.custom.alt : image.public_id.substring(image.public_id.lastIndexOf('/') + 1).replace(/_/g," ") } />
									}
									<div className='flex justify-between w-100 '>
										<p className='bg-white br2 tc pa2 mb0 mt1 fw5'>
											 {`${image.public_id.substring(image.public_id.lastIndexOf('/') + 1).replace(/_/g," ")}`}
										</p>
										{/* <AddToCart
											imgSrc={image.public_id}
											price={!price ? OWNUSE[this.props.itemType] : price}
											title={`${this.props.title} - ${image.public_id.substring(image.public_id.lastIndexOf('/') + 1).replace(/_/g," ")}`}
											link={this.props.link}
										/> */}
									 </div>
								 </picture>
							</div>
						</div>
					 )
				 })
				}
				{
					isOpen &&
					<Lightbox
						nextLabel='Järgmine pilt'
						prevLabel='Eelmine pilt'
						zoomInLabel='Suumi sisse'
						zoomOutLabel='Suumi välja'
						// clickOutsideToClose={true}
						// animationDuration={500}
						imageTitle={images[photoIndex].public_id.substring(images[photoIndex].public_id.lastIndexOf('/') + 1).replace(/_/g," ")}
						// imageCaption='See on lisatekst'
						mainSrc={this.imageURL(images[photoIndex].width, images[photoIndex].height) + images[photoIndex].public_id}
						nextSrc={this.imageURL(images[(photoIndex + 1) % images.length].width, images[(photoIndex + 1) % images.length].height) + images[(photoIndex + 1) % images.length].public_id}
						prevSrc={this.imageURL(images[(photoIndex + images.length - 1) % images.length].width, images[(photoIndex + images.length - 1) % images.length].height) + images[(photoIndex + images.length - 1) % images.length].public_id}
						onCloseRequest={() => this.setState({ isOpen: false })}
						onMovePrevRequest={() =>
							this.setState({
								photoIndex: (photoIndex + images.length - 1) % images.length
							})
						}
						onMoveNextRequest={() =>
							this.setState({
								photoIndex: (photoIndex + 1) % images.length
							})
						}
					/>
				}
			</div>
			</InfiniteScroll>
		)
	}
}

export default connect(state => state)(CatContents)
