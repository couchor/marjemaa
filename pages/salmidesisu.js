import 'isomorphic-unfetch';
import Layout from '../components/MyLayout'
// import AddToCart from '../components/Cart/AddToCart'

const Salmidesisu = props => (
<Layout seo_title={props.seo.seo_title} seo_description={props.seo.seo_description}>
	<div className='flex flex-wrap justify-around w-100'>
		{
			props.verseList.map((verse, i) => {
			 return (
				 <div key={verse.id} className='basis flex w-100 justify-center'>
					 <div className='flex flex-column justify-center items-center'>
							<div className='verse ba tc bw3 b--white pa3 ma0 w-100 pre-line'>
								<p className='mv0 tl fw5 w-100'>{verse.verse}</p>
							</div>
					</div>
				</div>
			 )
		 })

		}
	</div>
	<style jsx>
		{`
			.pre-line {
				white-space: pre-line;
				background-color: rgb(255, 235, 176);
				color: #0c0cb5;
			}
		`}
	</style>
</Layout>
)


Salmidesisu.getInitialProps = async function(context) {
	const { title } = context.query;
	const { req } = context;
	let hostName = "";
	if ( req ) {
		hostName = "http://" + req.headers.host + "/"
	} else {
		hostName = window.origin + "/"
	}
  const resp = await fetch(`${hostName}salmidesisu/${title}`)
  const data = await resp.json()

  return {
    verseList: data.verseList,
		seo: data.seo
  }
}

export default Salmidesisu
