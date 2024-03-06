import 'isomorphic-unfetch';

import Layout from '../components/MyLayout'
import CatList from '../components/Category/CatList'

const Index = (props) => {
  return (
    <Layout seo_title="Marjemaa | Fotod, Read pildil ja Salmid" seo_description='Marjemaalt leiate suure koguse loodus- ja loomafotosid, tekstiridu piltidel, tervituskaarte ning erinevatel teemadel luuletusi'>
			<div className="info-wrapper pa3 mb4 fw5">
				<p className='mt0'>Tere, hea inimene, kes Sa oled sisenenud Marjemaale!</p>
				<p>Marjemaal leiad vaatamiseks, mõtisklemiseks, meeleolu seadistamiseks hulgaliselt fotosid, millistel võib näha meie väikese maa erinevaid paiku, loodust, taevast meie peade kohal, kohata nii mets- kui koduloomi, linde ja igasugu teisi tegelasi, nautida õiteilu, hoomata ilmamuutust, tajuda päeva- ja aastaaegade vaheldumist. Kõik Marjemaal vaatamiseks esitatud fotod on pildistatud Eestimaal.</p>
				<p>Head Marjemaal viibimist!</p>
				<p>Marjemaal esitletud fotode, tekstide kasutustingimustega saad tutvuda rubriigis <b><a href='/tellimine' >Tellimine</a></b>.</p>
				<p className='mb0'><b>P.S.</b> Lehel nähtaval olevate piltide kvaliteet on kasutajasõbralikkuse jaoks vähendatud. Tellimisel toimetatakse teieni originaalfailid, mis on enamjaolt tehtud Nikon D3300 kaameraga. Nende küljemõõdud on kuni 6000x4000 pikslit (või vastupidi) ning resolutsiooniaste on valdavalt 300 dpi.</p>
			</div>
			<CatList categories={props.categories} parent={props.parent} />
    </Layout>

  )
}

Index.getInitialProps = async ({req}) => {
	let hostName = "";
	if ( req ) {
		hostName = "http://" + req.headers.host + "/"
	} else {
		hostName = window.origin + "/"
	}

  const resp = await fetch(`${hostName}kategooriad/%2F`)
  const data = await resp.json()

  return {
    categories: data.categories,
		parent: '.'
  }
}

export default Index
