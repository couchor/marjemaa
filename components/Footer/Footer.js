import 'tachyons';
import getConfig from 'next/config'
const {cloudinary} = getConfig().publicRuntimeConfig
const cloudinaryLink = cloudinary + "/static/"

const Footer = props => (
	<footer className='flex justify-center nav-bg'>
			<p className=''>&copy; OÜ Pidepaik   &reg; Marjemaa</p>
	</footer>
)

export default Footer
