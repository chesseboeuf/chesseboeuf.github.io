//////////////////////////////////////////////////////////////////////////////////
///////////////////////// FADEIN AU CHARGEMENT ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
$(window).on('load', function (e) {

    $(body).fadeIn(1000,function(){});	


	document.getElementById("curseur").value = 32;
	document.getElementById("nombre").value = 32;

	updateRect();
});



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLES GLOBALES /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// var xMax=100;  // on travail en pourcentages du parent (#nurserie)
// var yMax=100;
var taille = Number(document.getElementById('curseur').max);

// les wrapper sont les parents directs des rectangles
// Cette technique est necessaire pour regler le petit bug causé par l'utilisation simultanée de Jquery draggable et Jquery rotatable.
// wrapper est l'element draggable
// Rect est l'element rotatable et selectable
// wrapper : postion, taille
// Rect : style
var wrapper = new Array(taille);
var Rect = new Array(taille);
var cellAngle = new Array(taille);
var rectId = new Array(taille);
var wrapperId = new Array(taille);
var Numero = new Array(taille);
var Vois = new Array(taille);
var gridSize =5; // tailler de la grille sur laquelle on deplace (drag) les cellules


/////////////////////////////////// Variables du pivert /////////////////////////////////
// On creer la variable rect_index pour le fonctionnement du pivert
// Une première valeur lui sera attribuee au premier appel de updateRect (donc au chargement de la page).
let rect_index;
var cpt=0;
let indexDeepCopy=-2;
var pivert = document.getElementById('woodpecker');
var audio1 = new Audio('Audio/pop-alert-2354.mp3');
var audio2 = new Audio('Audio/sonic_ring.mp3');
audio2.volume = 0.01;


////////////////////////// Variables de la zone de texte /////////////////////////////
const textarea = document.querySelector('#zone_texte');
const lineNumbers = document.querySelector('.line-numbers');
var numberOfLines = 0;


////////////////////////// Autres variables globales //////////////////////////////
var eleve_view =true; // la vue par défaut est la vue élève.
var number_visible = true // au début, les numero de cellules sont visibles 







////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////// CREATION DES CELLULES DANS LE HTML //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////


for (i=0 ; i<Rect.length ; i++){


	wrapper[i] =  document.createElement('div');
	Rect[i] = document.createElement('div');
	document.getElementById('nurserie').appendChild(wrapper[i]);
	wrapperId[i]= 'wrapper' + i.toString();
	wrapper[i].id = wrapperId[i];
	wrapper[i].classList.add('wrapper');
	document.getElementById(wrapperId[i]).appendChild(Rect[i]);

	wrapper[i].style.display = "none"; 
	wrapper[i].style.position = 'absolute';
	Rect[i].classList.add('rectangle');
	rectId[i] = 'rect' + i.toString();
	Rect[i].id = rectId[i];


	cellAngle[i]=0;

	Numero[i] = document.createElement('div');
	document.getElementById(rectId[i]).appendChild(Numero[i]);

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


for (i=0 ; i<wrapper.length ; i++){

	$("#"+wrapperId[i]).draggable({
		containment: "#dragcontainer",
        multiple: true,
		stack: '.wrapper', // le wrapper deplacé se place tout en haut de la pile des elements de classe ".wrapper"
		handle: ".rectangle", // c'est en cliquant sur le rectangle (enfant de wrapper) qu'on peut dragger



		drag: function( event, ui ) {

			


				if(eleve_view==false){ // Si on est en vision prof (on a cliqué sur SWITCH)

					// la  cellule déplacée
					ui.position.left = $('#nurserie').width() - ui.position.left - $("#rect0").width() ;
					ui.position.top = $('#nurserie').height() - ui.position.top - $("#rect0").height() ;

					// le groupe selectionné (si il y en a un) suit la cellule deplacée
					let selected_cells = $('.wrapper.ui-selected.displayed');
					for(i=0; i< selected_cells.length; i++){
						let mySelectedCell = $('#'+selected_cells[i].id);
						var lll =  100 * mySelectedCell.position().left / $('#nurserie').width() ;
						var ttt = 100 * mySelectedCell.position().top / $('#nurserie').height() ;
						$(mySelectedCell).css("left", lll+'%');
						$(mySelectedCell).css("top", ttt+'%');

					}
		    	}
			},


		stop: function () {
					
			//////////// Compatibilité avec le RESIZE ///////////////
			// Par default draggable() convertit left et top en px.
			// Si on veut les remettre en pourcentage il faut ajouter
			// La function suivante

			if(eleve_view){ // Si on est en vision ELEVE


				// la cellule déplacée
				var l =     100 * $(this).position().left / $('#nurserie').width();
				var t =     100 * $(this).position().top / $('#nurserie').height()  ;
				$(this).css("left", l+'%');
				$(this).css("top", t+'%');


				// le groupe selectionné (si il y en a un) suit la cellule deplacée
				let selected_cells = $('.wrapper.ui-selected.displayed');
				for(i=0; i< selected_cells.length; i++){
					let mySelectedCell = $('#'+selected_cells[i].id);
					var lll =  100 * mySelectedCell.position().left / $('#nurserie').width() ;
					var ttt = 100 * mySelectedCell.position().top / $('#nurserie').height() ;
					$(mySelectedCell).css("left", lll+'%');
					$(mySelectedCell).css("top", ttt+'%');

				}


			}else{	// Si on est en vision PROF

				// Symmétrie de la cellule deplacée
				var l =   100 *(      $('#nurserie').width() -   $(this).position().left - $(this).width()   )    / $('#nurserie').width()      ;
				var t =   100 *(      $('#nurserie').height() -   $(this).position().top - $(this).height()   )    / $('#nurserie').height()     ;
				$(this).css("left", l+'%');
				$(this).css("top", t+'%');

				// le groupe selectionné (si il y en a un) suit la cellule deplacée
				let selected_cells = $('.wrapper.ui-selected.displayed');
				for(i=0; i< selected_cells.length; i++){
					let mySelectedCell = $('#'+selected_cells[i].id);
					var lll =  100*( $('#nurserie').width() -  mySelectedCell.position().left  -   mySelectedCell.width()   ) / $('#nurserie').width()    ;
					var ttt =  100*( $('#nurserie').height() -  mySelectedCell.position().top  -   mySelectedCell.height()   ) / $('#nurserie').height()   ;
					mySelectedCell.css("left", lll+'%');
					mySelectedCell.css("top", ttt+'%');
				}

			}






		},

	    grid: [gridSize, gridSize]
	});

}


$("#prof_wrapper").draggable({
	stack: '.wrapper',
	containment: "#dragcontainer",

	drag: function( event, ui ) {
			if(eleve_view==false){  // Si on est en vision prof (on a cliqué sur SWITCH)
				ui.position.left= $('#dragcontainer').width() - ui.position.left - $("#prof").width() ;
				ui.position.top= $('#dragcontainer').height() - ui.position.top - $("#prof").height() ;
			}
		},

	

	stop: function () {
		if(eleve_view==false){
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





//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////// SELECTIONNER LES CELLULES ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


$("#nurserie").selectable({
	filter: ".rectangle", // seulement les éléments rectangle sont selectable (pas leur enfants 'prenom' et 'number')
	
	selecting: function( event, ui ) {

		 // conloration des elements selectionnés
		 if (ui.selecting.classList.contains('colorified')){
		 ui.selecting.style.backgroundImage='linear-gradient(120deg, pink, rgba(255, 192, 203, 0) 70%)';
		 }else{
			 ui.selecting.style.backgroundColor='pink';
		 }
		  ui.selecting.parentNode.classList.add('ui-selected');



		// Les elements selectionnes non incline retourne sur la grille
		let theId =  ui.selecting.id;
		let stringIndex = theId.slice(4); // en enleve les 7 premiers caractères, c a dire 'wrapper'.
		let index = parseInt(stringIndex);
		let monAngle = cellAngle[index]; 
		let mySelectedCell = $('#wrapper'+stringIndex);


		if (monAngle%90 != 0  ){
			// nothing
		}else{

			if(eleve_view){ // Si on est en vision ELEVE

				//repositionnement sur la grille
				let tttop = Math.round(mySelectedCell.position().top/gridSize) * gridSize;
				tttop = 100 * tttop/$('#nurserie').height();
				let llleft = Math.round(mySelectedCell.position().left/gridSize) * gridSize;
				llleft = 100 * llleft/$('#nurserie').width();

				mySelectedCell.css('left' , llleft.toString() +'%' );
				mySelectedCell.css('top' , tttop.toString() +'%' );

			}else{// Si on est en vision PROF

				// Symmetrie
				let lll =  $('#nurserie').width() -  mySelectedCell.position().left  -   mySelectedCell.width()    ;
				let ttt =   $('#nurserie').height() -  mySelectedCell.position().top  -   mySelectedCell.height()  ;
				//repositionnement sur la grille
				let tttop = Math.round(ttt/gridSize) * gridSize;
				let llleft = Math.round(lll/gridSize) * gridSize;
				tttop = 100 * tttop/$('#nurserie').height();
				llleft = 100 * llleft/$('#nurserie').width();

				mySelectedCell.css("left", llleft+'%');
				mySelectedCell.css("top", tttop+'%');

			}	

		}
			
	},


	unselecting: function( event, ui ) {
		if (ui.unselecting.classList.contains('colorified')){
			ui.unselecting.style.backgroundImage='';
			}else{
			   ui.unselecting.style.backgroundColor='rgb(247,247,247)';
			}
		 ui.unselecting.parentNode.classList.remove('ui-selected');

 
	},


	
	selected: function( event, ui ) {
		if (ui.selected.classList.contains('colorified')){
		ui.selected.style.backgroundImage='linear-gradient(120deg, pink, rgba(255, 192, 203, 0) 70%)';
		}else{
			ui.selected.style.backgroundColor='pink';
		}
		 ui.selected.parentNode.classList.add('ui-selected');
   },


	unselected: function( event, ui ) {
		if (ui.unselected.classList.contains('colorified')){
			ui.unselected.style.backgroundImage='';
			}else{
				ui.unselected.style.backgroundColor='rgb(247,247,247)';
			}
			
	}


  });


///////////// SELECTION AVEC LE BOUTON CTRL /////////////////////////
document.addEventListener('keydown', checkKeyDown);
document.addEventListener('keyup', checkKeyUp);

let ctrlPressed = false;

function checkKeyDown ( event ) {

	if ( event.code == "ControlLeft" || event.code == "ControlRight") {

		ctrlPressed = true;

		$(".wrapper").draggable( 'disable' );
		$("#dragcontainer").draggable( 'disable' );

	} else {  }

};
  
function checkKeyUp ( event ) {

	if ( event.code == "ControlLeft" || event.code == "ControlRight") {

		if ( ctrlPressed ) { 
	
			$(".wrapper").draggable( 'enable' );
			$("#dragcontainer").draggable( 'enable' );

			ctrlPressed=false;

		 }

	}

};






// supprimer la selection (ou plutôt la couleur associée)
// quand on clique sur un rectangle qui n'en fait pas partie
$('.rectangle').mousedown(function(){

	if(!$(this).hasClass('ui-selected') && !ctrlPressed ){

		let selectedGroup = document.querySelectorAll(".ui-selected.rectangle.displayed");

		for (i=0 ; i<selectedGroup.length ; i++){
			let mySelectedCell = selectedGroup[i];
			if(mySelectedCell.classList.contains('colorified')){
				mySelectedCell.style.backgroundImage='';
			}else{
				mySelectedCell.style.backgroundColor='rgb(247,247,247)';
			}

		}

	}



		// Les elements selectionnes non incline retourne sur la grille
		let theId =  $(this).attr('id')
		let stringIndex = theId.slice(4); // en enleve les 7 premiers caractères, c a dire 'wrapper'.
		let index = parseInt(stringIndex);
		let monAngle = cellAngle[index]; 
		let mySelectedCell = $('#wrapper'+stringIndex);


		if (monAngle%90 != 0  ){
			// nothing
		}else{

			if(eleve_view){ // Si on est en vision ELEVE

				//repositionnement sur la grille
				let tttop = Math.round(mySelectedCell.position().top/gridSize) * gridSize;
				tttop = 100 * tttop/$('#nurserie').height();
				let llleft = Math.round(mySelectedCell.position().left/gridSize) * gridSize;
				llleft = 100 * llleft/$('#nurserie').width();

				mySelectedCell.css('left' , llleft.toString() +'%' );
				mySelectedCell.css('top' , tttop.toString() +'%' );

			}else{// Si on est en vision PROF

				// Symmetrie
				let lll =  $('#nurserie').width() -  mySelectedCell.position().left  -   mySelectedCell.width()    ;
				let ttt =   $('#nurserie').height() -  mySelectedCell.position().top  -   mySelectedCell.height()  ;
				//repositionnement sur la grille
				let tttop = Math.round(ttt/gridSize) * gridSize;
				let llleft = Math.round(lll/gridSize) * gridSize;
				tttop = 100 * tttop/$('#nurserie').height();
				llleft = 100 * llleft/$('#nurserie').width();

				mySelectedCell.css("left", llleft+'%');
				mySelectedCell.css("top", tttop+'%');

			}	

		}








});








////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// ACTIONS DE LA TABLE DU PROF ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////
////////////////////// COLORATION DES CELLULES SELECTIONNEES ////////////////////////
/////////////////////////////////////////////////////////////////////////////////////  


var coloration = function(couleur){

	let selected_cells = $('.rectangle.ui-selected');
	for(i=0; i< selected_cells.length; i++){
		let mySelectedCell = $('#'+selected_cells[i].id);
		mySelectedCell.css('background',couleur);
		mySelectedCell.css('background-image', 'linear-gradient(120deg, pink, rgba(255, 192, 203, 0) 70%)');
		mySelectedCell.addClass('colorified');
	}

};



////////// couleur 1 /////////////////////
$('#color_front1').click( function(){

	let mycolor = $('#color_front1').css('background-color');
	coloration(mycolor);
});
////////// couleur 2 /////////////////////
$('#color_front2').click( function(){

	let mycolor = $('#color_front2').css('background-color');
	coloration(mycolor);
});	
////////// couleur 3 /////////////////////
$('#color_front3').click( function(){

	let mycolor = $('#color_front3').css('background-color');
	coloration(mycolor);
});
////////// couleur 4 /////////////////////
$('#color_front4').click( function(){

	let mycolor = $('#color_front4').css('background-color');
	coloration(mycolor);
});
////////// couleur 5 /////////////////////
$('#color_front5').click( function(){

	let mycolor = $('#color_front5').css('background-color');
	coloration(mycolor);
});


/////////////////////////////////////////////////////////////
/////////////// couleur perso ///////////////////////////////
var custom_coloration = function(){
	let mycolor = document.getElementById('color_picker').value;
	$("#custom_color_front").css('background-color',mycolor);

	coloration(mycolor);
};



document.getElementById('color_picker').addEventListener('input',custom_coloration,'false');
document.getElementById('color_picker').addEventListener('click',custom_coloration,'false');

$("#custom_color_front").click(function(){
    $("#color_picker").click();
});








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


///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// VISIBILITE DES NUMEROS DE CELLULE /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////  

document.getElementById('number_button').addEventListener('click',function(){

	$('.box_number').toggle();
	number_visible = !number_visible;

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


	for (i=0 ; i<wrapper.length ; i++){
		wrapper[i].style.display = "none";
		wrapper[i].classList.remove('displayed'); 
		Rect[i].classList.remove('displayed');
		$("#"+wrapperId[i]).draggable( 'disable' );
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


	let  xMax=$('#nurserie').width();
    let  yMax=$('#nurserie').height();

	var margeHorizontale = 0.02*xMax;
	var margeVerticale = 0.00*yMax;
    
    Vois = new Array(LL);
    var xx = 0;
    var yy = 0;
    
	var HrectWidthReducCoef = 0.7;
    var plainWidth = (xMax - 2*margeHorizontale)/nbr_colonnes;  
	var ww = HrectWidthReducCoef*plainWidth;
	let qww = Math.round(ww/gridSize);
	ww = qww*gridSize-1; // -1 pour éviter le chevauchement des bordures
	var HmargeInterieure =(plainWidth-ww)/2;  


	var VrectWidthReducCoef = 0.6;	
	var plainHeight = (yMax - 2*margeVerticale)/nbr_lignes; 
	var hh = VrectWidthReducCoef*plainHeight;
	hh=Math.min(hh,0.25*yMax);
	let qhh = Math.round(hh/gridSize);
	hh = qhh*gridSize -1; // -1 pour éviter le chevauchement des bordures
	var VmargeInterieure =(plainHeight-hh)/2;  

	// convertions en pourcentages
	ww = 100 * ww/xMax;
	hh = 100 * hh/yMax;


/////////////////////////////////////////////////////////////////////////////
//////////// CREATION DES RECTANGLES ET DE LEUR VOISINAGE ///////////////////
	for (var i = 0; i < LL; i++){ 

		$("#"+wrapperId[i]).draggable( 'enable' );

		var quotient = Math.floor(i/nbr_colonnes);
		var remainder = i % nbr_colonnes;

		xx = margeHorizontale +  remainder*plainWidth + HmargeInterieure; 
		let qxx = Math.round(xx/gridSize);
		xx= qxx*gridSize;
		yy = margeVerticale +  quotient*plainHeight + VmargeInterieure; 
		let qyy = Math.round(yy/gridSize);
		yy= qyy*gridSize;


		// convertions en pourcentages
		xx = 100 * xx/xMax;
		yy = 100 * yy/yMax;

        // applications
		wrapper[i].style.display = "block";
		Rect[i].style.display = "block";
		wrapper[i].classList.add('displayed');
		Rect[i].classList.add('displayed');
		wrapper[i].style.left = xx.toString()+'%';
		wrapper[i].style.top = yy.toString()+'%';
		wrapper[i].style.width = ww.toString()+'%';
		wrapper[i].style.height = hh.toString()+'%';


	

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
						Vois[i] = [(quotient)*nbr_colonnes + remainder - 1 , (quotient)*nbr_colonnes + remainder + 1 , (quotient+1)*nbr_colonnes + remainder - 1 , (quotient+1)*nbr_colonnes + remainder  , (quotient+1)*nbr_colonnes + remainder + 1 ];
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











////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// FONCTIONNEMENT GENERAL///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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






////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// ZONE DE TEXTE /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

$("#menu").draggable();

$(".editor").resizable({
	// handles: {
		// 's': '#southEditorGrip'
	// }

	// handles: {
        // 'nw': '#nwgrip',
        // 'ne': '#negrip',
        // 'sw': '#swgrip',
        // 'se': '#segrip',
        // 'n': '#ngrip',
        // 'e': '#egrip',
        // 's': '#sgrip',
        // 'w': '#wgrip'
    // }
	handles : 's'

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

function tourner(jqueryElement,degree){

let mem = jqueryElement.css('transform');

}


document.getElementById('switch_view').addEventListener('click',switch_view_function);


function switch_view_function(){

    eleve_view = !eleve_view; // on change de mode

	let allCells = $('.rectangle');
	let pivert=  document.getElementById('bird_cage');
	let rot_cont = document.getElementById('rotation_container');

	if(rot_cont.classList.contains('prof_view')){
		rot_cont.classList.remove('prof_view');

		for (i=0; i< allCells.length; i++){			
			cellAngle[i] = cellAngle[i] + 180;
			let monAngle = cellAngle[i];
			$('#' + allCells[i].id).css('transform','rotate(' +  monAngle.toString()  +'deg)');

			// allCells[i].classList.remove('prof_view');




		}
		document.getElementById('prof').classList.remove('prof_view');

	}else{
		rot_cont.classList.add('prof_view');

		for (i=0; i< allCells.length; i++){
			cellAngle[i] = cellAngle[i] - 180;
			let monAngle = cellAngle[i];
			$('#' + allCells[i].id).css('transform','rotate(' +  monAngle.toString()  +'deg)');

			// allCells[i].classList.add('prof_view');	
		}


		document.getElementById('prof').classList.add('prof_view');
	}
}









////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// ROTATION DES CELLULES ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


$(document).ready(function() {
	var params = {
		// Callback fired on rotation start.
		start: function(event, ui) {
		},
		// Callback fired during rotation.
		rotate: function(event, ui) {


			let monAngle = ui.angle.current * (180 /  Math.PI);
			if(!eleve_view){
				monAngle = (monAngle -180 ) % 360;
			}
			let selected_cells = $('.ui-selected.rectangle');
			for(i=0; i< selected_cells.length; i++){
				let mySelectedCell = $('#'+selected_cells[i].id);
				mySelectedCell.css('transform','rotate(' +  monAngle.toString()  +'deg)');

				// A terminer 
				let cellId = selected_cells[i].id;
				let stringIndex = cellId.slice(4); // en enleve les 4 premier caractères, c a dire 'rect'.
				let index = parseInt(stringIndex);
				cellAngle[index] = monAngle;
				
			}  

		},

		// A la fin de la rotation : 
		// Si la table n'est plus horizontale ou verticale, on drag en continue (on est plus bloquer sur la grille)
		// Sinon on drag sur la grille
		stop: function(event, ui) {
			let monAngle = ui.angle.current * (180 /  Math.PI);
			let selected_cells = $('.wrapper.ui-selected.displayed');
			
			if (monAngle%90 != 0  ){
				for(i=0; i< selected_cells.length; i++){
					let mySelectedCell = $('#'+selected_cells[i].id);
					// on drag en continu
					mySelectedCell.draggable( "option", "grid", false );
				}
			}else{
				for(i=0; i< selected_cells.length; i++){
					let mySelectedCell = $('#'+selected_cells[i].id);

					if(eleve_view){ // Si on est en vision ELEVE

						//repositionnement sur la grille
						let tttop = Math.round(mySelectedCell.position().top/gridSize) * gridSize;
						tttop = 100 * tttop/$('#nurserie').height();
						let llleft = Math.round(mySelectedCell.position().left/gridSize) * gridSize;
						llleft = 100 * llleft/$('#nurserie').width();

						mySelectedCell.css('left' , llleft.toString() +'%' );
						mySelectedCell.css('top' , tttop.toString() +'%' );

						// De nouveau on drag sur la grille
						mySelectedCell.draggable( "option", "grid", [gridSize,gridSize] );

					}else{// Si on est en vision PROF

						// Symmetrie
						let lll =  $('#nurserie').width() -  mySelectedCell.position().left  -   mySelectedCell.width()    ;
						let ttt =   $('#nurserie').height() -  mySelectedCell.position().top  -   mySelectedCell.height()  ;
						//repositionnement sur la grille
						let tttop = Math.round(ttt/gridSize) * gridSize;
						let llleft = Math.round(lll/gridSize) * gridSize;
						tttop = 100 * tttop/$('#nurserie').height();
						llleft = 100 * llleft/$('#nurserie').width();

						mySelectedCell.css("left", llleft+'%');
						mySelectedCell.css("top", tttop+'%');

						// De nouveau on drag sur la grille
						mySelectedCell.draggable( "option", "grid", [gridSize,gridSize] );

					}


				}



			}
		},
		// Set the rotation center
		rotationCenterOffset: {
			top: 0,
			left: 0
		},

		handle: $(document.createElement('img')).attr('src', 'Images/my_handle.png').css('transform','scale(0.5) translateX(50px)'),

		handleOffset :  {
			top: 0, 
			left: 0
		},

		transforms: {
			translate: '0%, 0%',
		},

		snap: true,
		step : 22.5,

	};

	$('#rotate_handler').rotatable(params);
});



////////////////////////////////////////////////////////////////////////
///////////// Positionnement de la molette de rotation /////////////////
////////////////////////////////////////////////////////////////////////


$(window).on('load resize', function () {

	let width = $('#rotate_handler').width();

	let right =  width/2;
	right = -100 * right / $('#prof').width();

    $('#rotate_handler').css('right', right+'%');

});


















///////////////////////////////////////////////////////////////////////////////
/////////////////////// EXPORTER IMAGE ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


$(document).ready(function () {
	


	$('#bouton_img').on('click',function(){

		$('#menu').css('display' , 'none');
		$('#actions').css('display' , 'none');
		$('#woodpecker').css('display' , 'none');
		$('#rotate_handler').css('display' , 'none');
		$('.box_number').css('display' , 'none');

		$('#number_button').css('display' , 'none');

		$('.color_front').css('display' , 'none');



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
		$('#woodpecker').css('display' , 'block');
		$('#rotate_handler').css('display' , 'flex');

		$('#number_button').css('display' , 'flex');

		$('.color_front').css('display' , 'block');


		if(number_visible){
			$('.box_number').css('display' , 'block');
		}


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

		// mise a jour des cellules eleves
		for (i=0; i< Rect.length; i++){

			let monRect= Rect[i];
			let monWrapper= wrapper[i];
			Rect[i].className = '';
			wrapper[i].className='';
    	    let myRectClass = classState.eleves[i].rectClass;
			let myWrapperClass = classState.eleves[i].wrapperClass;
			let r_size = Object.keys(myRectClass).length;
			let w_size = Object.keys(myWrapperClass).length;


			// Classes
	    	for (j=0; j < r_size; j++){
				Rect[i].classList.add(myRectClass[j]);
			}

			for (j=0; j < w_size; j++){
				wrapper[i].classList.add(myWrapperClass[j]);
			}

			// Visibilité
			if(Rect[i].classList.contains('displayed')){
				Rect[i].style.display = "block";
				wrapper[i].style.display="block";
			}else{
				Rect[i].style.display = "none";
				wrapper[i].style.display="none";
			}
		
			// Position
			wrapper[i].style.left = classState.eleves[i].left;
			wrapper[i].style.top = classState.eleves[i].top;
			wrapper[i].style.width = classState.eleves[i].width;
			wrapper[i].style.height = classState.eleves[i].height;
			wrapper[i].style.zIndex = classState.eleves[i].altitude;



			// Angle
			let monAngle = classState.eleves[i].angle;
			$('#'+monRect.id).css('transform','rotate(' +  monAngle.toString()  +'deg)');
			cellAngle[i]=monAngle;
			if (monAngle%90 != 0  ){
				$('#'+monWrapper.id).draggable( "option", "grid", false );
			}

			// Couleur
			$('#'+monRect.id).css('background-color',classState.eleves[i].backgroundColor);

			// On ne s'intéresse pas à ceux qui étaient selectionnés
			wrapper[i].classList.remove('ui-selected');
			Rect[i].classList.remove('ui-selected');
			$('#'+monRect.id).css('background-image','');

		}


		// mise a jour de la zone de texte
		textarea.value=classState.prenoms;
		updateTexte();


		// mise a jour du curseur
		document.getElementById('nombre').value = classState.nbr;
		let monCurseur =  document.getElementById('curseur');
		monCurseur.value = classState.nbr;
        
		const mmmin = monCurseur.min;
  		const mmmax = monCurseur.max;
  		const vvval = monCurseur.value;
  
 		monCurseur.style.backgroundSize = (vvval - mmmin) * 100 / (mmmax - mmmin) + '% 100%';


		// mise a jour de la cellule prof
		 document.getElementById('prof_wrapper').style.left = classState.prof.lleft;
		 document.getElementById('prof_wrapper').style.top = classState.prof.ttop;
		 document.getElementById('prof_wrapper').style.zIndex = classState.prof.altitude;


		 //mise a jour de la vue

		 if(classState.eleve_view){
			document.getElementById('prof').classList.remove('prof_view');
			document.getElementById('rotation_container').classList.remove('prof_view');

			eleve_view = true;
		 }else{
			document.getElementById('prof').classList.add('prof_view');
			document.getElementById('rotation_container').classList.add('prof_view');

			eleve_view = false;
		 }


		
	}

	document.getElementById('file').value = null;
});




/////////////////////////////////////////////////////////////////////////////////////
//////////////////////  Export data to downloadable JSON file ///////////////////////
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
		let monWrapper = wrapper[i];
		let monAngle = cellAngle[i];
		let mesclass_rect = Object.values(monRect.classList);
		let mesclass_wrapper = Object.values(monWrapper.classList);



		if(monRect.classList.contains('ui-selected') && !monRect.classList.contains('colorified')){
			$('#'+ monRect.id).css('background-color' , 'rgb(247,247,247)');
		}

		eleves_data[i] = {wrapperClass : mesclass_wrapper,
			              rectClass : mesclass_rect,
			              left : monWrapper.style.left,
						  top : monWrapper.style.top,
						  width : monWrapper.style.width,
						  height : monWrapper.style.height,
						  angle : monAngle,
						  backgroundColor :  $('#'+ monRect.id).css('background-color'),
						  altitude : monWrapper.style.zIndex};


		if(monRect.classList.contains('ui-selected') && !monRect.classList.contains('colorified')){
			$('#'+ monRect.id).css('background-color' , 'pink');
		}
	
	}



	var prof_data = {lleft : document.getElementById('prof_wrapper').style.left,
		             ttop : document.getElementById('prof_wrapper').style.top,
					 altitude :  document.getElementById('prof_wrapper').style.zIndex
					};

	var view_data= eleve_view;
	


	const nombre_de_cellules = document.getElementById("curseur").value;
	const texta = document.querySelector('#zone_texte').value;

	
	var data = {eleves : eleves_data, prof: prof_data, eleve_view:view_data, nbr: nombre_de_cellules, prenoms: texta};
	
	exportToJsonFile(data);

});




