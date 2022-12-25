
var limitFormat = 1.25; //fromat a partir du quel on change de mode
var timeToResize = 300; // temps a partir du quel le resize est pris en compte pour changer le style


var windowWidth = $(window).width();
var windowHeight = $(window).height();
var windowFormat = windowWidth / windowHeight;

$( document ).ready(function() {
	// Apparition fondu de la section accueil au chargement du site
	$('#accueil').fadeIn(500,function(){});
});



$( window ).on( "load", function() { 

	
	if( windowFormat <= limitFormat ) {

		$('#navbar').css('min-height','13vh');
		$('body').css('font-size','16pt');
		$('#navlinks').css('margin-left','10%');
		$('#navlinks').css('margin-right','10%');


		$("#navbar").addClass("mobile");
		$("#mylogo").addClass("mobile");
		$("#hamburger").addClass("mobile");
		$("#navlinks").addClass("mobile");
		$("#navlinksUl").addClass("mobile");


	} else{

		$("#navbar").removeClass("mobile");
		$("#mylogo").removeClass("mobile");
		$("#hamburger").removeClass("mobile");
		$("#navlinks").removeClass("mobile");
		$("#navlinksUl").removeClass("mobile");

		mobileMenu=false;

		$("#navlinks").show(1000, function(){


		if(windowWidth < 800){
			$('#navlinks').css('margin-left','2%');
			$('#navlinks').css('margin-right','2%');

		}else{
			$('#navlinks').css('margin-left','10%');
			$('#navlinks').css('margin-right','10%');
		}


		if(windowWidth < 700){
			$('body').css('font-size','14pt');
		}else{
			$('body').css('font-size','16pt');
		}




		if(windowHeight < 400){
			$('#navbar').css('min-height','20vh');
		}else{
			$('#navbar').css('min-height','13vh');
		}


		});


	}


	

});




//////////////////////////////////////////////////////////////////////////////
/////////////////////////// EFFET DU RESIZE /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


// timeOutFunctionId stores a numeric ID which is
// used by clearTimeOut to reset timer
var timeOutFunctionId;

// The function that we want to execute after
// we are done resizing
function workAfterResizeIsDone() {   
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	windowFormat = windowWidth / windowHeight;

	if( windowFormat <= limitFormat ) {


		$('#navbar').css('min-height','13vh');
		$('body').css('font-size','16pt');
		$('#navlinks').css('margin-left','10%');
		$('#navlinks').css('margin-right','10%');





		$("#navbar").addClass("mobile");
		$("#mylogo").addClass("mobile");
		$("#hamburger").addClass("mobile");
		$("#navlinks").addClass("mobile");
		$("#navlinksUl").addClass("mobile");

		$("#navlinks").hide();

		

		 $( "#mylogo" ).css("top", "1vh");
		 $("#hamburger").css("top","4vh");

		mobileMenu=false;
		

	} else{

		$("#navbar").removeClass("mobile");
		$("#mylogo").removeClass("mobile");
		$("#hamburger").removeClass("mobile");
		$("#navlinks").removeClass("mobile");
		$("#navlinksUl").removeClass("mobile");

		mobileMenu=false;


		$("#navlinks").show(1000, function(){


		if(windowWidth < 800){
			$('#navlinks').css('margin-left','2%');
			$('#navlinks').css('margin-right','2%');

		}else{
			$('#navlinks').css('margin-left','10%');
			$('#navlinks').css('margin-right','10%');
		}


		if(windowWidth < 700){
			$('body').css('font-size','14pt');
		}else{
			$('body').css('font-size','16pt');
		}

		

		if(windowHeight < 400){
			$('#navbar').css('min-height','20vh');
		}else{
			$('#navbar').css('min-height','13vh');
		}


		});

	
	}


	
	
};
 
// The following event is triggered continuously
// while we are resizing the window
window.addEventListener("resize", function() {
   
    // clearTimeOut() resets the setTimeOut() timer
    // due to this the function in setTimeout() is
    // fired after we are done resizing
    clearTimeout(timeOutFunctionId);
   
    // setTimeout returns the numeric ID which is used by
    // clearTimeOut to reset the timer
    timeOutFunctionId = setTimeout(workAfterResizeIsDone, timeToResize);
});






////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// MENU HAMBURGER /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
 
var mobileMenu= false;

$( "#hamburger" ).click(function() {
	$("#navlinks").slideToggle(1000,function(){});
	if(!mobileMenu){
		$( "#mylogo" ).animate({top: '5vh'}, 1200, function() {
			//callback
		});
		$( "#hamburger" ).animate({top: '8vh'}, 1200, function() {
			//callback
		});
		mobileMenu=true;
	}else{
		$( "#mylogo" ).animate({top: '1vh'}, 500, function() {
			//callback
		});
		$( "#hamburger" ).animate({top: '4vh'}, 500, function() {
			//callback
		});
		mobileMenu=false;
	}
	
});


   
////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// NAVIGATION GENERALE ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

$( "#nav_accueil" ).click(function() {

	
	if ( windowFormat > 1.2 ){

		if ( !accueil.classList.contains('active-section') && nav_accueil.classList.contains('clickable') ) {

			$("#nav_accueil").addClass("is-active");
			$("#nav_college").removeClass("is-active");
			$("#nav_lycee").removeClass("is-active");
			$("#nav_applications").removeClass("is-active");
			$("#nav_enigmes").removeClass("is-active");
			$("#nav_infos").removeClass("is-active");

			$("#nav_accueil").removeClass("clickable");
			$("#nav_college").removeClass("clickable");
			$("#nav_lycee").removeClass("clickable");
			$("#nav_applications").removeClass("clickable");
			$("#nav_enigmes").removeClass("clickable");
			$("#nav_infos").removeClass("clickable");

			$(".active-section").slideUp(700,function(){
				$("#accueil").slideDown(700, function(){

					$("#accueil").addClass("active-section");
					$("#college").removeClass("active-section");
					$("#lycee").removeClass("active-section");
					$("#applications").removeClass("active-section");
					$("#enigmes").removeClass("active-section");
					$("#infos").removeClass("active-section");

					$("#nav_college").addClass("clickable");
					$("#nav_lycee").addClass("clickable");
					$("#nav_applications").addClass("clickable");
					$("#nav_enigmes").addClass("clickable");
					$("#nav_infos").addClass("clickable");			

				});

				
			});

		}

	} else {

		$("#accueil").show();
		$("#college").hide();
		$("#lycee").hide();
		$("#applications").hide();
		$("#enigmes").hide();
		$("#infos").hide();

		$("main").scrollTop(0);

		$("#accueil").addClass("active-section");
		$("#college").removeClass("active-section");
		$("#lycee").removeClass("active-section");
		$("#applications").removeClass("active-section");
		$("#enigmes").removeClass("active-section");
		$("#infos").removeClass("active-section");

		$("#nav_accueil").addClass("is-active");
		$("#nav_college").removeClass("is-active");
		$("#nav_lycee").removeClass("is-active");
		$("#nav_applications").removeClass("is-active");
		$("#nav_enigmes").removeClass("is-active");
		$("#nav_infos").removeClass("is-active");

		$("#nav_accueil").removeClass("clickable");
		$("#nav_college").addClass("clickable");
		$("#nav_lycee").addClass("clickable");
		$("#nav_applications").addClass("clickable");
		$("#nav_enigmes").addClass("clickable");
		$("#nav_infos").addClass("clickable");

		


		$("#navlinks").slideUp(1000,function(){});

		$( "#mylogo" ).animate({top: '1vh'}, 500, function() {
			//callback
		});
		$( "#hamburger" ).animate({top: '4vh'}, 500, function() {
			//callback
		});

		mobileMenu=false;


	}


});



$( "#nav_college, #accueil_link_college" ).click(function() {


	// spécifique à la page COLLEGE
	// $('#college_slider_gauche').removeClass('six five four three');
	// $('#college_slider_droite').removeClass('six five four three');
// 
	// $('#bouton_sixieme').removeClass('is-active');
	// $('#bouton_cinquieme').removeClass('is-active');
	// $('#bouton_quatrieme').removeClass('is-active');
	// $('#bouton_troisieme').removeClass('is-active');

	$(".les_chapitres_viewbox").animate({ scrollTop: 0 }, "fast");
	$(".informations_viewbox").animate({ scrollTop: 0 }, "fast");


	if ( windowFormat > 1.2 ){
		if (!college.classList.contains('active-section') && nav_college.classList.contains('clickable') ) {

			$("#nav_accueil").removeClass("is-active");
			$("#nav_college").addClass("is-active");
			$("#nav_lycee").removeClass("is-active");
			$("#nav_applications").removeClass("is-active");
			$("#nav_enigmes").removeClass("is-active");
			$("#nav_infos").removeClass("is-active");

			$("#nav_accueil").removeClass("clickable");
			$("#nav_college").removeClass("clickable");
			$("#nav_lycee").removeClass("clickable");
			$("#nav_applications").removeClass("clickable");
			$("#nav_enigmes").removeClass("clickable");
			$("#nav_infos").removeClass("clickable");

			$(".active-section").slideUp(700,function(){
				$("#college").slideDown(700, function(){

					// spécifique à la page COLLEGE
					$(".les_chapitres_viewbox").animate({ scrollTop: 0 }, "fast");

					$("#accueil").removeClass("active-section");
					$("#college").addClass("active-section");
					$("#lycee").removeClass("active-section");
					$("#applications").removeClass("active-section");
					$("#enigmes").removeClass("active-section");
					$("#infos").removeClass("active-section");

					$("#nav_accueil").addClass("clickable");
					$("#nav_lycee").addClass("clickable");
					$("#nav_applications").addClass("clickable");
					$("#nav_enigmes").addClass("clickable");
					$("#nav_infos").addClass("clickable");


				});


			});

		}

	} else{

		$("#accueil").hide();
		$("#college").show();
		$("#lycee").hide();
		$("#applications").hide();
		$("#enigmes").hide();
		$("#infos").hide();

		$("main").scrollTop(0);

		$("#accueil").removeClass("active-section");
		$("#college").addClass("active-section");
		$("#lycee").removeClass("active-section");
		$("#applications").removeClass("active-section");
		$("#enigmes").removeClass("active-section");
		$("#infos").removeClass("active-section");

		$("#nav_accueil").removeClass("is-active");
		$("#nav_college").addClass("is-active");
		$("#nav_lycee").removeClass("is-active");
		$("#nav_applications").removeClass("is-active");
		$("#nav_enigmes").removeClass("is-active");
		$("#nav_infos").removeClass("is-active");

		$("#nav_accueil").addClass("clickable");
		$("#nav_college").removeClass("clickable");
		$("#nav_lycee").addClass("clickable");
		$("#nav_applications").addClass("clickable");
		$("#nav_enigmes").addClass("clickable");
		$("#nav_infos").addClass("clickable");


		$("#navlinks").slideUp(1000,function(){});

		$( "#mylogo" ).animate({top: '1vh'}, 500, function() {
			//callback
		});
		$( "#hamburger" ).animate({top: '4vh'}, 500, function() {
			//callback
		});

		mobileMenu=false;
	}



});







$( "#nav_lycee, #accueil_link_lycee" ).click(function() {

		// spécifique à la page LYCEE
		// $('#lycee_slider_gauche').removeClass('one two zero');
		// $('#lycee_slider_droite').removeClass('one two zero');
	// 
		// $('#bouton_seconde').removeClass('is-active');
		// $('#bouton_premiere').removeClass('is-active');
		// $('#bouton_terminale').removeClass('is-active');
	
		$(".les_chapitres_viewbox").animate({ scrollTop: 0 }, "fast");
		$(".informations_viewbox").animate({ scrollTop: 0 }, "fast");


	if ( windowFormat > 1.2 ){
		if (!lycee.classList.contains('active-section') && nav_lycee.classList.contains('clickable') ) {

			$("#nav_accueil").removeClass("is-active");
			$("#nav_college").removeClass("is-active");
			$("#nav_lycee").addClass("is-active");
			$("#nav_applications").removeClass("is-active");
			$("#nav_enigmes").removeClass("is-active");
			$("#nav_infos").removeClass("is-active");

			$("#nav_accueil").removeClass("clickable");
			$("#nav_college").removeClass("clickable");
			$("#nav_lycee").removeClass("clickable");
			$("#nav_applications").removeClass("clickable");
			$("#nav_enigmes").removeClass("clickable");
			$("#nav_infos").removeClass("clickable");

			$(".active-section").slideUp(700,function(){
				$("#lycee").slideDown(700, function (){
					$("#accueil").removeClass("active-section");
					$("#college").removeClass("active-section");
					$("#lycee").addClass("active-section");
					$("#applications").removeClass("active-section");
					$("#enigmes").removeClass("active-section");
					$("#infos").removeClass("active-section");

					$("#nav_accueil").addClass("clickable");
					$("#nav_college").addClass("clickable");
					$("#nav_applications").addClass("clickable");
					$("#nav_enigmes").addClass("clickable");
					$("#nav_infos").addClass("clickable");
					
				});


			});

		}

	} else{

		$("#accueil").hide();
		$("#college").hide();
		$("#lycee").show();
		$("#applications").hide();
		$("#enigmes").hide();
		$("#infos").hide();

		$("main").scrollTop(0);

		$("#accueil").removeClass("active-section");
		$("#college").removeClass("active-section");
		$("#lycee").addClass("active-section");
		$("#applications").removeClass("active-section");
		$("#enigmes").removeClass("active-section");
		$("#infos").removeClass("active-section");

		$("#nav_accueil").removeClass("is-active");
		$("#nav_college").removeClass("is-active");
		$("#nav_lycee").addClass("is-active");
		$("#nav_applications").removeClass("is-active");
		$("#nav_enigmes").removeClass("is-active");
		$("#nav_infos").removeClass("is-active");

		$("#nav_accueil").addClass("clickable");
		$("#nav_college").addClass("clickable");
		$("#nav_lycee").removeClass("clickable");
		$("#nav_applications").addClass("clickable");
		$("#nav_enigmes").addClass("clickable");
		$("#nav_infos").addClass("clickable");


		$("#navlinks").slideUp(1000,function(){});

		$( "#mylogo" ).animate({top: '1vh'}, 500, function() {
			//callback
		});
		$( "#hamburger" ).animate({top: '4vh'}, 500, function() {
			//callback
		});

		mobileMenu=false;
	}

});













$( "#nav_applications" ).click(function() {

	windowWidth = $(window).width();

	if ( windowFormat > 1.2 ){
		if (!applications.classList.contains('active-section') && nav_applications.classList.contains('clickable') ) {

			$("#nav_accueil").removeClass("is-active");
			$("#nav_college").removeClass("is-active");
			$("#nav_lycee").removeClass("is-active");
			$("#nav_applications").addClass("is-active");
			$("#nav_enigmes").removeClass("is-active");
			$("#nav_infos").removeClass("is-active");

			$("#nav_accueil").removeClass("clickable");
			$("#nav_college").removeClass("clickable");
			$("#nav_lycee").removeClass("clickable");
			$("#nav_applications").removeClass("clickable");
			$("#nav_enigmes").removeClass("clickable");
			$("#nav_infos").removeClass("clickable");

			$(".active-section").slideUp(700,function(){
				$("#applications").slideDown(700, function(){
					$("#accueil").removeClass("active-section");
					$("#college").removeClass("active-section");
					$("#lycee").removeClass("active-section");
					$("#applications").addClass("active-section");
					$("#enigmes").removeClass("active-section");
					$("#infos").removeClass("active-section");

					$("#nav_accueil").addClass("clickable");
					$("#nav_college").addClass("clickable");
					$("#nav_lycee").addClass("clickable");
					$("#nav_enigmes").addClass("clickable");
					$("#nav_infos").addClass("clickable");
				});


			});

		}

	} else{

		$("#accueil").hide();
		$("#college").hide();
		$("#lycee").hide();
		$("#applications").show();
		$("#enigmes").hide();
		$("#infos").hide();

		$("main").scrollTop(0);

		$("#accueil").removeClass("active-section");
		$("#college").removeClass("active-section");
		$("#lycee").removeClass("active-section");
		$("#applications").addClass("active-section");
		$("#enigmes").removeClass("active-section");
		$("#infos").removeClass("active-section");

		$("#nav_accueil").removeClass("is-active");
		$("#nav_college").removeClass("is-active");
		$("#nav_lycee").removeClass("is-active");
		$("#nav_applications").addClass("is-active");
		$("#nav_enigmes").removeClass("is-active");
		$("#nav_infos").removeClass("is-active");

		$("#nav_accueil").addClass("clickable");
		$("#nav_college").addClass("clickable");
		$("#nav_lycee").addClass("clickable");
		$("#nav_applications").removeClass("clickable");
		$("#nav_enigmes").addClass("clickable");
		$("#nav_infos").addClass("clickable");

		$("#navlinks").slideUp(1000,function(){});

		$( "#mylogo" ).animate({top: '1vh'}, 500, function() {
			//callback
		});
		$( "#hamburger" ).animate({top: '4vh'}, 500, function() {
			//callback
		});

		mobileMenu=false;
	}

});











$( "#nav_enigmes" ).click(function() {

	windowWidth = $(window).width();

	if ( windowFormat > 1.2 ){
		if (!enigmes.classList.contains('active-section') && nav_enigmes.classList.contains('clickable') ) {


			$("#nav_accueil").removeClass("is-active");
			$("#nav_college").removeClass("is-active");
			$("#nav_lycee").removeClass("is-active");
			$("#nav_applications").removeClass("is-active");
			$("#nav_enigmes").addClass("is-active");
			$("#nav_infos").removeClass("is-active");

			$("#nav_accueil").removeClass("clickable");
			$("#nav_college").removeClass("clickable");
			$("#nav_lycee").removeClass("clickable");
			$("#nav_applications").removeClass("clickable");
			$("#nav_enigmes").removeClass("clickable");
			$("#nav_infos").removeClass("clickable");


			$(".active-section").slideUp(700,function(){
				$("#enigmes").slideDown(700, function(){

					$("#accueil").removeClass("active-section");
					$("#college").removeClass("active-section");
					$("#lycee").removeClass("active-section");
					$("#applications").removeClass("active-section");
					$("#enigmes").addClass("active-section");
					$("#infos").removeClass("active-section");

					$("#nav_accueil").addClass("clickable");
					$("#nav_college").addClass("clickable");
					$("#nav_lycee").addClass("clickable");
					$("#nav_applications").addClass("clickable");
					$("#nav_infos").addClass("clickable");

				});
	

			});

		}

	} else{

		$("#accueil").hide();
		$("#college").hide();
		$("#lycee").hide();
		$("#applications").hide();
		$("#enigmes").show();
		$("#infos").hide();

		$("main").scrollTop(0);

		$("#accueil").removeClass("active-section");
		$("#college").removeClass("active-section");
		$("#lycee").removeClass("active-section");
		$("#applications").removeClass("active-section");
		$("#enigmes").addClass("active-section");
		$("#infos").removeClass("active-section");

		$("#nav_accueil").removeClass("is-active");
		$("#nav_college").removeClass("is-active");
		$("#nav_lycee").removeClass("is-active");
		$("#nav_applications").removeClass("is-active");
		$("#nav_enigmes").addClass("is-active");
		$("#nav_infos").removeClass("is-active");

		$("#nav_accueil").addClass("clickable");
		$("#nav_college").addClass("clickable");
		$("#nav_lycee").addClass("clickable");
		$("#nav_applications").addClass("clickable");
		$("#nav_enigmes").removeClass("clickable");
		$("#nav_infos").addClass("clickable");

		$("#navlinks").slideUp(1000,function(){});

		$( "#mylogo" ).animate({top: '1vh'}, 500, function() {
			//callback
		});
		$( "#hamburger" ).animate({top: '4vh'}, 500, function() {
			//callback
		});

		mobileMenu=false;
	}

});






$( "#nav_infos" ).click(function() {

	windowWidth = $(window).width();

	if ( windowFormat > 1.2 ){
		if (!infos.classList.contains('active-section') && nav_infos.classList.contains('clickable') ) {

			$("#nav_accueil").removeClass("is-active");
			$("#nav_college").removeClass("is-active");
			$("#nav_lycee").removeClass("is-active");
			$("#nav_applications").removeClass("is-active");
			$("#nav_enigmes").removeClass("is-active");
			$("#nav_infos").addClass("is-active");

			$("#nav_accueil").removeClass("clickable");
			$("#nav_college").removeClass("clickable");
			$("#nav_lycee").removeClass("clickable");
			$("#nav_applications").removeClass("clickable");
			$("#nav_enigmes").removeClass("clickable");
			$("#nav_infos").removeClass("clickable");

			$(".active-section").slideUp(700,function(){
				$("#infos").slideDown(700,function(){

					$("#accueil").removeClass("active-section");
					$("#college").removeClass("active-section");
					$("#lycee").removeClass("active-section");
					$("#applications").removeClass("active-section");
					$("#enigmes").removeClass("active-section");
					$("#infos").addClass("active-section");

					$("#nav_accueil").addClass("clickable");
					$("#nav_college").addClass("clickable");
					$("#nav_lycee").addClass("clickable");
					$("#nav_applications").addClass("clickable");
					$("#nav_enigmes").addClass("clickable");

				});

			});

		}

	} else{

		$("#accueil").hide();
		$("#college").hide();
		$("#lycee").hide();
		$("#applications").hide();
		$("#enigmes").hide();
		$("#infos").show();

		$("main").scrollTop(0);

		$("#accueil").removeClass("active-section");
		$("#college").removeClass("active-section");
		$("#lycee").removeClass("active-section");
		$("#applications").removeClass("active-section");
		$("#enigmes").removeClass("active-section");
		$("#infos").addClass("active-section");

		$("#nav_accueil").removeClass("is-active");
		$("#nav_college").removeClass("is-active");
		$("#nav_lycee").removeClass("is-active");
		$("#nav_applications").removeClass("is-active");
		$("#nav_enigmes").removeClass("is-active");
		$("#nav_infos").addClass("is-active");

		$("#nav_accueil").addClass("clickable");
		$("#nav_college").addClass("clickable");
		$("#nav_lycee").addClass("clickable");
		$("#nav_applications").addClass("clickable");
		$("#nav_enigmes").addClass("clickable");
		$("#nav_infos").removeClass("clickable");

		$("#navlinks").slideUp(1000,function(){});

		$( "#mylogo" ).animate({top: '1vh'}, 500, function() {
			//callback
		});
		$( "#hamburger" ).animate({top: '4vh'}, 500, function() {
			//callback
		});

		mobileMenu=false;
	}

});




/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////PAGE COLLEGE//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

	// fonction des bouton 6ieme 5ieme ect ... 
	const Sixieme = document.querySelector("#bouton_sixieme")
	const Cinquieme = document.querySelector("#bouton_cinquieme")
	const Quatrieme = document.querySelector("#bouton_quatrieme")
	const Troisieme = document.querySelector("#bouton_troisieme")
	const College_slider_gauche= document.querySelector("#college_slider_gauche")
	const College_slider_droite= document.querySelector("#college_slider_droite")



	Sixieme.addEventListener('click',()=>{Sixieme.classList.add('is-active'),
										 Cinquieme.classList.remove('is-active'),
										 Quatrieme.classList.remove('is-active'),
										 Troisieme.classList.remove('is-active'),
					                     $(".les_chapitres_viewbox").animate({ scrollTop: 0 }, "slow");
										 })

	Cinquieme.addEventListener('click',()=>{Cinquieme.classList.add('is-active'),
										 Sixieme.classList.remove('is-active'),
										 Quatrieme.classList.remove('is-active'),
										 Troisieme.classList.remove('is-active')
										 $(".les_chapitres_viewbox").animate({ scrollTop: 0 }, "slow");
										 })	
										 
   Quatrieme.addEventListener('click',()=>{Quatrieme.classList.add('is-active'),
										 Sixieme.classList.remove('is-active'),
										 Cinquieme.classList.remove('is-active'),
										 Troisieme.classList.remove('is-active')
										 $(".les_chapitres_viewbox").animate({ scrollTop: 0 }, "slow");
										 })	


	Troisieme.addEventListener('click',()=>{Troisieme.classList.add('is-active'),
										 Sixieme.classList.remove('is-active'),
										 Cinquieme.classList.remove('is-active'),
										 Quatrieme.classList.remove('is-active')
										 $(".les_chapitres_viewbox").animate({ scrollTop: 0 }, "slow");
										 })	

	// document.addEventListener('DOMContentLoaded', ()=>{College_slider_gauche.classList.remove('six','five', 'four', 'three')})

	Sixieme.addEventListener('click',()=>{College_slider_gauche.classList.add('six'),    College_slider_gauche.classList.remove('five', 'four', 'three')})
	Cinquieme.addEventListener('click',()=>{College_slider_gauche.classList.add('five'), College_slider_gauche.classList.remove('six', 'four', 'three')})
	Quatrieme.addEventListener('click',()=>{College_slider_gauche.classList.add('four'), College_slider_gauche.classList.remove('six', 'five', 'three')})
	Troisieme.addEventListener('click',()=>{College_slider_gauche.classList.add('three'),College_slider_gauche.classList.remove('six', 'five', 'four')})


	// document.addEventListener('DOMContentLoaded', ()=>{College_slider_droite.classList.remove('six','five', 'four', 'three')})

	Sixieme.addEventListener('click',()=>{  College_slider_droite.classList.add('six'),  College_slider_droite.classList.remove('five', 'four', 'three')})
	Cinquieme.addEventListener('click',()=>{College_slider_droite.classList.add('five'), College_slider_droite.classList.remove('six', 'four', 'three')})
	Quatrieme.addEventListener('click',()=>{College_slider_droite.classList.add('four'), College_slider_droite.classList.remove('six', 'five', 'three')})
	Troisieme.addEventListener('click',()=>{College_slider_droite.classList.add('three'),College_slider_droite.classList.remove('six', 'five', 'four')})


/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////PAGE LYCEE//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

	// fonction des bouton 6ieme 5ieme ect ... 
	const Seconde = document.querySelector("#bouton_seconde")
	const Premiere = document.querySelector("#bouton_premiere")
	const Terminale = document.querySelector("#bouton_terminale")
	const Lycee_slider_gauche= document.querySelector("#lycee_slider_gauche")
	const Lycee_slider_droite= document.querySelector("#lycee_slider_droite")



	Seconde.addEventListener('click',()=>{Seconde.classList.add('is-active'),
										 Premiere.classList.remove('is-active'),
										 Terminale.classList.remove('is-active')
					                     $(".les_chapitres_viewbox").animate({ scrollTop: 0 }, "slow");
										 })

	Premiere.addEventListener('click',()=>{Premiere.classList.add('is-active'),
										 Seconde.classList.remove('is-active'),
										 Terminale.classList.remove('is-active')
										 $(".les_chapitres_viewbox").animate({ scrollTop: 0 }, "slow");
										 })	
										 
   Terminale.addEventListener('click',()=>{Terminale.classList.add('is-active'),
										 Premiere.classList.remove('is-active'),
										 Seconde.classList.remove('is-active'),
										 $(".les_chapitres_viewbox").animate({ scrollTop: 0 }, "slow");
										 })	


	// document.addEventListener('DOMContentLoaded', ()=>{Lycee_slider_gauche.classList.remove('two','one', 'zero')})

	Seconde.addEventListener('click',()=>{  Lycee_slider_gauche.classList.add('two'),  Lycee_slider_gauche.classList.remove('one', 'zero')})
	Premiere.addEventListener('click',()=>{Lycee_slider_gauche.classList.add('one'), Lycee_slider_gauche.classList.remove('two', 'zero')})
	Terminale.addEventListener('click',()=>{Lycee_slider_gauche.classList.add('zero'), Lycee_slider_gauche.classList.remove('two', 'one')})


	// document.addEventListener('DOMContentLoaded', ()=>{Lycee_slider_droite.classList.remove('two','one', 'zero')})

	Seconde.addEventListener('click',()=>{  Lycee_slider_droite.classList.add('two'),  Lycee_slider_droite.classList.remove('one', 'zero')})
	Premiere.addEventListener('click',()=>{Lycee_slider_droite.classList.add('one'), Lycee_slider_droite.classList.remove('two', 'zero')})
	Terminale.addEventListener('click',()=>{Lycee_slider_droite.classList.add('zero'), Lycee_slider_droite.classList.remove('two', 'one')})





//////////////////////////////////////////////////////////////////////////////////
//////////////////////// RESPONSIVE DES PAGES COLLEGES ET LYCEE //////////////////
//////////////////////////////////////////////////////////////////////////////////


$( window ).on( "load", function() { 

	if( windowFormat <= limitFormat ) {

		$('#college .contents').css('flex-direction','column');
		$('#lycee .contents').css('flex-direction','column');

		$('#college .les_niveaux').css('width','80%');
		$('#college .les_niveaux').css('font-size','1.2em');

		$('#lycee .les_niveaux').css('width','80%');
		$('#lycee .les_niveaux').css('font-size','1.2em');


		$(".un_chapitre").css("pointer-events", "none");

		$(".doc_chapitre li").css("pointer-events", "auto");

		$(".les_chapitres_viewbox").css('width','85%');
		$(".les_chapitres_viewbox").css('height','65vh');
		$(".les_chapitres_viewbox").css('margin-left','auto');
		$(".les_chapitres_viewbox").css('margin-right','auto');
		$(".les_chapitres_viewbox").css('margin-bottom','2vh');
		// 
		$(".informations_viewbox").css('width','85%');
		$(".informations_viewbox").css('height','50vh');
		$(".informations_viewbox").css('margin-left','auto');
		$(".informations_viewbox").css('margin-right','auto');
		$(".informations_viewbox").css('margin-bottom','2vh');
		
	} 
		
});

	
// timeOutFunctionId stores a numeric ID which is
// used by clearTimeOut to reset timer
var CollegeLyceeTimeOutFunctionId;
// The function that we want to execute after
// we are done resizing
function CollegeLyceeWorkAfterResizeIsDone() {   
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	windowFormat = windowWidth / windowHeight;




	if( windowFormat <= limitFormat ) {


		$('#college .contents').css('flex-direction','column');
		$('#lycee .contents').css('flex-direction','column');

		$('#college .les_niveaux').css('width','80%');
		$('#college .les_niveaux').css('font-size','1.2em');

		$('#lycee .les_niveaux').css('width','80%');
		$('#lycee .les_niveaux').css('font-size','1.2em');


		$(".un_chapitre").css("pointer-events", "none");
		$(".doc_chapitre li").css("pointer-events", "auto");

		$(".les_chapitres_viewbox").css('width','85%');
		$(".les_chapitres_viewbox").css('height','65vh');
		$(".les_chapitres_viewbox").css('margin-left','auto');
		$(".les_chapitres_viewbox").css('margin-right','auto');
		$(".les_chapitres_viewbox").css('margin-bottom','2vh');
		// 
		$(".informations_viewbox").css('width','85%');
		$(".informations_viewbox").css('height','50vh');
		$(".informations_viewbox").css('margin-left','auto');
		$(".informations_viewbox").css('margin-right','auto');
		$(".informations_viewbox").css('margin-bottom','2vh');

	} else{

		// on retrouve les parametres css de depart en utilisant ""
		
		$('#college .contents').css('flex-direction',"");
		$('#lycee .contents').css('flex-direction',"");

		$('#college .les_niveaux').css('width',"");
		$('#college .les_niveaux').css('font-size',"");

		$('#lycee .les_niveaux').css('width',"");
		$('#lycee .les_niveaux').css('font-size',"");


		$(".un_chapitre").css("pointer-events", "");
		$(".doc_chapitre li").css("pointer-events", "");

		$(".les_chapitres_viewbox").css('width',"");
		$(".les_chapitres_viewbox").css('height',"");
		$(".les_chapitres_viewbox").css('margin-left',"");
		$(".les_chapitres_viewbox").css('margin-right',"");
		$(".les_chapitres_viewbox").css('margin-bottom',"");
		
		$(".informations_viewbox").css('width',"");
		$(".informations_viewbox").css('height',"");
		$(".informations_viewbox").css('margin-left',"");
		$(".informations_viewbox").css('margin-right',"");
		$(".informations_viewbox").css('margin-bottom',"");
		
	}
	
};
 
// The following event is triggered continuously
// while we are resizing the window
window.addEventListener("resize", function() {
   
    // clearTimeOut() resets the setTimeOut() timer
    // due to this the function in setTimeout() is
    // fired after we are done resizing
    clearTimeout(CollegeLyceeTimeOutFunctionId);
   
    // setTimeout returns the numeric ID which is used by
    // clearTimeOut to reset the timer
    CollegeLyceeTimeOutFunctionId = setTimeout(CollegeLyceeWorkAfterResizeIsDone, timeToResize);
});




/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// PAGE APPLICATIONS ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

let hex_ia_test = false;

$('#hex_ia_accordéon_handle').click( function(){

	if(!hex_ia_test){
		$('#hex_ia_accordéon').css('max-height', '1000px');
		hex_ia_test=true;
	}else{
		$('#hex_ia_accordéon').css('max-height', '0px');	
		hex_ia_test=false;
	}	
});


let random_picker_held_test = false;

$('#random_picker_help_accordéon_handle').click( function(){

	if(!random_picker_held_test){
		$('#random_picker_help_accordéon').css('max-height', '1000px');
		random_picker_held_test=true;
	}else{
		$('#random_picker_help_accordéon').css('max-height', '0px');	
		random_picker_held_test=false;
	}	
});