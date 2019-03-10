
/////////////////////////////////////////CANVAS/////////////////////////////////////////////// 
							 ///////////////////////////////


class Canvas{
	constructor(){
		this.signer = false;
		this.confirmSign = false;
		this.ctx = document.getElementById("signature").getContext("2d");
		this.event;
	}

 ///////////POSITION INTIALE D'ECRITURE////////////
	 positionDepart(e){
	 	e.preventDefault();	
	 	this.signer = true;
	 	this.confirmSign = true;
	 	this.ctx.beginPath();
	}

////////////////FIN DE LA SIGNATURE/////////////
	positionFin(){
		this.signer = false;
	}

///////TRACE AU MOUVEMENT DANS LE CANVAS(PC)
	ecrire(e){
		e.preventDefault();
		if(this.signer== true){
			//taille de la ligne d'écriture
			this.ctx.lineWidth = 5;
			//Style d'écriture
			this.ctx.lineCap = "round";
			this.ctx.lineTo(e.offsetX,e.offsetY);
			this.ctx.stroke();
			this.ctx.beginPath();
			this.ctx.moveTo(e.offsetX,e.offsetY);	        
		}  
	}
	
///////TRACE AU MOUVEMENT DANS LE CANVAS(tactile)
	toucher(e){
	// si "signer" n'est pas vrai alors ne rien faire
		if(this.signer){
			e.preventDefault();
			//taille de la ligne d'écriture
			this.ctx.lineWidth = 5;
			//Style d'écriture
			this.ctx.lineCap = "round";
			// renvoie la taille de l'élément et sa position relative par rapport à la zone d'affichage
			var rect = e.target.getBoundingClientRect();
			var touch = e.touches[0] ;
			this.ctx.lineTo(touch.clientX- rect.left, touch.clientY - rect.top);
			this.ctx.stroke();
			this.ctx.beginPath();
			this.ctx.moveTo(touch.clientX- rect.left, touch.clientY - rect.top);
		}
	}



	eventCanvas(){
		////////////EVENEMENT SOURIS////////////////////
		document.getElementById("signature").addEventListener("mousedown",function (e){init1.canvas1.positionDepart(e);});
		document.getElementById("signature").addEventListener("mouseup",function(e){init1.canvas1.positionFin(e);});
		document.getElementById("signature").addEventListener("mousemove",function (e){init1.canvas1.ecrire(e);});

		/////////EVENEMENT TACTILE//////////////
		document.getElementById("signature").addEventListener("touchstart",function(e){init1.canvas1.positionDepart(e);});
		document.getElementById("signature").addEventListener("touchend",function(e){init1.canvas1.positionFin(e);});
		document.getElementById("signature").addEventListener("touchmove",function (e){init1.canvas1.toucher(e);});
		
		////////////ANNULATION DE LA RESERVATION
		document.getElementById("annulationresa").addEventListener("click",function(e){
			document.getElementById("reservation").style.display= "none";
			document.getElementById("mapid").style.width = "100%";
			document.getElementById("cadreSignature").style.display= "none";
			init1.canvas1.ctx.clearRect(0,0,350,350);
			e.preventDefault();
		});


		/////////////////Annulation de la signature
		document.getElementById("annulersign").addEventListener("click",function(e){
			document.getElementById("cadreSignature").style.display= "none";
			init1.canvas1.ctx.clearRect(0,0,350,350);
		});

		/////////////////Efface le contenu du canvas
		document.getElementById("effacer").addEventListener("click",function(e){
			init1.canvas1.ctx.clearRect(0,0,350,350);
			init1.canvas1.confirmSign=false;
		});
	
	
	}
	
}


