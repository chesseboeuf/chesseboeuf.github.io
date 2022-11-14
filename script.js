
$( "#nav_accueil" ).click(function() {

	windowWidth = $(window).width();
	
	if ( windowWidth > 1000 ){

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


	}


});



$( "#nav_college, #accueil_link_college" ).click(function() {


	// spécifique à la page COLLEGE
	$('.slider_gauche').removeClass('six five four three');
	$('.slider_droite').removeClass('six five four three');

	$('#bouton_sixieme').removeClass('is-active');
	$('#bouton_cinquieme').removeClass('is-active');
	$('#bouton_quatrieme').removeClass('is-active');
	$('#bouton_troisieme').removeClass('is-active');

	$(".les_chapitres_viewbox").animate({ scrollTop: 0 }, "fast");

	windowWidth = $(window).width();

	if ( windowWidth > 1000 ){
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
	}



});











$( "#nav_lycee, #accueil_link_lycee" ).click(function() {

	windowWidth = $(window).width();

	if ( windowWidth > 1000 ){
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
	}

});













$( "#nav_applications" ).click(function() {

	windowWidth = $(window).width();

	if ( windowWidth > 1000 ){
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
	}

});











$( "#nav_enigmes" ).click(function() {

	windowWidth = $(window).width();

	if ( windowWidth > 1000 ){
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
	}

});






$( "#nav_infos" ).click(function() {

	windowWidth = $(window).width();

	if ( windowWidth > 1000 ){
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
	const Slider_gauche= document.querySelector(".slider_gauche")
	const Slider_droite= document.querySelector(".slider_droite")
	const Viewbox= document.querySelector(".les_chapitres_viewbox")





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




	document.addEventListener('DOMContentLoaded', ()=>{Slider_gauche.classList.remove('six','five', 'four', 'three')})

	Sixieme.addEventListener('click',()=>{Slider_gauche.classList.add('six'), Slider_gauche.classList.remove('five', 'four', 'three')})
	Cinquieme.addEventListener('click',()=>{Slider_gauche.classList.add('five'), Slider_gauche.classList.remove('six', 'four', 'three')})
	Quatrieme.addEventListener('click',()=>{Slider_gauche.classList.add('four'), Slider_gauche.classList.remove('six', 'five', 'three')})
	Troisieme.addEventListener('click',()=>{Slider_gauche.classList.add('three'), Slider_gauche.classList.remove('six', 'five', 'four')})


	document.addEventListener('DOMContentLoaded', ()=>{Slider_droite.classList.remove('six','five', 'four', 'three')})

	Sixieme.addEventListener('click',()=>{Slider_droite.classList.add('six'), Slider_droite.classList.remove('five', 'four', 'three')})
	Cinquieme.addEventListener('click',()=>{Slider_droite.classList.add('five'), Slider_droite.classList.remove('six', 'four', 'three')})
	Quatrieme.addEventListener('click',()=>{Slider_droite.classList.add('four'), Slider_droite.classList.remove('six', 'five', 'three')})
	Troisieme.addEventListener('click',()=>{Slider_droite.classList.add('three'), Slider_droite.classList.remove('six', 'five', 'four')})









////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// MOBILE NAVIGATION /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
 
	// fonction du bouton hamburger
	const menuHamburger = document.querySelector(".menu-hamburger")
	const navLinks = document.querySelector(".navlinks")
	const llogo = document.querySelector(".logo")
	const bbody = document.querySelector("body")

	menuHamburger.addEventListener('click',()=>{navLinks.classList.toggle('mobile-menu')})
	menuHamburger.addEventListener('click',()=>{llogo.classList.toggle('mobile-menu')})
	menuHamburger.addEventListener('click',()=>{menuHamburger.classList.toggle('mobile-menu')})
	menuHamburger.addEventListener('click',()=>{bbody.classList.toggle('mobile-menu')})



	const bouton_accueil = document.querySelector("#nav_accueil")
	const bouton_college = document.querySelector("#nav_college")
	const bouton_lycee = document.querySelector("#nav_lycee")
	const bouton_applications = document.querySelector("#nav_applications")
	const bouton_enigmes = document.querySelector("#nav_enigmes")
	const bouton_infos = document.querySelector("#nav_infos")

	bouton_accueil.addEventListener('click',()=>{navLinks.classList.toggle('mobile-menu')})
	bouton_accueil.addEventListener('click',()=>{llogo.classList.toggle('mobile-menu')})
	bouton_accueil.addEventListener('click',()=>{menuHamburger.classList.toggle('mobile-menu')})
	bouton_accueil.addEventListener('click',()=>{bbody.classList.toggle('mobile-menu')})

	bouton_college.addEventListener('click',()=>{navLinks.classList.toggle('mobile-menu')})
	bouton_college.addEventListener('click',()=>{llogo.classList.toggle('mobile-menu')})
	bouton_college.addEventListener('click',()=>{menuHamburger.classList.toggle('mobile-menu')})
	bouton_college.addEventListener('click',()=>{bbody.classList.toggle('mobile-menu')})

	bouton_lycee.addEventListener('click',()=>{navLinks.classList.toggle('mobile-menu')})
	bouton_lycee.addEventListener('click',()=>{llogo.classList.toggle('mobile-menu')})
	bouton_lycee.addEventListener('click',()=>{menuHamburger.classList.toggle('mobile-menu')})
	bouton_lycee.addEventListener('click',()=>{bbody.classList.toggle('mobile-menu')})

	bouton_applications.addEventListener('click',()=>{navLinks.classList.toggle('mobile-menu')})
	bouton_applications.addEventListener('click',()=>{llogo.classList.toggle('mobile-menu')})
	bouton_applications.addEventListener('click',()=>{menuHamburger.classList.toggle('mobile-menu')})
	bouton_applications.addEventListener('click',()=>{bbody.classList.toggle('mobile-menu')})

	bouton_enigmes.addEventListener('click',()=>{navLinks.classList.toggle('mobile-menu')})
	bouton_enigmes.addEventListener('click',()=>{llogo.classList.toggle('mobile-menu')})
	bouton_enigmes.addEventListener('click',()=>{menuHamburger.classList.toggle('mobile-menu')})
	bouton_enigmes.addEventListener('click',()=>{bbody.classList.toggle('mobile-menu')})

	bouton_infos.addEventListener('click',()=>{navLinks.classList.toggle('mobile-menu')})
	bouton_infos.addEventListener('click',()=>{llogo.classList.toggle('mobile-menu')})
	bouton_infos.addEventListener('click',()=>{menuHamburger.classList.toggle('mobile-menu')})
	bouton_infos.addEventListener('click',()=>{bbody.classList.toggle('mobile-menu')})










/////////////////////////////////////////////////////////////////////////
// EN COURS
////////////////////////////////////////////////////////////////////////::


var provenance = 'elsewhere';


$( document ).ready(function() {

if(provenance === 'an-application' ){

	$("#accueil").hide();
	$("#college").hide();
	$("#lycee").hide();
	$("#applications").show();
	$("#enigmes").hide();
	$("#infos").hide();

	$("#accueil").removeClass("active-section");
	$("#college").removeClass("active-section");
	$("#lycee").removeClass("active-section");
	$("#applications").addClass("active-section");
	$("#enigmes").removeClass("active-section");
	$("#infos").removeClass("active-section");

	$("#nav_accueil").addClass("is-active");
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


}

	provenance = 'elsewhere';
	   
});


$( "#hex_board" ).click(function() {
	provenance='an-application';
});



