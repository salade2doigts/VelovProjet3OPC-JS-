
/////////////////////////////////////////DIAPORAMA/////////////////////////////////////////////// 
                             ///////////////////////////////

class Slide {

	constructor(url, texte) {
		this.url = url;
		this.texte = texte;
	}
}


//constructeur slider

class Slider {
	constructor(tableau, idUrl, idTexte) {
		this.tableau = tableau;
		this.idUrl = idUrl;
		this.idTexte = idTexte;
		this.count = 0;
		this.auto = true;
	};

	/////////AFFICHE LES SLIDES DU TABLEAUX//////////
	mouvementManuel(x) {
		$(".fade").hide().fadeIn("slow");
		this.count = this.count + x;
		if (this.count < 0) {
			this.count = this.tableau.length - 1;
		} else if(this.count >= this.tableau.length) {
			this.count = 0;
		}
		this.idUrl.src = this.tableau[this.count].url;
		this.idTexte.textContent = this.tableau[this.count].texte;
	};


	eventslider(){

	////Bouton defilement droite et gauche
	document.getElementById("buttonG").addEventListener("click", function () {	
		init1.slider1.mouvementManuel(-1);
		$(".fade").fadeIn("slow");
	});

	document.getElementById("buttonD").addEventListener("click", function () {	
		init1.slider1.mouvementManuel(1);
		$(".fade").fadeIn("slow");
	});

	/////////Boutton pause et lecture
	document.getElementById("pause").addEventListener("click", function () {
		clearInterval(init1.slider1.auto);	
	});

	document.getElementById("play").addEventListener("click", function (e) {
		e.preventDefault();
		clearInterval(slider1.auto);
		init1.slider1.auto = setInterval(function () {
			init1.slider1.mouvementManuel(1);
		}, 5000);;       
	});

	// Mouvement de la diapo au clavier. Touches gauche et droite
	document.addEventListener("keydown", function (e) {
		switch (e.keyCode) {
			case 39:
			init1.slider1.mouvementManuel(1);
			break
			case 37:
			init1.slider1.mouvementManuel(-1);
			break
		}
	});

	}

}