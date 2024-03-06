import Link from 'next/link'
import getConfig from 'next/config'
const {cloudinary} = getConfig().publicRuntimeConfig


const CatCard = props => (
	<div className="card-wrapper pa2 mb4">
	<Link as={`/${props.parent}/${encodeURI(props.title.replace(/\s/g, "-").toLowerCase())}`} href={`/${props.parent}/${encodeURI(props.title.replace(/\s/g, "-").toLowerCase())}`}>
			<a className='flex flex-column link h-100 relative'>
				<img className='w-100 h-75' src={`${cloudinary}/f_auto,q_auto,w_500,h_500,dpr_auto/kategooriad/${encodeURI(props.title).toLowerCase()}.jpg`} />
				<div className="overlay flex justify-center items-center absolute w-100 h-100">
					<p className='white ma0 bg-black-50 pv2 ph3 f4'>{props.title}</p>
				</div>
			</a>
	</Link>
	<style jsx>
		{`
			.overlay {
				transition: background-color .5s, transform .5s;
				background-color: rgba(0,0,0,.25);

			}
			.overlay:hover {
				background-color: transparent;
				// align-items: flex-end;
			}
			p {
				position: absolute;
				bottom: 40%;
		    width: max-content;
		    height: max-content;
				transition: bottom .5s, background-color .5s, padding-bottom .5s;
			}
			.overlay:hover p {
				bottom: 0;
				padding-bottom: 0;
				background-color: rgb(75, 68, 133);
			}
			.card-wrapper {
				height: calc(100vw / 1.45);
				background-color: rgb(75, 68, 133);
			}

			img {
				// height: 80%;
				flex-grow: 3;
			}

			@media only screen and ( min-width: 500px ) {
			  .card-wrapper {
			    width: 49%;
			    height: calc(100vw / 3);
			  }
			}

			@media only screen and ( min-width: 768px ) {
			  .card-wrapper {
			    width: 32%;
			    height: calc(100vw / 4);
			  }
			}

			@media only screen and ( min-width: 1100px ) {
			  .card-wrapper {
			    width: 23%;
			    height: calc(100vw / 6);
			  }
			}

		`}
	</style>
	</div>
)

export default CatCard
