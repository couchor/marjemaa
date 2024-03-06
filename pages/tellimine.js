import Layout from '../components/MyLayout.js'
import { Component } from 'react';
import {connect} from "react-redux";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import getConfig from 'next/config'

// import AddToCart from '../components/Cart/AddToCart'

const {cloudinary} = getConfig().publicRuntimeConfig


const Tellimine = (props) => {
	return (
		<Layout seo_title='Tellimine' seo_description='Info tellimise ja autoriõiguste kohta'>
			<div className="info-wrapper pa3 mb4 fw5">
				{/* <p className='mt0'>Enne tellimuse esitamist tutvuge alljärgneva, <u>autoriõigusi puudutava</u> teabega:</p>
				<p>Käesoleval veebilehel (Marjemaal) olevad fotod ja kirjatekstid on kaitstud autoriõigusaktidest tulenevate autoriõigustega – fotode ja kirjatekstide kasutamine mitteautori poolt viisil, mille osas autor ei ole väljendanud kirjalikku taasesitamist võimaldavas vormis nõusolekut/luba, võivad endast kujutada autoriõiguste rikkumist.</p>
				<p>Marjemaa fotosid ja/või kirjatekste sisaldavaid fotosid (edaspidi ühise nimetajana Foto) võib kasutada, sealhulgas reprodutseerida, foto alusel teisi kujutava kunsti teoseid luua ainult isiklikul ja samas mittetulunduslikul, mitteärilisel eesmärgil. Autori/te/lt saadud fotofaile ei tohi edastada kolmandatele isikutele, väljaarvatud rubriiki „Read pildil“ kuuluvaid fotosid autoriõiguse seaduse § 8 lg.2 mõttes mõistest „üldsus“ mittehõlmatud isikule (<span className='f6'>ehk isikule oma perekonnast või lähimast tutvusringkonnast</span>) eeldusel, et viimane ei edasta faili omakorda järgmis/t/ele isiku/te/le.</p> 
				<p>Soovi korral fotot levitada ja/või kasutada seda tulunduslikul, ärilisel eesmärgil kas üksikedastusena või paljundatuna/tiražeerituna tuleb võtta e-kirja teel ühendust autori/te/ga ja saavutada selleks vastastikune kokkulepe.</p>
				<p>Marjemaa fotode kasutamise õigus tekib mitteautoril pärast seda, kui ta on esitanud tellimuse konkreetse foto saamiseks ja tasunud selle maksumuse talle saadetud arves märgitud arvelduskontole.</p>
				<p>Autor/id/ eeldavad, et enne tellimuse esitamist on Tellija tutvunud ülalkäsitletud autoriõigusi puudutava teabega, ehk et: tellimust esitades nõustute Te järgima autoriõigusaktidest tulenevaid Marjemaa fotode ja kirjatekstide kasutamise reegleid.</p>
				<p><u>Tellimise protseduur:</u></p>
				<p className='blue fw6'>Rubriigis „Fotod“ esitletud pilt maksab 17 eurot, rubriigis „Read pildil“ alarubriigis „Soovid“ esitletud tekstipilt maksab 8 eurot, „Read pildil“ teistes alarubriikides esitletud tekstipildi maksumuseks on 12 eurot</p>
				<p className='blue'>Kui leiate foto, mille faili soovite saada, klõpsake foto all olevale kastile „<span className='purple'>Lisa korvi</span>“ – ja samaselt toimige iga soovitava foto puhul. (kui eksisite foto osas või mõtlesite ümber, klõpsake kastile „<span className='purple'>Eemalda</span>“)</p>
				<p className='blue'>Kui olete soovitud fotode väljavalimise lõpetanud, klõpsake üleval, menüüriba paremal all asetsevale <span className='purple'>ostukorvi märgile</span> – avaneb Teie valikuid kajastav Tellimuse leht. Vaadake oma tellimus üle – kui tahate algselt soovitud fotost siiski loobuda, klõpsake foto nime taga asetsevale ristile; kui soovite veel midagi juurde tellida, avage Teid huvitav rubriik ja jätkake oma valiku tegemist juba kirjeldatud viisil.</p>
				<p className='blue'>Kui olete oma tellimuses kindel, täitke tellimuslehe andmeväljad: kirjutage enda nimi(pole kohustuslik) ja meiliaadress, millisele soovite tellitud foto saatmist (hoolitsege selle eest, et aadressina saaks kirja justnimelt see meiliaadress, mis tagab foto faili jõudmise isiklikult Teie kätte).</p>
				<p className='blue'>Märgistage „linnukesega“ nõustumine faili kasutamistingimustega.</p>
				<p className='blue'>Klõpsake kastikesele „<span className='purple'>Tellimus</span>“.</p>
				<p className='blue'>Teie poolt märgitud meiliaadressile laekub tellimuse alusel koostatud arve.</p>
				<p className='blue'>Tasuge arves märgitud summa arves märgitud arvelduskontole.</p>
				<p className='blue'>Pärast Teie poolt tehtud makse laekumist etteantud arveldusarvele, edastatakse Teie poolt tellitud foto/fotode fail/id/ Teile esimesel võimalusel ööpäeva jooksul (väljarvatud nädalavahetustel ja riiklikel pühadel – siis võib juhtuda, et faili edastamine leiab aset vastavalt kas esmaspäevasel päeval või esimesel pühadejärgsel tööpäeval).</p>
				<p className='blue'>Küsimuste, probleemide tekkimisel pöörduge julgelt aadressil <a href="mailto:info@marjemaa.ee">info@marjemaa.ee</a></p> */}
				{/* <p>Autori/te/ esindaja, OÜ Pidepaik arvelduskonto andmed on: <span className='font'>SEB Pank EE711010220281765222</span></p>
				<p>Ja nagu eelnevalt on selgitatud: <i>Soovi korral fotot levitada ja/või kasutada seda tulunduslikul, ärilisel eesmärgil kas üksikedastusena või paljundatuna/tiražeerituna tuleb võtta kirjateel ühendust autori/te/ esindajaga, kelleks on OÜ Pidepaik, ja saavutada selleks vastastikune kokkulepe</i>.</p>
				<p>Teil tekkinud küsimused ja soovid edastage palun meiliaadressil <a href="mailto:info@marjemaa.ee">info@marjemaa.ee</a></p> */}
				<p>Käesoleval veebilehel (Marjemaal) olevad fotod ja kirjatekstid on kaitstud autoriõigusaktidest tulenevate autoriõigustega - fotode ja kirjatekstide kasutamine mitteautori poolt viisil, mille osas autor ei ole väljendanud kirjalikku taasesitamist võimaldavas vormis nõusolekut/luba, võivad endast kujutada autoriõiguste rikkumist.</p>
				<p>Marjemaa fotosid ja/või kirjatekste sisaldavaid fotosid (edaspidi ühise nimetajana Foto) võib kasutada, sealhulgas reprodutseerida, foto alusel teisi kujutava kunsti teoseid luua ainult isiklikul, kuid samas mittetulunduslikul eesmärgil, ehk nö vaid "enda tarbeks".</p>
				<p>Soovi korral tellida endale foto originaalsuuruses, seda levitada ja/või kasutada tulunduslikul, ärilisel eesmärgil kas üksikedastusena või paljundatuna/tiražeerituna tuleb võtta e-kirja teel ühendust autori/te/ga ja saavutada selleks vastastikune kokkulepe.</p>
				{/* <p>Rubriigis "Sutsuke salme" esitletud tekstide avalik esitamine ja/või levitamine mittetulunduslikul eesmärgil on lubatud viitega teksti autorlusele. Soovi korral kasutada teksti mingi tulundusliku, ärilise iseloomuga loome- või muu projekti raames tuleb võtta e-kirja teel ühendust autoriga.</p> */}
				<p>Autori/te/ga saate võtta ühendust järgmisel aadressil:</p>
				<p><a href="mailto:urmas.kryger@gmail.com">urmas.kryger@gmail.com</a></p>
				<p>Infot autorite kohta saate rubriigist <a href='/info'>„Info“</a></p>
			</div>
			<style jsx>
				{`
					.font {
						font-family: 'Raleway', sans-serif;
					}
					.blue {
						color: blue;
					}

					.purple {
						color: purple;
					}
				`}
			</style>
		</Layout>
	)
}


export default Tellimine
