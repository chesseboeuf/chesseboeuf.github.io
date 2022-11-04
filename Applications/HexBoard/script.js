////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// importation des hexagones du document svg /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var hex = document.querySelectorAll("#layer3 use");


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////  Mettre le jeu dans son etat initial ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function localInitialState(Hex){
     Hex.classList.remove('heldByBlue' , 'heldByRed' ,'eyedByRed', 'victory');
     Hex.classList.add("free" , "eyedByBlue");
}  
 
function initialState(){
    victory=false;
	threat='blue';
	hex.forEach(localInitialState);
    components=[];
    document.querySelector("#blueHexButton").classList.replace('blueButtonOff', 'blueButtonOn');
    document.querySelector("#redHexButton").classList.replace('redButtonOn', 'redButtonOff');
    
	for (var i=0; i<11;i++)
    	{
			for(var j=0; j<11;j++)
			{
				board[i][j]={id: coordToId([i,j]) , state:'f'}; // f pour 'free' b pour 'heldByBlue' et r pour 'heldByRed'
			}
		}

    back='closed'; // pour la fonction RETURN
    oldBoard=[]; // pour la fonction RETURN
    oldComponents=[]; // pour la fonction RETURN
    id_played_hex = ''; // pour la fonction RETURN
    document.querySelector("#boutonRetour").classList.add('unavailable');
}


///////////////////// Mettre a jour la menace ///////////////////////////////////////
function updateThreatColor(){
	function localUpdate(HEX){
		if (threat ==='blue'){
           HEX.classList.replace('eyedByRed','eyedByBlue');
        } 
        else {
           HEX.classList.replace('eyedByBlue','eyedByRed');
        }
	}
document.querySelectorAll("use.free").forEach(localUpdate);
}



/////////////////// identidiant <-----------> coordonnées ///////////////////////////////
function idToCoord(Hex){
    var id = Hex.id;
    var temp = id.split("");
    if (temp.length === 3){
      temp[1] = temp[1]+temp[2];
    } else{}

    var coordx=alphabet.indexOf(temp[0]);
    var coordy=nombres.indexOf(temp[1]);
    return [coordx, coordy];
    
}


function coordToId(coord){
    return alphabet[coord[0]] + nombres[coord[1]];   
}


/////////////////////// Mettre a jour le tabeau representant le jeu //////////////////////////////

function updateBoard(Hex){
	var x=idToCoord(Hex)[0];
    var y=idToCoord(Hex)[1];
    if(threat=='blue'){
    	board[x][y].state='b';
    } else{
    	board[x][y].state='r';   	    
    }   
}


function HexComponentIndex(id){
    var i=0;
    var test=false;
    while(!test && i<components.length){
    	test=components[i].includes(id);
        i=i+1;    
	}

   	return i-1;
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////::::::::::///// Traitement des tableaux  //////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////a utiliser avec la methode sort pour trier les tableau ////////////////////////////:
function compareNombres(a, b) {
    return a - b;
  }

//////////////////// supprimer les doublons et trier dans l'ordre croissant///////////////////////////////////
function remove_duplicates_and_sort(tab) { 

    var   uniq = [...new Set(tab)]; // on supprime les doublons
    var  uniq_et_sort = uniq.sort(compareNombres); // trier 

  return uniq_et_sort;
}


////////////////////////////// Deplace un element à la fin du tableau /////////////////////////////////////////////
function moveToEnd(tableau, index){ 
                 
                var valeur = tableau[index]
             
                tab2 = [];
                var partOne = tableau.slice(0, index)
                var partTwo = tableau.slice(index+1, tableau.length)
             
                tab2 = tab2.concat(partOne, partTwo)
             
                tab2.push(valeur)
                return tab2
            }



///////////////a utiliser avec la methode sort pour trier les tableau ////////////////////////////:
function compareNombres(a, b) {
  return a - b;
}




////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Trouver les voisins d'un hexagone ///////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

function neighbours(Hex){

	var coord=idToCoord(Hex);
    var x=coord[0];
    var y=coord[1];
    var tempSet=[[x-1,y], [x,y-1] , [x+1 , y-1] , [x+1, y] , [x , y+1] , [x-1,y+1] ] ; 
	var set=[];
    for (const value of tempSet) {
    	if (value[0]>-1 && value[0]<11 && value[1]>-1 && value[1]<11){
        	set.push(value)
        } else{}
    }
    return set;
}

function coloredNeighbours(Hex){
      var coord= idToCoord(Hex);
      var x=coord[0];
      var y=coord[1];
      var hexState=board[x][y].state; 
      var tempSet=neighbours(Hex);
      var set=[];
      for (const value of tempSet){
    	  if (board[value[0]][value[1]].state === hexState){
        	  set.push(coordToId(value));
          } else{}
      }
      return set; // tableau des identifiants des voisins           
}




function analyse(color,component){

    const leftSide=['A1','A2','A3','A4','A5','A6','A7','A8','A9','A10','A11'];
    const rightSide=['K1','K2','K3','K4','K5','K6','K7','K8','K9','K10','K11'];
    const topSide=['A1','B1','C1','D1','E1','F1','G1','H1','I1','J1','K1'];
    const bottomSide=['A11','B11','C11','D11','E11','F11','G11','H11','I11','J11','K11'];
    var link=false;

	if(color==='b'){
        var i=0;
        var j=0;
        var left=false;
        var right=false;
        
		while(!left && i<=10){
       		 left=component.includes(leftSide[i]);
             i=i+1; 
        }
        while(!right && j<=10){
             right=component.includes(rightSide[j]);
             j=j+1;
        }
		if(left && right){
          link=true;
        } else{}

    }else{
         var i=0;
         var j=0;
         var top=false;
         var bottom=false;
        
		 while(!top && i<=10){
       	 	 top=component.includes(topSide[i]);
             i=i+1; 
         }
         while(!bottom && j<=10){
              bottom=component.includes(bottomSide[j]);
              j=j+1;
         }
		 if(top && bottom){
           link=true;
         } else{}
  
     }

	 return link;
}





//////////////// A CONFIRMER ////////////////////////

function updateComponents(Hex){
	  var coord= idToCoord(Hex);
      var x=coord[0];
      var y=coord[1];
      var hexColor = board[x][y].state; 
      var vois = coloredNeighbours(Hex);
      var newComponent=[];

	  switch (vois.length){
     	 case 0 :
        	components.push([Hex.id]);
       	    break;

      	 case 1 :     
        	 var id=vois[0];
             var ind=HexComponentIndex(id);
      		 components[ind].push(Hex.id);
             newComponent=components[ind];
             components.splice(ind,1); 
             components.push(newComponent); // la nouvelle composante est placée à la fin
        	 victory = analyse(hexColor,newComponent);
           	 break;

      	 default : // instructions réalisées quand il y a plusieurs voisins
            var index=[];
        	newComponent=[Hex.id];

       		for (const id of vois) {
                var ind=HexComponentIndex(id);
                index.push(ind);
            }

            index = remove_duplicates_and_sort(index); 

            for(var i = index.length-1; i >= 0; i--){
                newComponent=newComponent.concat(components[index[i]]); 
                components.splice(index[i],1);
            } 

            components.push(newComponent); // la nouvelle composante est placée à la fin
            victory = analyse(hexColor,newComponent);    
             
	  }    	
}





///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// Fonction des deux boutons rouge et bleu ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
function pushBlueHexButton(){
   threat = 'blue';
   updateThreatColor();
   document.querySelector("#blueHexButton").classList.replace('blueButtonOff', 'blueButtonOn');
   document.querySelector("#redHexButton").classList.replace('redButtonOn', 'redButtonOff');
}


function pushRedHexButton(){
   threat = 'red';
   updateThreatColor();
   document.querySelector("#redHexButton").classList.replace('redButtonOff', 'redButtonOn');
   document.querySelector("#blueHexButton").classList.replace('blueButtonOn', 'blueButtonOff');
}


function victoryMode(){
        var  vComp=components[components.length-1];
      
      	for(const value of vComp){
    	    document.querySelector('#' + value).classList.add('victory');
        }       

        for (var i = 0; i < document.querySelectorAll('.free').length; i++){
            document.querySelectorAll('.free')[i].classList.remove('eyedByBlue', 'eyedByRed' )
        }

        document.querySelector("#twoPlayerButton").classList.replace('twoPlayerButtonOn', 'twoPlayerButtonOff');
}


////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Fonction principale ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

function playThisHex(HEX){

    id_played_hex= '#' + HEX.id;
////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// mode twoPlayers //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

    switch(mode){
     	 case 'twoPlayer' :      	    
	   		 if (threat==='blue'){
			    if (HEX.classList.contains('eyedByBlue')) { 
	    	         HEX.classList.replace( 'eyedByBlue' ,'heldByBlue');
	    	         HEX.classList.remove('free');

                     let deepCopyOfBoard=JSON.parse(JSON.stringify(board)); // voir deep copy pour comprendre
                     oldBoard=deepCopyOfBoard; // Si on se contente de oldBoard=Board sa ne marche pas
                     updateBoard(HEX);

                     let deepCopyOfComponents=JSON.parse(JSON.stringify(components)); // voir deep copy pour comprendre
                     oldComponents=deepCopyOfComponents;  // Si on se contente de oldComponents=components sa ne marche pas
                     updateComponents(HEX);

                     //// a confirmer
                     if(victory){
                       victoryMode();
                     }else{pushRedHexButton()}

	    	    } else {}
	    	} else {
			      if (HEX.classList.contains('eyedByRed')) { 
	    	         HEX.classList.replace( 'eyedByRed' ,'heldByRed');
	    	         HEX.classList.remove('free');

                     let deepCopyOfBoard=JSON.parse(JSON.stringify(board)); // voir deep copy pour comprendre
                     oldBoard=deepCopyOfBoard; // Si on se contente de oldBoard=Board sa ne marche pas
                     updateBoard(HEX);

                     let deepCopyOfComponents=JSON.parse(JSON.stringify(components)); // voir deep copy pour comprendre
                     oldComponents=deepCopyOfComponents; // Si on se contente de oldComponents=components sa ne mrche pas
                     updateComponents(HEX);
                     //// a confirmer
                     if(victory){
                       victoryMode();
                     }else{pushBlueHexButton()}

	    	     } else{}

	       } 

           back='opened';
           document.querySelector("#boutonRetour").classList.remove('unavailable');

      break;
	
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// mode freeBoard ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
      case 'freeBoard' :
	      if (threat==='blue'){
			 if (HEX.classList.contains('eyedByBlue')) { 
	    	     HEX.classList.replace( 'eyedByBlue' ,'heldByBlue');
	    	     HEX.classList.remove('free');
	    	 } else {
	    	        HEX.classList.remove('heldByBlue') , HEX.classList.remove('heldByRed') ,  HEX.classList.add('eyedByBlue') , HEX.classList.add('free');
	    	 }
	      } else {
			    if (HEX.classList.contains('eyedByRed')) { 
	    	        HEX.classList.replace( 'eyedByRed' ,'heldByRed');
	    	        HEX.classList.remove('free');
	    	    } else {
	    	           HEX.classList.remove('heldByRed') , HEX.classList.remove('heldByBlue') ,  HEX.classList.add('eyedByRed'), HEX.classList.add('free');	       
	            }
	     } 

		
      break;

       default:
   }

}





function RETURN(){

    if (!victory && back==='opened'){

        let deepCopyOfOldBoard=JSON.parse(JSON.stringify(oldBoard)); // voir deep copy pour comprendre
        board=deepCopyOfOldBoard;

        let deepCopyOfOldComponents=JSON.parse(JSON.stringify(oldComponents)); // voir deep copy pour comprendre
        components=deepCopyOfOldComponents; 



        if (threat==='blue'){
            pushRedHexButton();
            document.querySelector(id_played_hex).classList.remove('heldByRed');
            document.querySelector(id_played_hex).classList.add('free', 'eyedByRed');
        } else{
            pushBlueHexButton();
            document.querySelector(id_played_hex).classList.remove('heldByBlue');
            document.querySelector(id_played_hex).classList.add('free', 'eyedByBlue');
        }
        back = 'closed';
    }

    if (victory && back==='opened'){

        let deepCopyOfOldBoard=JSON.parse(JSON.stringify(oldBoard)); // voir deep copy pour comprendre
        board=deepCopyOfOldBoard;

        let deepCopyOfOldComponents=JSON.parse(JSON.stringify(oldComponents)); // voir deep copy pour comprendre
        components=deepCopyOfOldComponents; 


        if (threat==='blue'){
            document.querySelector(id_played_hex).classList.remove('victory', 'heldByBlue');
            document.querySelector(id_played_hex).classList.add('free', 'eyedByBlue');


            var victoryComp = document.querySelectorAll('.victory');
            for (var i = 0; i < victoryComp.length; i++){
                victoryComp[i].classList.remove('victory');
            }

            for (var i = 0; i < document.querySelectorAll('.free').length; i++){
                document.querySelectorAll('.free')[i].classList.add('eyedByBlue');
            }


        } else{
            document.querySelector(id_played_hex).classList.remove('victory', 'heldByRed');
            document.querySelector(id_played_hex).classList.add('free', 'eyedByRed');


            var victoryComp = document.querySelectorAll('.victory');
            for (var i = 0; i < victoryComp.length; i++){
                victoryComp[i].classList.remove('victory');
            }

            for (var i = 0; i < document.querySelectorAll('.free').length; i++){
                document.querySelectorAll('.free')[i].classList.add('eyedByRed');
            }


        }

     
        victory = false;
        back = 'closed';

        document.querySelector("#twoPlayerButton").classList.replace('twoPlayerButtonOff', 'twoPlayerButtonOn');
        document.querySelector("#boutonRetour").classList.add('unavailable');

    }

    document.querySelector("#boutonRetour").classList.add('unavailable');
    
}








////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Activitation des hexagones  /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
function activateOneHex(HEX){
	HEX.addEventListener('click', function(){playThisHex(HEX)}, false);
   
}
function activateAllHex(){
	hex.forEach(activateOneHex);
}



///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// Fonction des deux boutons Freeboard et TwoPlayer ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

function pushFreeBoardButton(){
      mode='freeBoard';
      initialState();
      pushBlueHexButton();
      activateAllHex();
  
      document.querySelector("#blueHexButton").addEventListener('click',pushBlueHexButton, false);
      document.querySelector("#redHexButton").addEventListener('click',pushRedHexButton, false);

      document.querySelector("#twoPlayerButton").classList.replace('twoPlayerButtonOn', 'twoPlayerButtonOff');
      document.querySelector("#freeBoardButton").classList.replace('freeBoardButtonOff', 'freeBoardButtonOn');
}

function pushTwoPlayerButton(){
      mode='twoPlayer';
      initialState();
      pushBlueHexButton();
      activateAllHex();

      document.querySelector("#blueHexButton").removeEventListener('click',pushBlueHexButton, false);
      document.querySelector("#redHexButton").removeEventListener('click',pushRedHexButton, false);

      document.querySelector("#freeBoardButton").classList.replace('freeBoardButtonOn', 'freeBoardButtonOff');
      document.querySelector("#twoPlayerButton").classList.replace('twoPlayerButtonOff', 'twoPlayerButtonOn');
}







///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// variables globales /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

var alphabet = ["A","B","C","D","E","F","G","H","I","J","K"];
var nombres = ['1','2','3','4','5','6','7','8','9','10','11'];

var board = new Array(11);      // tableau represantant l etat du jeu 
for (var i = 0; i < 11; i++)
{
 	board[i] = new Array(11);
}

var mode='freeBoard';   // or 'freeBoard'
var threat = 'blue';  // or 'red'
var components=[];
var victory=false;

var back='closed'; // pour la fonction RETURN
var oldBoard=[]; // pour la fonction RETURN
var oldComponents=[]; // pour la fonction RETURN
var id_played_hex = ''; // pour la fonction RETURN

initialState();
activateAllHex();

document.querySelector("#blueHexButton").addEventListener('click',pushBlueHexButton, false);
document.querySelector("#redHexButton").addEventListener('click',pushRedHexButton, false);

document.querySelector("#freeBoardButton").addEventListener('click',pushFreeBoardButton, false);
document.querySelector("#twoPlayerButton").addEventListener('click',pushTwoPlayerButton, false);


document.querySelector("#boutonRetour").addEventListener('click',RETURN, false);
