import Layout from '../components/MyLayout.js'
import CatList from '../components/Category/CatList'

const ReadPildil = props => (
	// <Layout seo_title='Read pildil' seo_description='Tekst piltide peal. Sobilik õnnitluskaartideks jne'>
  //   <CatContents images={props.images} title={props.title} itemType='textImages'/>
  // </Layout>
	<Layout seo_title={props.seo.seo_title} seo_description={props.seo.seo_description}>
		<div className="info-wrapper pa3 mb4 fw5">
		<p className='mt0 mb0'>Soovi korral siit midagi endale tellida, vaata rubriiki <b><a href='/tellimine' >tellimine</a></b>.</p>
		</div>
		<CatList categories={props.categories} parent={props.parent} />
	</Layout>

)


ReadPildil.getInitialProps = async function({req}) {
	let hostName = "";
	if ( req ) {
		hostName = "http://" + req.headers.host + "/"
	} else {
		hostName = window.origin + "/"
	}

	const resp = await fetch(`${hostName}kategooriad/readpildil`)
	const data = await resp.json()

	return {
		categories: data.categories,
		parent: './read-pildil',
		seo: data.seo
	}
}

export default ReadPildil
