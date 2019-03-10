
/////////////////////////////////////////MAIN/////////////////////////////////////////////// 
                             ///////////////////////////////


class Init{
    constructor(){
        this.tabSlide;
        this.slider1;
        ////Instances des Diapositives
        this.slide1 = new Slide("images/velov1.jpg", "Bienvenue sur l'app Velov !");
        this.slide2 = new Slide("images/velov2.jpg", "Sélectionnez une borne sur la carte");
        this.slide3 = new Slide("images/velov3.jpg", "Renseignez votre nom et prénom puis signez");
        this.slide4 = new Slide("images/velov4.jpg", "Vous avez 20 minutes pour retirer le Velo");
        ////Création de l'objet MAP "LYON"
        this.myMap1 = new Map(45.7510,4.8409,13,"lyon");
        // Lien API JDC
        this.urlApiJCD = "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=8347b106cda08753b9772f93b433a984f8c98347"
        ////////////CREATION DE L'OBJET CANVAS////////////////
        this.canvas1 = new Canvas();
        ///////////CREATION DE L'ELEMENT STORAGE//////////
        this.storage1 = new Storage();
        this.urlApiStat = "";
        this.borne = new L.marker();
        this.initLMark = [];
    }

    
    initSlider(){

       //////Creation du tableau de slide
       this.tabSlide = [this.slide1, this.slide2, this.slide3, this.slide4];
       //////Instance slider
       this.slider1 = new Slider(this.tabSlide, document.getElementById("imgs"), document.getElementById("text"));             
       ////////ELargissement de la portée des variables this.slide1 et this.tabSlide
       let slider1 = this.slider1;
       let tabSLide = this.tabSlide;
       //Evenement Slider
       slider1.eventslider();
        ////Lancement du diaporama automatique
       slider1.auto = setInterval(function () {
           slider1.mouvementManuel(1);
       }, 5000);
    }
    
    initMap(){
        //requete Fetch pour recupération des données json de l'API JDC
        fetch(this.urlApiJCD)
        .then(data=>{return data.json()})
        .then(res=>{
            this.myMap1.initMarker(res);
        })
        .catch(error=>console.log(error))


        ///////////Affichage du Canvas à l'envoi du formulaire
        document.getElementById("nomprenomform").addEventListener("submit",function(e){
            if(document.getElementById("reservation").textContent ==="Cette station est fermée" || document.getElementById("veloDispo").textContent ==="Aucun velo disponible"){       
                return;
            }
            document.getElementById("cadreSignature").style.display= "flex";
  
            //Renvoi vers la section signature
            location.href="#signature";
            e.preventDefault();
        });
        
    }

    
    initCanvasStorage(){

        ////////Elargissement de la portée des variables this.canvas1 et this.storage1
        let canvas1 = this.canvas1;
        let storage1 = this.storage1;

        ///Evenement Canvas
        canvas1.eventCanvas();

  
                //////////////////////////Lancement du compte à rebourd au click et mise en place de la nouvelle session et local storage////////////
        document.getElementById("reserver").addEventListener("click",function(e){
            e.preventDefault();
            if(canvas1.confirmSign===false){alert("Vous devez signer pour confirmer votre reservation");
            }else{
                clearInterval(storage1.minuteuRecup);
                storage1.secondes = 60;
                storage1.minutes = 19;

                storage1.minuteuRecup= setInterval(function(){
                    storage1.minuteur();
                    document.getElementById("timers").textContent = ":"+sessionStorage.getItem("secondes");
                    document.getElementById("timerm").textContent = "Temps restant avant expiration de la réservation : "+sessionStorage.getItem("minutes");
                }, 1000);
                sessionStorage.setItem("recupstation",document.getElementById("nomStation").textContent );	
                storage1.afficherInfoResa();
                //Renvoi vers le minuteur
                location.href="#messagetimer";

            };
        });

        //////////////////////RECUPERATION DE LA SESSION PRECEDENTE
        if(typeof sessionStorage!='undefined') {
            if('recupstation' in sessionStorage) {
                storage1.afficherInfoResa();
                ///RECUPERATION DES VARIABLES EN SESSION STORAGE
                storage1.secondes =sessionStorage.getItem("secondes");
                storage1.minutes = sessionStorage.getItem("minutes");
                if(storage1.minutes === "00" && this.storage1.secondes === "00"){
                    clearInterval(storage1.minuteuRecup);
                    document.getElementById("timers").textContent = "";
                    document.getElementById("timerm").textContent = "La réservation est expirée";
                }else{       
                    storage1.minuteuRecup= setInterval(function() {
                    storage1.minuteur();
                    document.getElementById("timers").textContent = ":"+storage1.secondes;
                    document.getElementById("timerm").textContent = "Temps restant avant expiration de la réservation : "+storage1.minutes;
                    }, 1000);
                };
            };
        };

        //Mise en place du locale Storage au click du nom et prénom
        document.getElementById('nomprenomform').addEventListener("submit", function(e){
            storage1.sauvegardegNomPrenom();
            e.preventDefault();
        });


        document.getElementById("nomform").value = localStorage.getItem('nom');
        document.getElementById("prenomform").value = localStorage.getItem('prenom');
    }

    
}

var init1 = new Init();
init1.initSlider();
init1.initMap();
init1.initCanvasStorage();


