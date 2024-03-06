import Navbar from './Navbar'
import getConfig from 'next/config'
const {cloudinary} = getConfig().publicRuntimeConfig

const Header = () => (
  <header className='bg-white z-2'>
		<div id="header" className='tc cover bg-bottom'>
	    <a href='/' className='pointer'><img src={`${cloudinary}/dpr_auto/static/logo.png`} alt="Marjemaa logo"/></a>
	  </div>
		<Navbar />
		<style jsx>
			{`
				#header {
					transition: margin .6s, height .6s;
					overflow: hidden;
				}
				div {
					background-image: url(${cloudinary}/dpr_auto,q_auto,f_auto/static/header-bg-1.jpg);
				}
				img {
					image-rendering: -webkit-optimize-contrast;
					margin: 20px 0;
					width: 50%;
					min-width: 300px;
					max-width: 700px;
					height: auto;
				}
			`}
		</style>

  </header>
)

export default Header
