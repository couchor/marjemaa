import { withRouter } from 'next/router'
import Layout from '../components/MyLayout.js'
import CatContents from '../components/Category/CatContents.js'
import 'isomorphic-unfetch';

const Kategooria = withRouter(props => (
	<Layout seo_title={props.seo.seo_title} seo_description={props.seo.seo_description}>
    <CatContents images={props.images} title={props.title} itemType={props.itemType} link={props.link}/>
  </Layout>
))

Kategooria.getInitialProps = async (context) => {
	const { title, itemType } = context.query;
	const { req } = context;
	let hostName, link;
	if ( req ) {
		hostName = "http://" + req.headers.host + "/"
		link = req.url
	} else {
		hostName = window.origin + "/"
		link = window.location.href
	}


  const resp = await fetch(`${hostName}kategooria/${title}`)
  const data = await resp.json()

  return {
    images: data.images.resources,
		seo: data.seo,
		title: title.charAt(0).toUpperCase() + title.slice(1),
		itemType: itemType,
		link: link
  }
}

export default Kategooria
