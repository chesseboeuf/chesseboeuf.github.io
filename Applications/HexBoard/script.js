
//////////////////////// importation des hexagones du document svg /////////////////////////////////////////////////
var hex = document.querySelectorAll("#layer2 use");

////////////////////////// intialeState : Mettre le jeu dans son etat initial ////////////////////////////////////////
function localInitialState(Hex) { Hex.classList.remove('heldByBlue' , 'heldByRed' ,'eyedByRed', 'blueVictory', 'redVictory') ,  Hex.classList.add("free" , "eyedByBlue")} ; 
 
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

///////////////////// Traitement des tableaux  //////////////////////////////////////////////////


// supprimer les doublons dans un tableau  (a comprendre)
//   /!\  renvoie un tableau de caracteres donc il faudra utiliser parseInt après avoir appelé cette fonction 
function removeDuplicates(tab) { 
  let unique = {};
  tab.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

function moveToEnd(tableau, index){ // Deplace un element à la fin du tableau
                 
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
             // analyse
        	 victory = analyse(hexColor,newComponent);
           	 break;

      	 default : // instructions réalisées quand il y a plusieurs voisins;  PROBLEME ICI
            var index=[];
        	newComponent=[Hex.id];

       		for (const id of vois) {
                var ind=HexComponentIndex(id);
                index.push(ind);
            }
            index = removeDuplicates(index); // renvoie un tableau de caracteres

            for (var i=0 ; i<index.length ; i++) {  
				index[i] =  parseInt(index[i]);  // conversion des caracteres en nombres entiers
            }
            index.sort(compareNombres); // il faut utiliser sort avec 'compareNombre' pour que ça marche

            for(var i = index.length-1; i >= 0; i--){
                newComponent=newComponent.concat(components[index[i]]); 
                components.splice(index[i],1);
            } 

            components.push(newComponent); // la nouvelle composante est placée à la fin
            victory= analyse(hexColor,newComponent);    
             
	  }    	
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


////////////////////////////////// Trouver les voisins d'un hexagone ///////////////////////////
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




////////////////////////// Fonction des deux boutons rouge et bleu ////////////////////////////////////
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


function updateMode(){
        mode = 'endTwoPlayerGame';
        var  vComp=components[components.length-1];

        if (document.querySelector('#' + vComp[1] ).classList.contains('heldByBlue')){        
      	  for(const value of vComp){
        	document.querySelector('#' + value).classList.replace('heldByBlue', 'blueVictory');
          }
        } else {
            for(const value of vComp){
        	document.querySelector('#' + value).classList.replace('heldByRed', 'redVictory');
            }
        }
        document.querySelector("#twoPlayerButtonPath").classList.replace('twoPlayerButtonOn', 'twoPlayerButtonOff');
}




//////////////////////////// Fonction principale /////////////////////////////////////////
function playThisHex(HEX){


///////////////////////////////////// mode twoPlayers //////////////////////////////
    switch(mode){
     	 case 'twoPlayer' :      	    
	   		 if (threat==='blue'){
			    if (HEX.classList.contains('eyedByBlue')) { 
	    	         HEX.classList.replace( 'eyedByBlue' ,'heldByBlue');
	    	         HEX.classList.remove('free');
                     updateBoard(HEX);
                     updateComponents(HEX);
                     //// a confirmer
                     if(victory){
                       updateMode();
                     }else{pushRedHexButton()}

	    	    } else {}
	    	} else {
			      if (HEX.classList.contains('eyedByRed')) { 
	    	         HEX.classList.replace( 'eyedByRed' ,'heldByRed');
	    	         HEX.classList.remove('free');
                     updateBoard(HEX);
                     updateComponents(HEX);
                     //// a confirmer
                     if(victory){
                       updateMode();
                     }else{pushBlueHexButton()}

	    	     } else{}

	       } 

      break;
	

///////////////////////////////////// En mode freeBoard //////////////////////////////
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



/////////////////////// Activitation des hexagones  ////////////////////////////
function activateOneHex(HEX){
	HEX.addEventListener('click', function(){ playThisHex(HEX)}, false);
   
}
function activateAllHex(){
// if mode = freeBoard
	hex.forEach(activateOneHex);
}





function pushFreeBoardButton(){
      mode='freeBoard';
      initialState();
      pushBlueHexButton();
      activateAllHex();
  
      document.querySelector("#blueHexButton").addEventListener('click',pushBlueHexButton, false);
      document.querySelector("#redHexButton").addEventListener('click',pushRedHexButton, false);

      document.querySelector("#twoPlayerButtonPath").classList.replace('twoPlayerButtonOn', 'twoPlayerButtonOff');
      document.querySelector("#freeBoardButtonPath").classList.replace('freeBoardButtonOff', 'freeBoardButtonOn');
}

function pushTwoPlayerButton(){
      mode='twoPlayer';
	  threat='blue';
      pushBlueHexButton();
      initialState();
      activateAllHex();

      document.querySelector("#blueHexButton").removeEventListener('click',pushBlueHexButton, false);
      document.querySelector("#redHexButton").removeEventListener('click',pushRedHexButton, false);

      document.querySelector("#freeBoardButtonPath").classList.replace('freeBoardButtonOn', 'freeBoardButtonOff');
      document.querySelector("#twoPlayerButtonPath").classList.replace('twoPlayerButtonOff', 'twoPlayerButtonOn');
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

var mode='freeBoard'   // or 'freeBoard'
var threat = 'blue';  // or 'red'
var components=[];
var victory=false;

initialState();
activateAllHex();

document.querySelector("#blueHexButton").addEventListener('click',pushBlueHexButton, false);
document.querySelector("#redHexButton").addEventListener('click',pushRedHexButton, false);

document.querySelector("#freeBoardButton").addEventListener('click',pushFreeBoardButton, false);
document.querySelector("#twoPlayerButton").addEventListener('click',pushTwoPlayerButton, false);




















