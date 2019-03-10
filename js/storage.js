
/////////////////////////////////////////SAUVEGARDE DE SESSION/////////////////////////////////////////////// 
                             /////////////////////////////////////////


class Storage {

    constructor(){
        this.secondes = 60;
        this.minutes = 19;
        this.minuteuRecup;
    }

    /////////MINUTEUR//////////
    minuteur(){
      this.secondes--;     
      if(this.minutes === 0 && this.secondes === 0){       
        this.secondes= "00";
        this.minutes= "00";
        clearInterval(this.minuteuRecup)
      }else if(this.secondes === 0){this.secondes = 59 ;this.minutes--;};          
      sessionStorage.setItem("secondes",this.secondes);
      sessionStorage.setItem("minutes",this.minutes);      
    }
    
    ///////////AFFICHE LES INFORMATIONS DE RESERVATIONS DANS LE MESSAGE DE CONFIRMATION////////////
    afficherInfoResa(){
      document.getElementById("messagetimer").style.display= "block";
      document.getElementById("recupnom").textContent= localStorage.getItem('nom');
      document.getElementById("recuprenom").textContent= localStorage.getItem('prenom')+" votre";
      document.getElementById("stationres").textContent= "à la station "+sessionStorage.getItem("recupstation");
    }

    ///////////SAUVEGARDE EN LOCAL DU NOM ET PRENOM////////////////////
    sauvegardegNomPrenom(){
      localStorage.setItem('nom',document.getElementById('nomform').value );
      localStorage.setItem('prenom',document.getElementById('prenomform').value);
    }

}


