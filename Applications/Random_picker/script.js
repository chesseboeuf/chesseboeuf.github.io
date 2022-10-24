//function demarrage(){

var monSVG = document.createElementNS("http://www.w3.org/2000/svg",'svg');


var xMax=150;
var yMax=100;
var yMaxR=0.7*yMax; // pour eviter le chevauchement avec le cercle
var cx=xMax/2; //centre
var cy=yMax/2; //centre
var VBString = "0 0 "+ xMax.toString()+ " " + yMax.toString();
monSVG.setAttribute("viewBox", VBString); 
// monSVG.setAttribute("preserveAspectRatio","none"); pour desactiver la conservation des proportions
monSVG.id = 'image1';
monSVG.style.position = 'absolute';
var conteneur = document.getElementById("conteneurSVG");
conteneur.appendChild(monSVG);







///////////////////////////////// RECTANGLES /////////////////////////////////////////////////////


document.getElementById("taille").addEventListener('input', updateRect,'false');

function updateRect(){ // Cette fonction s activte au chargement de la page et a chaque actualisation de 


	if (!(typeof Rect === 'undefined')) {  // SI CONTRAIRE(Rect n est pas encore defini) ALORS

		for(i=0 ; i<Rect.length ; i++){
	  		Rect[i].parentNode.removeChild(Rect[i]);
	  	}
	}


	var L = document.getElementById("taille").value;

    /////////////////////////////////////////////////////
    rect_index = Math.floor(L/2); 
    // pour initialiser la marche aleatoire  (rec_index est une variable globale du programme)
    /////////////////////////////////////////////////////

	var l=Math.ceil(Math.sqrt(L));
    var nbr_colonnes=Math.ceil(Math.sqrt(L));
    var q= Math.floor(L/l);
    var nbr_lignes= Math.ceil(L/l);
    var  nbr_petites_lignes= nbr_lignes*nbr_colonnes - L    // petites lignes de taille l-1.
    var nbr_grandes_lignes = nbr_lignes - nbr_petites_lignes;
    Rect = new Array(L);
    Vois = new Array(L);
    var xx = 0;
    var yy = 0;
    

    ww = 0.8*0.9*xMax/l;  
    hh = Math.min(0.8*yMaxR/nbr_lignes ,   0.8*yMaxR/3  ) ;


/////////////////////////////////////////////////////////////////////////////
//////////// CREATION DES RECTANGLES ET DE LEUR VOISINAGE ///////////////////
	for (var i = 0; i < L; i++){ 


		// POSITIONNEMENT ET DESSIN DES RECTANGLES //
		if (i < L - nbr_petites_lignes*(nbr_colonnes-1)){  // Grande lignes


			var quotient = Math.floor(i/nbr_colonnes);
			var remainder = i % nbr_colonnes;


			xx = 0.05*xMax + remainder*(1-2*0.05)*xMax/l + 0.1*(1-2*0.05)*xMax/l;
			yy = 5 + quotient*yMaxR/nbr_lignes + 0.1*yMaxR/nbr_lignes ; 


			Rect[i] = document.createElementNS("http://www.w3.org/2000/svg",'rect');
			Rect[i].setAttribute('x', xx.toString());
			Rect[i].setAttribute('y', yy.toString());
			Rect[i].setAttribute('width', ww.toString());
			Rect[i].setAttribute('height', hh.toString());
			Rect[i].setAttribute('stroke-width','0.25');
			Rect[i].setAttribute('stroke','black');
            Rect[i].setAttribute('stroke-linecap','round');
			Rect[i].style.fill="white";
			monSVG.appendChild(Rect[i]); 


        
		} else { // Petites lignes


			var  j = i - (L - nbr_petites_lignes*(nbr_colonnes-1));

			var  jj =  j % (nbr_colonnes -1) ;
			var quotient = Math.floor(j/(nbr_colonnes-1));
			xx = 0.05*xMax + jj*0.9*xMax/l + 0.1*0.9*xMax/l 
			xx = xx + 0.5*0.9*xMax/l; // on centre les petites lignes
			yy = 5 + (quotient + nbr_grandes_lignes  )*yMaxR/nbr_lignes + 0.1 *yMaxR/nbr_lignes ;  


			 


			Rect[i] = document.createElementNS("http://www.w3.org/2000/svg",'rect');
			Rect[i].setAttribute('x', xx.toString());
			Rect[i].setAttribute('y', yy.toString());
			Rect[i].setAttribute('width', ww.toString());
			Rect[i].setAttribute('height', hh.toString());
			Rect[i].setAttribute('stroke-width','0.25');
			Rect[i].setAttribute('stroke','black');
			Rect[i].style.fill="white";

			monSVG.appendChild(Rect[i]);  


		}


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

	/////////////////////////////////////////////////////////////////////////////////////
	///////////// FIN DETERMINATION DES RECTANGLES VOISINS ////////////////////////////////// 
	/////////////////////////////////////////////////////////////////////////////////////


		   
	} // fin boucle for
    
    initialState();

	updateTexte();

} // FIN de la fonction updateRect









////////////////////////////  CERCLES //////////////////////////////////////////

var monCercle1 = document.createElementNS("http://www.w3.org/2000/svg",'circle');


var yCercle = 0.9*yMax;

monCercle1.setAttribute("id", "blueCircleButton");  
monCercle1.setAttribute("cx", cx.toString());
monCercle1.setAttribute("cy", yCercle.toString());
monCercle1.setAttribute("r", '3');
monCercle1.setAttribute("stroke", "black");  
monCercle1.setAttribute("stroke-width", 1);  
monCercle1.setAttribute("opacity", 1);  
monCercle1.setAttribute("fill", "blue");
monSVG.appendChild(monCercle1);


var monCercle2 = document.createElementNS("http://www.w3.org/2000/svg",'circle');

var redx = 100;


monCercle2.setAttribute("id", "redCircleButton");  
monCercle2.setAttribute("cx", redx.toString());
monCercle2.setAttribute("cy", yCercle.toString());
monCercle2.setAttribute("r", '2.5');
monCercle2.setAttribute("stroke", "black");  
monCercle2.setAttribute("stroke-width", 1);  
monCercle2.setAttribute("opacity", 1);  
monCercle2.setAttribute("fill", "red");
monSVG.appendChild(monCercle2);









///////////////////////////////////////////////////////////////////////////////
///////////////////////// FONCTIONNEMENT /////////////////////////////////////:


let rect_index; // on creer la variable rect_index. Une valeur lui est attribuee au premier appel de updateRect (donc au chargement de la page).
var cpt=0;

//////////////// intialeState : Mettre le jeu dans son etat initial /////////////////
function localInitialState(RRect) { RRect.classList.remove('rectOn') ,  RRect.classList.add("rectOff")} ; 
 
function initialState(){
    cpt = 0;
	Rect.forEach(localInitialState);
}




var audio1 = new Audio('Mouse-Click-00-trim.mp3');
audio1.duration=0.1;
var audio2 = new Audio('sonic_ring.mp3');
audio2.volume=0.05;




function change(){
	

    if(monCercle1.getAttribute('fill')=='blue'){
		monCercle1.setAttribute("fill", "white");	
    }else{
		monCercle1.setAttribute("fill", "blue");	
    }


    
    sound_play();
    Rect[rect_index].style.fill = 'white';
    Rect[rect_index].setAttribute('stroke-width','0.25');
    Rect[rect_index].setAttribute('stroke','black');
    Texte[rect_index].setAttribute('stroke','black');
	var Next = Vois[rect_index];
	var K=Next.length;
	var alea = Math.floor(Math.random()*K);

	rect_index = Vois[rect_index][alea];
    
    
	Rect[rect_index].style.fill = 'yellow';
	cpt++;
  
   
    if(cpt==40){
        Rect[rect_index].setAttribute('stroke-width','0.5');
		Rect[rect_index].setAttribute('stroke','blue');
		Texte[rect_index].setAttribute('stroke','blue');
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

function pushBlueCircleButton(){


    cpt=0;


	for (var i = 0; i < 5; i++){


	   var to =   setTimeout(change,200*i);        
                     
	}




	
}





document.querySelector("#blueCircleButton").addEventListener('click',pushBlueCircleButton, false);






updateRect();
updateTexte();













/////////////////////////////////////////////////////////////////
////////////////// Chargement de la liste   : A TERMINER
//////////////////////////////////////////////////////////////////

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

	Texte[i] = document.createElementNS("http://www.w3.org/2000/svg",'text');
    Texte[i].textContent = maListe[i];
	
	var xx = parseFloat(Rect[i].attributes.x.value); // parseFloat converti la chaine en nombre réel.   
    var yy = parseFloat(Rect[i].attributes.y.value); 
    var ww = parseFloat(Rect[i].attributes.width.value);
    var hh = parseFloat(Rect[i].attributes.height.value);
    yy = yy+ 0.6*hh;

    xx = xx + 0.5*ww;
    xx = xx - 0.5*Texte[i].textContent.length*0.075*ww;



	Texte[i].setAttribute('x', xx.toString());
	Texte[i].setAttribute('y', yy.toString());
	Texte[i].setAttribute('width', ww.toString());
	Texte[i].setAttribute('height', hh.toString());
	Texte[i].setAttribute('stroke-width','0.2');
	Texte[i].setAttribute('stroke','#000000');
    Texte[i].setAttribute('font-size',(0.15*ww).toString());
    Texte[i].setAttribute('text-anchor', 'start');
	//Texte[i].style.fill="white";

    
	monSVG.appendChild(Texte[i]); 



}

}

document.querySelector("#monBouton").addEventListener('click',updateTexte, false);





//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// GROUPEUR A FINIR /////////////////////////////////////////


var nombreDeGroupes= 4;
var cardinal = maListe.length;

let randomName;

             
function chooseRandomElement(liste){
    return liste[Math.floor(Math.random()*liste.length)];
}

function randomIndex(N){
    return Math.floor(Math.random()*N);
}






var mesGroupes= new Array(nombreDeGroupes);


function pushRedCircleButton(){
    audio2.play();
	var q = Math.floor(cardinal/nombreDeGroupes);
	var r = cardinal%nombreDeGroupes;
	var tempListe = new Array();
	tempListe = maListe.slice();
	var taille;
	let ind;
	for (var i= 1 ; i<nombreDeGroupes+1; i++){
		if(i<r+1){
	  	taille=q+1;
    	}else{taille=q}
    	mesGroupes[i-1]=new Array(taille);

		for(j= 0; j<taille; j++){
        	ind=randomIndex(tempListe.length);
    		mesGroupes[i-1][j]= tempListe[ind];
			tempListe.splice(ind,1);
    	}
		console.log(mesGroupes[i-1]);
	}
}

document.querySelector("#redCircleButton").addEventListener('click',pushRedCircleButton, false);

/////////////////////////////////////////////////////////////////////////////
















