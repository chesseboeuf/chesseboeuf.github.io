//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLES GLOBALES /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


var xMax=100;  // on travail en pourcentages du parent (#nurserie)
var yMax=100;
var taille = Number(document.getElementById('curseur').max);

var Rect = new Array(taille);
var Numero = new Array(taille);
var id = new Array(taille);
Vois = new Array(taille);


///////////////////////// Variables du pivert ////////////////////////
// On creer la variable rect_index.
// Une première valeur lui sera attribuee au premier appel de updateRect (donc au chargement de la page).
let rect_index;
var cpt=0;

let indexDeepCopy=-2;

var pivert = document.getElementById('woodpecker');

var audio1 = new Audio('mixkit-message-pop-alert-2354 (mp3cut.net).mp3');
var audio2 = new Audio('sonic_ring.mp3');
audio2.volume = 0.01;


////////////////////////// Zone de texte /////////////////////////////
const textarea = document.querySelector('#zone_texte');
const lineNumbers = document.querySelector('.line-numbers');
var numberOfLines = 0;


var eleve_view =false;







////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////// CREATION DES CELLULES DANS LE HTML //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////


for (i=0 ; i<Rect.length ; i++){


	Rect[i] = document.createElement('div');
	document.getElementById('nurserie').appendChild(Rect[i]);

	Rect[i].style.display = "none"; 
	Rect[i].style.position = 'absolute';
	Rect[i].classList.add('rectangle');
	
	
	//   Rect[i].classList.add("ui-widget-content");
	

	id[i] = 'rect' + i.toString();

	Rect[i].id = id[i];

	Numero[i] = document.createElement('div');
	document.getElementById(id[i]).appendChild(Numero[i]);

	/////////////////
	/////////////////
	/////////////////
	/////////////////
	/////////////////
	/////////////////
	/////////////////
	/////////////////
	/////////////////
	/////////////////
	/////////////////
	/////////////////
	// A remettre bien 
	Numero[i].innerHTML = (i+1).toString();
	Numero[i].classList.add('box_number');
	// Numero[i].style.position = 'absolute';
}


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
////////////////////// DEPLACER LES CELLULES /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

for (i=0 ; i<Rect.length ; i++){

	$("#"+id[i]).draggable({
		containment: "#dragcontainer",
        multiple: true,	
		stack: '.rectangle', // le rectangle deplacé se place tout en haut de la pile des elements de classe ".rectangle"

		drag: function( event, ui ) {
				if(eleve_view==true){
					// cas 1 : une seule cellule est déplacée
					console.log(ui.position);
					ui.position.left= $('#nurserie').width() - ui.position.left - $("#rect0").width() ;
					ui.position.top= $('#nurserie').height() - ui.position.top - $("#rect0").height() ;

					// cas 2 : deplacement après selection d'un groupe de cellules
			    	let selectedGroup = document.getElementsByClassName('ui-selected displayed');
				    for (i=0 ; i<selectedGroup.length ; i++){
						let aSelectedRectId= '#' + selectedGroup[i].id;
						var lll = ( 100 * parseFloat($(aSelectedRectId).position().left / parseFloat($(aSelectedRectId).parent().width())) ) + "%" ;
						var ttt = ( 100 * parseFloat($(aSelectedRectId).position().top / parseFloat($(aSelectedRectId).parent().height())) ) + "%" ;
						$(aSelectedRectId).css("left", lll);
						$(aSelectedRectId).css("top", ttt);
					}
		    	}
			},

		//////////// Compatibilité avec le RESIZE ///////////////
		// Par default draggable() convertit left et top en px.
		// Si on veut les remettre en pourcentage il faut ajouter
		// La function suivante
		stop: function () {

			if(eleve_view==true){
				// cas 1 : une seule cellule est déplacée
				var l =   100 *(      $(this).parent().width() -   $(this).position().left - $(this).width()   )    / $(this).parent().width()         + "%" ;
				var t =   100 *(      $(this).parent().height() -   $(this).position().top - $(this).height()   )    / $(this).parent().height()       + "%" ;
				$(this).css("left", l);
				$(this).css("top", t);

				// cas 2 : deplacement après selection d'un groupe de cellules
				let selectedGroup = document.getElementsByClassName('ui-selected displayed');
				for (i=0 ; i<selectedGroup.length ; i++){
					let aSelectedRectId= '#' + selectedGroup[i].id;
					var lll =  100*( $(aSelectedRectId).parent().width() -  $(aSelectedRectId).position().left  -   $(aSelectedRectId).width   ) / $(aSelectedRectId).parent().width()     +  "%" ;
					var ttt =  100*( $(aSelectedRectId).parent().height() -  $(aSelectedRectId).position().top  -   $(aSelectedRectId).height   ) / $(aSelectedRectId).parent().height()   +  "%" ;
					$(aSelectedRectId).css("left", lll);
					$(aSelectedRectId).css("top", ttt);
				}

				
			}else{	
				// cas 1 : une seule cellule est déplacée
				var l =     100 *(    $(this).position().left / parseFloat($(this).parent().width())   )      + "%" ;
				var t =     100 *(    $(this).position().top / parseFloat($(this).parent().height())   )      + "%" ;
				$(this).css("left", l);
				$(this).css("top", t);

				// cas 2 : deplacement après selection d'un groupe de cellules
				let selectedGroup = document.getElementsByClassName('ui-selected displayed');
				for (i=0 ; i<selectedGroup.length ; i++){
					let aSelectedRectId= '#' + selectedGroup[i].id;
					var lll =  100*(     $(aSelectedRectId).position().left / $(aSelectedRectId).parent().width()     )  +  "%" ;
					var ttt =  100*(     $(aSelectedRectId).position().top / $(aSelectedRectId).parent().height()     )  + "%" ;
					$(aSelectedRectId).css("left", lll);
					$(aSelectedRectId).css("top", ttt);
				}
			}
		}
	});

}


$("#prof").draggable({
	stack: '.rectangle',
	containment: "#dragcontainer",

	drag: function( event, ui ) {
			if(eleve_view==true){
				// cas 1 : une seule cellule est déplacée
				 console.log(ui.position);
				ui.position.left= $('#dragcontainer').width() - ui.position.left - $("#prof").width() ;
				ui.position.top= $('#dragcontainer').height() - ui.position.top - $("#prof").height() ;
			}
		},

	

	stop: function () {
		if(eleve_view==true){
			var l =   100 *(      $(this).parent().width() -   $(this).position().left - $(this).width()   )    / $(this).parent().width()         + "%" ;
			var t =   100 *(      $(this).parent().height() -   $(this).position().top - $(this).height()   )    / $(this).parent().height()       + "%" ;
			$(this).css("left", l);
			$(this).css("top", t);
		
		}else{		
			var l =     100 *(    $(this).position().left / parseFloat($(this).parent().width())   )      + "%" ;
			var t =     100 *(    $(this).position().top / parseFloat($(this).parent().height())   )      + "%" ;
			$(this).css("left", l);
			$(this).css("top", t);
		}
	}	
});





$("#dragcontainer").draggable(); 





$("#dragcontainer").resizable({

	stop: function( event, ui ) {

		var w =     100 *(    $(this).width() / parseFloat($(this).parent().width())   )      + "%" ;
		var h =     100 *(    $(this).height() / parseFloat($(this).parent().height())   )      + "%" ;
		$(this).css("width", w);
		$(this).css("height", h);
	}
});






$("#nurserie").selectable({
	filter: ".rectangle", // seulement les éléments rectangle sont selectable (pas leur enfants 'prenom' et 'number')
	selecting: function( event, ui ) {
		 if (ui.selecting.classList.contains('colorified')){
		 ui.selecting.style.backgroundImage='linear-gradient(90deg, pink, rgba(255, 192, 203, 0) 50%)';
		 }else{
			ui.selecting.style.background='pink';
		 }
	},

	unselecting: function( event, ui ) {
		// ui.unselecting.style.backgroundImage='';
		if (ui.unselecting.classList.contains('colorified')){
			ui.unselecting.style.backgroundImage='';
			}else{
			   ui.unselecting.style.background='rgb(247,247,247)';
			}
	},

  });


///////////// SELECTION AVEC LE BOUTON CTRL /////////////////////////
document.addEventListener('keydown', checkKeyDown);
document.addEventListener('keyup', checkKeyUp);

let ctrlPressed = false;

function checkKeyDown ( event ) {

	if ( event.code == "ControlLeft" || event.code == "ControlRight") {

		ctrlPressed = true;

		$(".rectangle").draggable( 'disable' );
		$("#dragcontainer").draggable( 'disable' );

	} else {  /*ctrlPressed = false;*/ }

};
  
function checkKeyUp ( event ) {

	if ( event.code == "ControlLeft" || event.code == "ControlRight") {

		if ( ctrlPressed ) { 
	
			$(".rectangle").draggable( 'enable' );
			$("#dragcontainer").draggable( 'enable' );

		 }

	}

};






/////////////////////////////////////////////////////////////////////////////////////
////////////////////// COLORATION DES CELLULES SELECTIONNEES ////////////////////////
/////////////////////////////////////////////////////////////////////////////////////  






$("#color_picker").change(function(event) {
    console.log($(this).val());
    $("#color_front").css('background-color',$(this).val());
});

$("#color_front").click(function(event) {
    $("#color_picker").click();
});






var changer_couleur = function(){
	let couleur = document.getElementById('color_picker').value;

	let selected_cells = $('.ui-selected');
	for(i=0; i< selected_cells.length; i++){
		let mySelectedCell = $('#'+selected_cells[i].id);
		mySelectedCell.css('background',couleur);
		mySelectedCell.addClass('colorified');
		$('.ui-selected').css('background-image', 'linear-gradient(90deg, pink, rgba(255, 192, 203, 0) 50%)');
	}

};



document.getElementById('color_picker').addEventListener('input',changer_couleur,'false');
document.getElementById('color_picker').addEventListener('click',changer_couleur,'false');

document.getElementById('defaut_color_button').addEventListener('click',function(){

	let selected_cells = $('.ui-selected');
	for(i=0; i< selected_cells.length; i++){
		let mySelectedCell = $('#'+selected_cells[i].id);
		if(mySelectedCell.hasClass('colorified')){
			mySelectedCell.css('background','pink');
			mySelectedCell.removeClass('colorified');
		}

	}

});

document.getElementById('number_button').addEventListener('click',function(){

	$('.box_number').toggle();

});





///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// POSITIONNEMENT DES CELLULES /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById("curseur").addEventListener('input', updateRect,'false');
// document.getElementById("nombre").addEventListener('input', updateRect,'false');
document.getElementById("nombre").addEventListener('change', updateRect,'false');


function updateRect(){ // Cette fonction s activte au chargement de la page et a chaque actualisation du curseur 


	for (i=0 ; i<Rect.length ; i++){
		Rect[i].style.display = "none";
		Rect[i].classList.remove('displayed'); 
		$("#"+id[i]).draggable( 'disable' );
	}

	
	var LL = document.getElementById("curseur").value;

    /////////////////////////////////////////////////////
    rect_index = Math.floor(LL/2);  // pour initialiser la marche aleatoire (variable globale)
    /////////////////////////////////////////////////////

    var nbr_colonnes=Math.min(LL,Math.ceil(Math.sqrt(LL)+2));
	var nbr_lignes= 0;
	if(nbr_colonnes==0){
		nbr_lignes = 0;
	}else{
		var nbr_lignes= Math.ceil(LL/nbr_colonnes);
	}
	console.log('nombre de colonnes : ' +  nbr_colonnes.toString());
	console.log('nombre de lignes : ' +  nbr_lignes.toString());
	var margeHorizontale = 0.02*xMax;
	var margeVerticale = 0.00*yMax;
    
    Vois = new Array(LL);
    var xx = 0;
    var yy = 0;
    
	var HrectWidthReducCoef = 0.7;
    var plainWidth = (xMax - 2*margeHorizontale)/nbr_colonnes;  
	var ww = HrectWidthReducCoef*plainWidth;
	var HmargeInterieure =(plainWidth-ww)/2;  


	var VrectWidthReducCoef = 0.6;	
	var plainHeight = (yMax - 2*margeVerticale)/nbr_lignes; 
	var hh = VrectWidthReducCoef*plainHeight;
	hh=Math.min(hh,25);
	var VmargeInterieure =(plainHeight-hh)/2;  


	


/////////////////////////////////////////////////////////////////////////////
//////////// CREATION DES RECTANGLES ET DE LEUR VOISINAGE ///////////////////
	for (var i = 0; i < LL; i++){ 

		$("#"+id[i]).draggable( 'enable' );

		var quotient = Math.floor(i/nbr_colonnes);
		var remainder = i % nbr_colonnes;

		xx = margeHorizontale +  remainder*plainWidth + HmargeInterieure; 
		yy = margeVerticale +  quotient*plainHeight + VmargeInterieure; 


		Rect[i].style.display = "block";
		Rect[i].classList.add('displayed');
		Rect[i].style.left = xx.toString()+'%';
		Rect[i].style.top = yy.toString()+'%';
		Rect[i].style.width = ww.toString()+'%';
		Rect[i].style.height = hh.toString()+'%';


	

////////////////////////////////////////////////////////////////////////////////
/////////////  DETERMINATION DES RECTANGLES VOISINS ////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
		var quotient = Math.floor(i/nbr_colonnes);
		var remainder = i % nbr_colonnes;


		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////// IL Y A EXACTEMENT 1 LIGNES ////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (nbr_lignes == 1 ){ 

			if(LL==1){
				Vois[i]=null;
			}else{
				if (  remainder == 0 ){ // coin gauche 
					Vois[i] = [1];
				}
				if ( remainder == LL-1 ){ // coin  droit
					Vois[i] = [remainder - 1];
				}
				if ( remainder != 0   &&  remainder != LL-1 ){ // centre 
					Vois[i] = [ remainder - 1 ,  remainder + 1 ];
				}
			}

		}
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////// IL Y A EXACTEMENT 2 LIGNES ////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (nbr_lignes == 2){  


			// LIGNE SUPERIEUR QUAND LA DERNIERE N'EST PAS PLEINE /////////////////////////////////////////////////////////////////////////////////////////////
			if (quotient == 0  && (LL-1)%nbr_colonnes!==nbr_colonnes-1 ){ 

				if(remainder < (LL-1)%nbr_colonnes){ // avant décalage
					if(remainder==0){
						Vois[i] = [(quotient)*nbr_colonnes + 1  , (quotient+1)*nbr_colonnes  , (quotient+1)*nbr_colonnes +1 ];
					}else{
						Vois[i] = ['AAAAA' , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder  , (quotient+1)*nbr_colonnes + remainder + 1 ];
					}	
				}
				if(remainder == (LL-1)%nbr_colonnes){ // sur le décalage
					if(remainder ==0){
						Vois[i] = [(quotient)*nbr_colonnes + 1  , (quotient+1)*nbr_colonnes ];
					}else{
						Vois[i] = [(quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder ];	
					}
				}
				if(remainder == (LL-1)%nbr_colonnes + 1){ // décalage + 1
					if(remainder==nbr_colonnes-1){
						Vois[i] = [ (quotient)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder - 1 ];
					}else{
						Vois[i] = [(quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder - 1];
					}
					
				}
				if (remainder > (LL-1)%nbr_colonnes + 1){ // après le décalage +1
					if(remainder==nbr_colonnes-1){
						Vois[i] = [(quotient)*nbr_colonnes + remainder - 1];
					}else{
						Vois[i] = [(quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 ];
					}
				}
			}
			
			// LIGNE SUPERIEURE QUAND LA DERNIERE EST PLEINE /////////////////////////////////////////////////////////////////////////////////////////////
			if (quotient == 0  && (LL-1)%nbr_colonnes ==nbr_colonnes-1 ){ 

				if(remainder== 0 || remainder == nbr_colonnes-1 ){
					if(remainder== 0){ //gauche
						Vois[i] = [(quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder ,  (quotient+1)*nbr_colonnes + remainder + 1 ];
					}
					if(remainder == nbr_colonnes-1){ //droite
						Vois[i] = [(quotient)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder -1,  (quotient+1)*nbr_colonnes + remainder  ];
					}
				}else{
					Vois[i] = [(quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder  , (quotient+1)*nbr_colonnes + remainder + 1 ];

				}
			}


			// LIGNE INFERIEURE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 			if(quotient == nbr_lignes -1){

				if ((LL-1)%nbr_colonnes==0 || (LL-1)%nbr_colonnes==1 || (LL-1)%nbr_colonnes==nbr_colonnes-1){

					if((LL-1)%nbr_colonnes==0){ // La ligne inférieure comporte un élément
						Vois[i] = [(quotient-1)*nbr_colonnes  , (quotient-1)*nbr_colonnes + 1];
						console.log('a');
						console.log(i.toString()) 
					}
	
					if((LL-1)%nbr_colonnes==1){ // La ligne inférieure comporte deux éléments
						if (remainder == 0 ){ // gauche
							Vois[i] = [(quotient-1)*nbr_colonnes  , (quotient-1)*nbr_colonnes + 1 , (quotient)*nbr_colonnes + 1]; 
		
						}
						if (remainder == 1 ){ // droite  
							Vois[i] = [(quotient-1)*nbr_colonnes  , (quotient-1)*nbr_colonnes + 1 , (quotient-1)*nbr_colonnes + 2, (quotient)*nbr_colonnes ];
						}
					}
	
					if((LL-1)%nbr_colonnes==nbr_colonnes-1){ // La ligne inférieure est pleine
	
						if (remainder == 0 ){ // gauche
							Vois[i] = [(quotient-1)*nbr_colonnes  , (quotient-1)*nbr_colonnes + 1 , (quotient)*nbr_colonnes + 1]; 
						}
	
						if (remainder != 0 &&  remainder != nbr_colonnes-1 ){ // centre 
							Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1   ];
						}
	
						if (remainder == nbr_colonnes-1 ){ // coin droit  
							Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder , (quotient)*nbr_colonnes + remainder - 1 ];
						}
					}

				}else{// Ligne inférieure cas général

					if (remainder == 0 ){ // gauche
						Vois[i] = [(quotient-1)*nbr_colonnes  , (quotient-1)*nbr_colonnes + 1 , (quotient)*nbr_colonnes + 1]; 
					}

					if (remainder == (LL-1)%nbr_colonnes ){ // coin droit  
						Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder ,  (quotient-1)*nbr_colonnes + remainder+1, (quotient)*nbr_colonnes + remainder - 1 ];
					}

					if (remainder != 0 &&  remainder != (LL-1)%nbr_colonnes ){ // centre 
						Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1   ];
					}
				}

			}

		}


		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////// IL Y A PLUS QUE 2 LIGNES //////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (nbr_lignes > 2){ 

			// LIGNE SUPERIEURE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			if (quotient == 0 ){
				if(remainder==0){ // coin gauche 
					Vois[i] = [  1 , nbr_colonnes   , nbr_colonnes + 1 ];
				}
				if(remainder == nbr_colonnes-1){ // coin  droit
					Vois[i] = [remainder - 1 ,nbr_colonnes + remainder - 1 , nbr_colonnes + remainder];
				}
				if (remainder != 0  &&  remainder != nbr_colonnes-1 ){ // centre 
					Vois[i] = [ remainder - 1 ,  remainder + 1 , nbr_colonnes + remainder - 1 , nbr_colonnes + remainder  , nbr_colonnes + remainder + 1 ];
				}
			}


			// AVANT DERNIERE LIGNE QUAND LA DERNIERE N'EST PAS PLEINE /////////////////////////////////////////////////////////////////////////////////////////////
			if (quotient == nbr_lignes -2  && (LL-1)%nbr_colonnes!==nbr_colonnes-1 ){ 
				if(remainder < (LL-1)%nbr_colonnes){ // avant décalage
					if(remainder==0){
						Vois[i] = [(quotient-1)*nbr_colonnes , (quotient-1)*nbr_colonnes + 1 , (quotient)*nbr_colonnes + 1  , (quotient+1)*nbr_colonnes  , (quotient+1)*nbr_colonnes +1 ];
					}else{
						Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder  , (quotient+1)*nbr_colonnes + remainder + 1 ];
					}	
				}
				if(remainder == (LL-1)%nbr_colonnes){ // sur le décalage
					if(remainder ==0){
						Vois[i] = [(quotient-1)*nbr_colonnes , (quotient-1)*nbr_colonnes + 1 , (quotient)*nbr_colonnes + 1  , (quotient+1)*nbr_colonnes ];
					}else{
						Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder ];	
					}
				}
				if(remainder == (LL-1)%nbr_colonnes + 1){ // décalage + 1
					if(remainder==nbr_colonnes-1){
						Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder - 1 ];
					}else{
						Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder - 1];
					}
					
				}
				if (remainder > (LL-1)%nbr_colonnes + 1){ // après le décalage +1
					if(remainder==nbr_colonnes-1){
						Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient)*nbr_colonnes + remainder - 1];
					}else{
						Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 ];
					}
				}
			}

			// AVANT DERNIERE LIGNE QUAND LA DERNIERE EST PLEINE /////////////////////////////////////////////////////////////////////////////////////////////	
			if (quotient == nbr_lignes -2  && (LL-1)%nbr_colonnes ==nbr_colonnes-1 ){ 

				if( remainder== 0 || remainder== nbr_colonnes-1 ){
					if(remainder== 0){ 
						Vois[i] = [(quotient-1)*nbr_colonnes + remainder , (quotient-1)*nbr_colonnes + remainder +1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder ,  (quotient+1)*nbr_colonnes + remainder + 1 ];
					}
					if(remainder== nbr_colonnes-1){ 
						Vois[i] = [(quotient-1)*nbr_colonnes + remainder-1 , (quotient-1)*nbr_colonnes + remainder  , (quotient)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder -1,  (quotient+1)*nbr_colonnes + remainder  ];
					}
				}else{
					Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder  , (quotient+1)*nbr_colonnes + remainder + 1 ];
				}
			}


			// LIGNE INFERIEURE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 			if(quotient == nbr_lignes -1){


				if ((LL-1)%nbr_colonnes==0 || (LL-1)%nbr_colonnes==1 || (LL-1)%nbr_colonnes==nbr_colonnes-1){
					if((LL-1)%nbr_colonnes==0){ // La ligne inférieure comporte un élément
						Vois[i] = [(quotient-1)*nbr_colonnes  , (quotient-1)*nbr_colonnes + 1]; 
					}

					if((LL-1)%nbr_colonnes==1){ // La ligne inférieure comporte deux éléments
						if (remainder == 0 ){ // gauche
							Vois[i] = [(quotient-1)*nbr_colonnes  , (quotient-1)*nbr_colonnes + 1 , (quotient)*nbr_colonnes + 1]; 
						}
						if (remainder == 1 ){ // droite  
							Vois[i] = [(quotient-1)*nbr_colonnes  , (quotient-1)*nbr_colonnes + 1 , (quotient-1)*nbr_colonnes + 2, (quotient)*nbr_colonnes ];
						}
					}

					if((LL-1)%nbr_colonnes==nbr_colonnes-1){ // La ligne inférieure est pleine

						if (remainder == 0 ){ // gauche
							Vois[i] = [(quotient-1)*nbr_colonnes  , (quotient-1)*nbr_colonnes + 1 , (quotient)*nbr_colonnes + 1]; 
						}

						if (remainder != 0 &&  remainder != nbr_colonnes-1 ){ // centre 
							Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1   ];
						}

						if (remainder == nbr_colonnes-1 ){ // coin droit  
							Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder , (quotient)*nbr_colonnes + remainder - 1 ];
						}
					}
				}else{
					// Ligne inférieure cas général

					if (remainder == 0 ){ // gauche
						Vois[i] = [(quotient-1)*nbr_colonnes  , (quotient-1)*nbr_colonnes + 1 , (quotient)*nbr_colonnes + 1]; 
					}

					if (remainder == (LL-1)%nbr_colonnes ){ // coin droit  
						Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder ,  (quotient-1)*nbr_colonnes + remainder+1, (quotient)*nbr_colonnes + remainder - 1 ];
					}

					if (remainder != 0 &&  remainder != (LL-1)%nbr_colonnes ){ // centre 
						Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1   ];
					}
				}

			}


            /////////////////////////////////////////////////// cas général ///////////////////////////////////////////////////////
			if (quotient > 0  &&  quotient < nbr_lignes-2 && remainder != 0 &&  remainder != nbr_colonnes-1 ){ // case du centre 
				Vois[i] = [(quotient-1)*nbr_colonnes + remainder - 1 , (quotient-1)*nbr_colonnes + remainder  , (quotient-1)*nbr_colonnes + remainder + 1 , (quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder  , (quotient+1)*nbr_colonnes + remainder + 1 ];
			}


			if (remainder == 0   && quotient > 0 &&  quotient < nbr_lignes-2 ){ // centre de la colonne gauche
				Vois[i] = [(quotient-1)*nbr_colonnes + remainder , (quotient-1)*nbr_colonnes + remainder +1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder ,  (quotient+1)*nbr_colonnes + remainder + 1 ];
			}
			if (remainder == nbr_colonnes-1   && quotient > 0 &&  quotient < nbr_lignes-2 ){ // centre de la colonne droite
				Vois[i] = [(quotient-1)*nbr_colonnes + remainder-1 , (quotient-1)*nbr_colonnes + remainder  , (quotient)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder -1,  (quotient+1)*nbr_colonnes + remainder  ];
			}

		} 






	} // fin boucle for

    initialState();
	updateTexte();

} // FIN de la fonction updateRect
























////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// FONCTIONNEMENT ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Mettre la classe dans son etat initial /////////////////
function localInitialState(RRect) { 
	RRect.classList.remove('rectOn');
	RRect.addEventListener('click', function(){
		RRect.classList.remove('rectOn');
	});
} 
 
function initialState(){
    cpt = 0;
	Rect.forEach(localInitialState);
}



// action du pivert ////////////////////////////////////////////
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
	/// ne pas faire si on a qu'une seule ligne sinon àa bloque ///
	let LL = document.getElementById("curseur").value;
	if(LL > 11){
    	while(test_index==indexDeepCopy){
			alea = Math.floor(Math.random()*K);
			test_index = Vois[rect_index][alea];
		}
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




document.getElementById("curseur").value = 32;
document.getElementById("nombre").value = 32;

updateRect();
updateTexte();






////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// ZONE DE TEXTE /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

$("#menu").draggable();

$(".editor").resizable({
	handles: 's'
});


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


	for( i=0; i<Rect.length; i++){

		Texte[i] = document.createElement('div');
		Texte[i].id = 'prenom' + i.toString();
		Texte[i].classList.add('prenom');
	    Texte[i].textContent = maListe[i];

		Rect[i].appendChild(Texte[i]); 
	}


	numberOfLines = textarea.value.split('\n').length;

    lineNumbers.innerHTML = Array(numberOfLines)
	.fill('<span></span>')
	.join('')

	document.querySelector('.editor').style.height = 'auto';

}



textarea.addEventListener('keyup', event => {
    numberOfLines = event.target.value.split('\n').length;

    lineNumbers.innerHTML = Array(numberOfLines)
	.fill('<span></span>')
	.join('')
});


textarea.addEventListener('keyup', updateTexte,false);


textarea.addEventListener('keydown', event => {
  if (event.key === 'Tab') {
	const start = textarea.selectionStart
	const end = textarea.selectionEnd

	textarea.value = textarea.value.substring(0, start) + '\\t' + textarea.value.substring(end)

	event.preventDefault()
  }
});




/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// CURSEURS ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

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





///////////////////////////////////////////////////////////////////////////////
/////////////////////// SWITCH VIEW ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

document.getElementById('switch_view').addEventListener('click',switch_view_function);


function switch_view_function(){

    eleve_view = !eleve_view; // on change de mode

	let allCells = $('.rectangle');
	let pivert=  document.getElementById('bird_cage');
	let rot_cont = document.getElementById('rotation_container');

	if(rot_cont.classList.contains('prof_view')){
		rot_cont.classList.remove('prof_view');
		// pivert.classList.remove('prof_view');

		for (i=0; i< allCells.length; i++){
			allCells[i].classList.remove('prof_view');

		}

	}else{
		rot_cont.classList.add('prof_view');
		// pivert.classList.add('prof_view');

		for (i=0; i< allCells.length; i++){
			allCells[i].classList.add('prof_view');	
			

		}
	}
}











///////////////////////////////////////////////////////////////////////////////
/////////////////////// EXPORTER IMAGE ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


$(document).ready(function () {
	


	$('#bouton_img').on('click',function(){

		$('#menu').css('display' , 'none');
		$('#actions').css('display' , 'none');
		$('#woodpecker').css('display' , 'none');
		$('.box_number').css('display' , 'none');


		$('#dragcontainer').css('box-shadow', 'none');
		$('#dragcontainer').css('margin-left', 'auto');
		$('#dragcontainer').css('margin-right', 'auto');

		$('#dragcontainer').css('margin-top', '0px');
		$('#nurserie').css('border', '0px');

		$('body').css('display', 'flex');
		$('body').css('align-items', 'center');
		$('footer').css('display', 'none');






		html2canvas(document.body).then(function (canvas){
			var anchorTag = document.createElement("a");
			document.body.appendChild(anchorTag);
			// document.getElementById("previewImg").appendChild(canvas);
			anchorTag.download = "maclasse.jpg";
			anchorTag.href = canvas.toDataURL();
			anchorTag.target = '_blank';
			anchorTag.click();

		});

		$('body').css('display', 'block');
		$('footer').css('display', 'block');

		$('#dragcontainer').css('box-shadow', '25px 0 20px -20px rgba(0, 0, 0, 0.45)');
		$('#dragcontainer').css('margin-left', '10vw');
		$('#dragcontainer').css('margin-right', 'auto');
		 $('#dragcontainer').css('margin-top', '5vh');

		 $('#nurserie').css('border', '1px dotted black');


		$('#menu').css('display' , 'block');
		$('#actions').css('display' , 'flex');
		$('.box_number').css('display' , 'block');
		$('#woodpecker').css('display' , 'block');

	});

});







///////////////////////////////////////////////////////////////////
//////////////////// FILE READER //////////////////////////////////
///////////////////////////////////////////////////////////////////

var classState;

document.querySelector("#file").addEventListener('change', function() {

	if(document.querySelector("#file").files.length == 0) {
		alert('Error : No file selected');
		return;
	}

	// file selected by user
	let file = document.querySelector("#file").files[0];

	// file name
	let file_name = file.name;
	console.log(file_name);

	// file MIME type
	let file_type = file.type;
	console.log(file_type);

	// file size in bytes
	let file_size = file.size;
	console.log(file_size);


	// Reader
	var vReader = new FileReader();
	vReader.readAsText(file);



	vReader.onload = function(pEvent) {
    // String Input
    	var vContent = pEvent.target.result;   
    	// JSON to object
    	var vJson = JSON.parse(vContent); 

		classState = vJson;  
		
		////////////////////////////////////////////////////////////////////////////
		/////////////////// PRISE EN COMPTE DES NOUVELLES DONNEES //////////////////
		////////////////////////////////////////////////////////////////////////////
		for (i=0; i< Rect.length; i++){

			Rect[i].className = '';
    	    let myclass = classState.eleves[i].class;
			let size = Object.keys(myclass).length;

			for (j=0; j < size; j++){

				Rect[i].classList.add(myclass[j]);

			}

			if(Rect[i].classList.contains('displayed')){
				Rect[i].style.display = "block";
			}else{
				Rect[i].style.display = "none";
			}
		
			Rect[i].style.left = classState.eleves[i].left;
			Rect[i].style.top = classState.eleves[i].top;
			Rect[i].style.width = classState.eleves[i].width;
			Rect[i].style.height = classState.eleves[i].height;
			Rect[i].style.zIndex = classState.eleves[i].altitude;
		}


		textarea.value=classState.prenoms;
		updateTexte();


		document.getElementById('nombre').value = classState.nbr;
		let monCurseur =  document.getElementById('curseur');
		monCurseur.value = classState.nbr;
        

		const mmmin = monCurseur.min;
  		const mmmax = monCurseur.max;
  		const vvval = monCurseur.value;
  
 		monCurseur.style.backgroundSize = (vvval - mmmin) * 100 / (mmmax - mmmin) + '% 100%';


		 document.getElementById('prof').style.left = classState.prof.lleft;
		 document.getElementById('prof').style.top = classState.prof.ttop;
		 document.getElementById('prof').style.zIndex = classState.prof.altitude;
		

		//  $('#prof').css('left', classState.prof.lleft);
		//  $('#prof').css('top', classState.prof.ttop);

	}

	// 	
});


// 



/////////////////////////////////////////////////////////////////////////////////////
///////////////////  Export data Downloadable JSON File ////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function exportToJsonFile(jsonData) {
	// console.log(jsonData);
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'maclasse.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}





document.getElementById('export_button').addEventListener('click', function() {

	var eleves_data = new Array(taille);

	for (i=0; i<Rect.length; i++){
		let monRect= Rect[i];
		let mesclass = Object.values(monRect.classList);


		eleves_data[i] = {class : mesclass,
			             left : monRect.style.left,
						 top : monRect.style.top,
						 width : monRect.style.width,
						 height : monRect.style.height,
						 altitude : monRect.style.zIndex};
	
	}


	var prof_data = {lleft : document.getElementById('prof').style.left,
		             ttop : document.getElementById('prof').style.top,
					 altitude :  document.getElementById('prof').style.zIndex
					};


	const nombre_de_cellules = document.getElementById("curseur").value;
	const texta = document.querySelector('#zone_texte').value;

	
	var data = {eleves : eleves_data, prof: prof_data, nbr: nombre_de_cellules, prenoms: texta};
	
	exportToJsonFile(data);

});




