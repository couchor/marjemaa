import getConfig from 'next/config'
import {connect} from "react-redux";

const {cloudinary} = getConfig().publicRuntimeConfig

const Terms = props => {

	return (
		<div className='fixed grid items-center overflow-x-hidden overflow-y-scroll top-0 right-0 bottom-0 left-0 bg-black-70 z-5'>
			<div className='flex flex-column justify-center w-100 w-90-ns info-wrapper box-shadow-10 tl pa3 ma5-ns relative radius'>
				<button className='absolute pointer top-0 right-0 mt2 mr2 bg-transparent grow'><img onClick={() => props.dispatch({type: 'TOGGLETERMS'})} height='40px' src={`${cloudinary}/static/icon-close.png`} /></button>
				<div className="pa3 mb4 fw5">
					<p className='mt0'>Enne tellimuse esitamist tutvuge alljärgneva, <u>autoriõigusi puudutava</u> teabega:</p>
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
					<p className='blue'>Küsimuste, probleemide tekkimisel pöörduge julgelt aadressil <a href="mailto:info@marjemaa.ee">info@marjemaa.ee</a></p>
					{/* <p>Autori/te/ esindaja, OÜ Pidepaik arvelduskonto andmed on: <span className='font'>SEB Pank EE711010220281765222</span></p>
					<p>Ja nagu eelnevalt on selgitatud: <i>Soovi korral fotot levitada ja/või kasutada seda tulunduslikul, ärilisel eesmärgil kas üksikedastusena või paljundatuna/tiražeerituna tuleb võtta kirjateel ühendust autori/te/ esindajaga, kelleks on OÜ Pidepaik, ja saavutada selleks vastastikune kokkulepe</i>.</p>
					<p>Teil tekkinud küsimused ja soovid edastage palun meiliaadressil <a href="mailto:info@marjemaa.ee">info@marjemaa.ee</a></p> */}
					<p>Infot autorite kohta saate rubriigist <a href='/info'>„Info“</a></p>
				</div>
			</div>
			<style jsx>
				{`
					.grid {
						display: grid;
						justify-items: center;
					}
					.radius {
						border-radius: 1rem;
					}

					@media only screen and ( max-width: 767px ) {
						.radius {
							border-radius: 0;
							margin: 0;
						}

					}
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
		</div>
	)
};

export default connect(state => state)(Terms);
