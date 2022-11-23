

// const monConteneur = document.createElement('div');
// 
// monConteneur.id = 'nurserie';
// monConteneur.style.position = 'relative';
// monConteneur.style.width="80vw";
// monConteneur.style.height="70vh";
// monConteneur.style.marginTop="15vh";
// monConteneur.style.marginLeft="auto";
// monConteneur.style.marginRight="auto";
// monConteneur.style.border = "3px outset black";
// 
// document.body.appendChild(monConteneur);




var xMax=100;  // on travail en pourcentages du parent (#nurserie)
var yMax=100;
var cx=xMax/2; //centre
var cy=yMax/2; //centre




var taille = Number(document.getElementById('curseur').max);


var Rect = new Array(taille);
var id = new Array(taille)
var autorisation = new Array(taille);

for (i=0 ; i<Rect.length ; i++){


	Rect[i] = document.createElement('div');
	document.getElementById('nurserie').appendChild(Rect[i]);
	Rect[i].style.display = "none"; 
	Rect[i].style.position = 'absolute';
	Rect[i].classList.add('rectangle');

	id[i] = 'rect' + i.toString();

	Rect[i].id = id[i];


	$("#"+id[i]).draggable({
		containment: "#dragcontainer",
		stack: '.rectangle' // le rectangle deplacé se place tout en haut de la pile des elements de classe ".rectangle"
	});


}


$("#dragcontainer").resizable();

$("#dragcontainer").draggable();






//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// RECTANGLES /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById("curseur").addEventListener('input', updateRect,'false');
document.getElementById("nombre").addEventListener('input', updateRect,'false');
document.getElementById("nombre").addEventListener('change', updateRect,'false');


function updateRect(){ // Cette fonction s activte au chargement de la page et a chaque actualisation du curseur 


	for (i=0 ; i<Rect.length ; i++){
		Rect[i].style.display = "none"; 
		$("#"+id[i]).draggable( 'disable' );
	}

	
	var L = document.getElementById("curseur").value;

    /////////////////////////////////////////////////////
    rect_index = Math.floor(L/2); 
    // pour initialiser la marche aleatoire  (rec_index est une variable globale du programme)
    /////////////////////////////////////////////////////

    var nbr_colonnes=Math.ceil(Math.sqrt(L));
	var nbr_lignes= Math.ceil(L/nbr_colonnes);
	var margeHorizontale = 0.02*xMax;
	var margeVerticale = 0.01*yMax;

    var  nbr_petites_lignes= nbr_lignes*nbr_colonnes - L    // petites lignes de taille l-1.
    var nbr_grandes_lignes = nbr_lignes - nbr_petites_lignes;
    
	// Rect = new Array(L);
    Vois = new Array(L);
    var xx = 0;
    var yy = 0;
    


	var HrectWidthReducCoef = 0.6;
    var plainWidth = (xMax - 2*margeHorizontale)/nbr_colonnes;  
	var ww = HrectWidthReducCoef*plainWidth;
	var HmargeInterieure =(plainWidth-ww)/2;  


	var VrectWidthReducCoef = 0.6;	
	var plainHeight = (yMax - 2*margeVerticale)/nbr_lignes; 
    // var hh = Math.min(0.8*yMax/nbr_lignes ,   0.8*yMax/3  ) ;
	var hh = VrectWidthReducCoef*plainHeight;
	var VmargeInterieure =(plainHeight-hh)/2;  


/////////////////////////////////////////////////////////////////////////////
//////////// CREATION DES RECTANGLES ET DE LEUR VOISINAGE ///////////////////
	for (var i = 0; i < L; i++){ 

		$("#"+id[i]).draggable( 'enable' );

		var quotient = Math.floor(i/nbr_colonnes);
		var remainder = i % nbr_colonnes;
		xx = margeHorizontale +  remainder*plainWidth + HmargeInterieure; 

		// yy = 5 + quotient*yMax/nbr_lignes + 0.1*yMax/nbr_lignes ; 

		yy = margeVerticale +  quotient*plainHeight + VmargeInterieure; 


		Rect[i].style.display = "block";
		Rect[i].style.left = xx.toString()+'%';
		Rect[i].style.top = yy.toString()+'%';
		Rect[i].style.width = ww.toString()+'%';
		Rect[i].style.height = hh.toString()+'%';

	

////////////////////////////////////////////////////////////////////////////////
/////////////  DETERMINATION DES RECTANGLES VOISINS ////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
		if (i < L - nbr_petites_lignes*(nbr_colonnes-1)){ // grandes lignes 

			var quotient = Math.floor(i/nbr_colonnes);
			var remainder = i % nbr_colonnes;



			if (nbr_grandes_lignes == 1 && nbr_petites_lignes!=0){  // traitement speciale si il n y a qu une seule grande ligne et des petites lignes

				if (  remainder == 0 ){ // coin gauche 

					Vois[i] = [  remainder + 1 , nbr_colonnes  ];

				}

				if ( remainder == nbr_colonnes-1 ){ // coin  droit

					Vois[i] = [remainder - 1 ,  nbr_colonnes + nbr_colonnes-2];

				}

				if ( remainder != 0   &&  remainder != nbr_colonnes-1 ){ // centre 

					Vois[i] = [ remainder - 1 ,  remainder + 1 , (quotient+1)*(nbr_colonnes) + remainder-1, (quotient+1)*(nbr_colonnes) + remainder ];

				}


			}

			if (nbr_grandes_lignes == 1 && nbr_petites_lignes ==0){  // traitement speciale si il n y a qu une seule grande ligne et pas de petite ligne

				if (  remainder == 0 ){ // coin gauche 

					Vois[i] = [  remainder + 1  ];

				}

				if ( remainder == nbr_colonnes-1 ){ // coin  droit

					Vois[i] = [remainder - 1];

				}

				if ( remainder != 0   &&  remainder != nbr_colonnes-1 ){ // centre 

					Vois[i] = [ remainder - 1 ,  remainder + 1 ];

				}


			}





			if (nbr_grandes_lignes != 1 && nbr_petites_lignes!=0){    

				if (quotient != 0  &&  quotient != nbr_grandes_lignes-1 && remainder != 0 &&  remainder != nbr_colonnes-1 ){ // case du centre 

					Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder  , (quotient+1)*nbr_colonnes + remainder + 1 ];

				}

				if (quotient == 0  &&  remainder == 0 ){ // coin sup gauche 

					Vois[i] = [ (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder  , (quotient+1)*nbr_colonnes + remainder + 1 ];

				}

				if (quotient == 0  &&  remainder == nbr_colonnes-1 ){ // coin sup droit

					Vois[i] = [(quotient)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder];

				}

				if (quotient == 0  && remainder != 0 &&  remainder != nbr_colonnes-1 ){ // centre de la ligne sup

					Vois[i] = [(quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder  , (quotient+1)*nbr_colonnes + remainder + 1 ];

				}




				if (quotient == nbr_grandes_lignes-1   && remainder != 0 &&  remainder != nbr_colonnes-1 ){ // centre de la ligne inf 

					Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*(nbr_colonnes) + remainder-1, (quotient+1)*(nbr_colonnes) + remainder  ];

				}

				if (remainder == 0   && quotient != 0 &&  quotient != nbr_grandes_lignes-1 ){ // centre de la colonne gauche

					Vois[i] = [(quotient-1)*nbr_colonnes + remainder , (quotient-1)*nbr_colonnes + remainder +1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder ,  (quotient+1)*nbr_colonnes + remainder + 1 ];


				}

				if (remainder == nbr_colonnes-1   && quotient != 0 &&  quotient != nbr_grandes_lignes-1 ){ // centre de la colonne droite

					Vois[i] = [(quotient-1)*nbr_colonnes + remainder-1 , (quotient-1)*nbr_colonnes + remainder  , (quotient)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder -1,  (quotient+1)*nbr_colonnes + remainder  ];


				}

				if (quotient == nbr_grandes_lignes - 1  &&  remainder == 0 ){ // coin inf gauche

					Vois[i] = [(quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder + 1, (quotient+1)*nbr_colonnes]; 


				}

				if (quotient == nbr_grandes_lignes-1  &&  remainder == nbr_colonnes-1 ){ // coin inf droit  

					Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder , (quotient)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + nbr_colonnes-2 ];

				}


			} // fin du if 'il y a plusieur grande ligne et au moins une petite'

			if (nbr_grandes_lignes != 1 && nbr_petites_lignes == 0){    

				if (quotient != 0  &&  quotient != nbr_grandes_lignes-1 && remainder != 0 &&  remainder != nbr_colonnes-1 ){ // case du centre 

					Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder  , (quotient+1)*nbr_colonnes + remainder + 1 ];

				}

				if (quotient == 0  &&  remainder == 0 ){ // coin sup gauche 

					Vois[i] = [ (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder  , (quotient+1)*nbr_colonnes + remainder + 1 ];

				}

				if (quotient == 0  &&  remainder == nbr_colonnes-1 ){ // coin sup droit

					Vois[i] = [(quotient)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder];

				}

				if (quotient == 0  && remainder != 0 &&  remainder != nbr_colonnes-1 ){ // centre de la ligne sup

					Vois[i] = [(quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder  , (quotient+1)*nbr_colonnes + remainder + 1 ];

				}




				if (quotient == nbr_grandes_lignes-1   && remainder != 0 &&  remainder != nbr_colonnes-1 ){ // centre de la ligne inf 

					Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1   ];

				}

				if (remainder == 0   && quotient != 0 &&  quotient != nbr_grandes_lignes-1 ){ // centre de la colonne gauche

					Vois[i] = [(quotient-1)*nbr_colonnes + remainder , (quotient-1)*nbr_colonnes + remainder +1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder ,  (quotient+1)*nbr_colonnes + remainder + 1 ];


				}

				if (remainder == nbr_colonnes-1   && quotient != 0 &&  quotient != nbr_grandes_lignes-1 ){ // centre de la colonne droite

					Vois[i] = [(quotient-1)*nbr_colonnes + remainder-1 , (quotient-1)*nbr_colonnes + remainder  , (quotient)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder -1,  (quotient+1)*nbr_colonnes + remainder  ];


				}

				if (quotient == nbr_grandes_lignes - 1  &&  remainder == 0 ){ // coin inf gauche

					Vois[i] = [(quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder + 1]; 


				}

				if (quotient == nbr_grandes_lignes-1  &&  remainder == nbr_colonnes-1 ){ // coin inf droit  

					Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder , (quotient)*nbr_colonnes + remainder - 1 ];

				}


			} // fin if 'il y a plusieurs lignes et pas de petites lignes'

		}  // fin if grande lignes


		if (i > L - nbr_petites_lignes*(nbr_colonnes-1)-1 ){ //voisinage pour les rectangles des petites lignes (si il y en a)    


			var temp = i - nbr_grandes_lignes*nbr_colonnes;
			var quotient = Math.floor(temp/(nbr_colonnes-1));
			var remainder = temp % (nbr_colonnes-1);


			if(nbr_petites_lignes==1 && nbr_colonnes-1 > 1){
				if(remainder==0){
					Vois[i]= [ i-nbr_colonnes , i-nbr_colonnes+1 , i+1 ];
				}
				if(remainder==nbr_colonnes-2){
					Vois[i]= [ i-nbr_colonnes , i-nbr_colonnes+1 , i-1 ];
				}
				if(remainder!=nbr_colonnes-2 && remainder!=0){
					Vois[i]= [ i-nbr_colonnes , i-nbr_colonnes+1 , i-1 , i+1 ];
				}


			}

			if(nbr_petites_lignes==1 && nbr_colonnes-1 == 1){

				Vois[i]= [ i-nbr_colonnes , i-nbr_colonnes+1 ];

			}


			if (nbr_petites_lignes > 1){

				if (quotient == 0  &&  remainder == 0 ){ // coin sup gauche 

					Vois[i]= [ i-nbr_colonnes , i-nbr_colonnes+1 , i+1 , i + nbr_colonnes-1, i + nbr_colonnes-1 + 1  ];

				}

				if (quotient == 0  &&  remainder == nbr_colonnes-2 ){ // coin sup droit

					Vois[i]= [ i-nbr_colonnes , i-nbr_colonnes+1 , i-1 , i + nbr_colonnes-2, i + nbr_colonnes-1   ];

				}

				if (quotient == 0  && remainder != 0 &&  remainder != nbr_colonnes-2 ){ // centre de la ligne sup

					Vois[i]= [ i-nbr_colonnes , i-nbr_colonnes+1 ,i-1 , i+1 , i + nbr_colonnes-2, i + nbr_colonnes-1 , i + nbr_colonnes  ];

				}

				if (quotient == nbr_petites_lignes-1  &&  remainder == 0 ){ // coin inf gauche 

					Vois[i]= [  i - (nbr_colonnes-1), i - (nbr_colonnes-1)+1 ,  i+1   ];

				}

				if (quotient == nbr_petites_lignes-1  &&  remainder == nbr_colonnes-2 ){ // coin inf droit

					Vois[i]= [ i-(nbr_colonnes -1)-1 , i-(nbr_colonnes-1) , i-1  ];

				}

				if (quotient ==  nbr_petites_lignes-1  && remainder != 0 &&  remainder != nbr_colonnes-2 ){ // centre de la ligne inf

					Vois[i]= [ i-(nbr_colonnes -1) -1  , i-(nbr_colonnes - 1) ,  i-(nbr_colonnes-1) +1   ,i-1 , i+1  ];

				}

				if (remainder==0 && quotient != 0 && quotient != nbr_petites_lignes-1 ){ // centre colonne gauche

					Vois[i]= [ i-(nbr_colonnes -1)   ,   i-(nbr_colonnes-1) +1  , i+1 ,  i + nbr_colonnes-1 , i + nbr_colonnes  ];

				}  

				if (remainder==nbr_colonnes-2  && quotient != 0 && quotient != nbr_petites_lignes-1 ){ // centre colonne droite

					Vois[i]= [ i-(nbr_colonnes -1) -1  ,   i-(nbr_colonnes-1)   , i-1 ,  i + nbr_colonnes-2 , i + nbr_colonnes -1  ];

				}                





				if (quotient != 0 && quotient != nbr_petites_lignes-1 && remainder != 0 && remainder!= nbr_colonnes-2 ){ // centre global

					Vois[i]= [i-(nbr_colonnes-1) -1 , i-(nbr_colonnes - 1) ,  i-(nbr_colonnes-1)+1   ,i-1 , i+1 , i+nbr_colonnes-2 , i+nbr_colonnes - 1 ,  i+nbr_colonnes  ]

				}


			}

		}  

		
	} // fin boucle for

    initialState();
	updateTexte();


} // FIN de la fonction updateRect









//////////////////////////////////////////////////////////////////////////////////
//////////////////// DEPLACER LES RECTANGLES /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

















///////////////////////////////////////////////////////////////////////////////
///////////////////////// FONCTIONNEMENT //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////




var pivert = document.getElementById('woodpecker');

let rect_index;// on creer la variable rect_index. Une valeur lui est attribuee au premier appel de updateRect (donc au chargement de la page).
let indexDeepCopy=-2;
var cpt=0;


//////////////// intialeState : Mettre le jeu dans son etat initial /////////////////
function localInitialState(RRect) { RRect.classList.remove('rectOn')} ; 
 
function initialState(){
    cpt = 0;
	Rect.forEach(localInitialState);
}




var audio1 = new Audio('mixkit-message-pop-alert-2354 (mp3cut.net).mp3');
var audio2 = new Audio('sonic_ring.mp3');
audio2.volume = 0.01;





function change(){

	// animation du pivert //////////////
	pivert.classList.toggle('is-active');
	function pic(){
		pivert.classList.toggle('is-active');
	}
	setTimeout(pic,50);
	////////////////////////////////////////

	
	Rect[rect_index].classList.remove('rectOn');

 
	var Next = Vois[rect_index];
	var K=Next.length;
	var alea = Math.floor(Math.random()*K);

    
	let test_index= Vois[rect_index][alea];
	

	/// on ne retourne pas sur le rectangle précédent //////
    while(test_index==indexDeepCopy){
		alea = Math.floor(Math.random()*K);
		test_index = Vois[rect_index][alea];
	}
	////////////////////////////////////////////////////////
	indexDeepCopy=rect_index;
	rect_index=test_index;
	

	Rect[rect_index].classList.add('rectOn');
	
	
	sound_play();
	cpt++;
  
   
    if(cpt==31){
		audio2.play();
	}

}



function sound_play(){
        audio1.play();
}

function sound_pause(){
        audio1.pause();
        audio1.currentTime = 0;
}

function clickOnWoopecker(){

    cpt=0;


	let ttime=0;


	for (var i = 0; i < 31; i++){

		

		if (i<15){
			ttime= 250*i ;
		}else{
			ttime= 250*i + Math.pow((i-15)*4,1.9);
		}
    
	
	setTimeout(change,ttime);   
		
	                 
	}

}





document.querySelector("#woodpecker").addEventListener('click',clickOnWoopecker, false);




document.getElementById("curseur").value = 25;
document.getElementById("nombre").value = 25;

updateRect();
updateTexte();













/////////////////////////////////////////////////////////////////
////////////////// Chargement de la liste   : A TERMINER
//////////////////////////////////////////////////////////////////

$("#menu").draggable();

function updateTexte(){

	if (!(typeof Texte === 'undefined')) {  // SI CONTRAIRE(Texte n est pas encore defini) ALORS

		for(i=0 ; i<Texte.length ; i++){
	  		Texte[i].parentNode.removeChild(Texte[i]);
	  	}
	}


 var monTexte = document.querySelector('textarea');
 
 monTexte=monTexte.value;
 maListe = monTexte.split('\n');

Texte= new Array(Rect.length);


for( i=0; i<  Rect.length; i++){

	Texte[i] = document.createElement('div');
	Texte[i].id = 'prenom' + i.toString();
	Texte[i].classList.add('prenom');
    Texte[i].textContent = maListe[i];
	
	// var xx = parseFloat(Rect[i].style.left); // parseFloat converti la chaine en nombre réel.   
    // var yy = parseFloat(Rect[i].style.top); 
    // var ww = parseFloat(Rect[i].style.width);
    // var hh = parseFloat(Rect[i].style.height);
    // yy = yy+ 0.6*hh;
// 
    // xx = xx + 0.5*ww;
    // xx = xx - 0.5*Texte[i].textContent.length*0.075*ww;
// 
// 
	// Texte[i].style.left = xx.toString()+'%';
	// Texte[i].style.top = yy.toString()+'%';
	// Texte[i].style.width = ww.toString()+'%';
	// Texte[i].style.height = hh.toString()+'%';



    
	Rect[i].appendChild(Texte[i]); 



}

}

document.querySelector("#monBouton").addEventListener('click',updateTexte, false);







const rangeInputs = document.getElementById('curseur')
const numberInput = document.getElementById('nombre')

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('curseur')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.addEventListener('input', handleInputChange)
numberInput.addEventListener('input', handleInputChange)

window.addEventListener("load", handleInputChange)















