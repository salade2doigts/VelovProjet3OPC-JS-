
/////////////////////////////////////////MAP/////////////////////////////////////////////// 
                             ///////////////////////////////


class Map{

    constructor(xCoor,yCoor,zoomMap,contract){
        //propriété personalisable
        this.xCoor = xCoor;
        this.yCoor = yCoor;
        this.zoomMap = zoomMap;
        this.contract = contract;
        //intialisation du fond de carte WIkimedia
        this.wikiMedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
            attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
            minZoom: 1,
            maxZoom: 19
        });
        //intialisation de la map 
        this.myMap= L.map('mapid', {
            center : [this.xCoor,this.yCoor],
            zoom : this.zoomMap,
            layers: [this.wikiMedia]
                })
        //INTIALISATION DES MARKER            
        this.markersCluster = new L.MarkerClusterGroup();
        this.urlApiStat = "";
        this.borne = new L.marker();
        this.initLMark = [];
        this.redIcon = L.icon({
            iconUrl: 'images/markerred.png'
        , iconSize: [35, 32]
        , iconAnchor: [12, 41]
        , popupAnchor: [1, -41]
        , shadowUrl: 'images/marker-shadow.png'
        , shadowSize: [31, 36]
        , shadowAnchor: [0, 36]
        });
        this.greenIcon = L.icon({
            iconUrl: 'images/markergreen.png'
        , iconSize: [45, 43]
        , iconAnchor: [12, 41]
        , popupAnchor: [1, -41]
        , shadowUrl: 'images/marker-shadow.png'
        , shadowSize: [31, 36]
        , shadowAnchor: [0, 36]
        });
    }

    //methode d'ajout de la map
    addMyMap(){
        this.myMap.addLayer(this.wikiMedia);
    }
    
    
    //methode d'intialisation des markers+ récupération des données API JSON et l'affichage des données récupéré.
    initMarker(res){
        for(let i = 0; i< res.length;i++){
            this.initLMark= [];
            this.borne = new L.marker([res[i].position.lat,res[i].position.lng]);
            this.markersCluster.addLayer(this.borne);
            this.borne.nombre = i;
            this.borne.contract = this.contract
            if(res[i].available_bikes===0 || res[i].status ==="CLOSED" ){
                this.borne.setIcon(this.redIcon);
            }else{this.borne.setIcon(this.greenIcon)}
            // evenement clic sur borne
            this.borne.addEventListener("click", function (e) {

                //Intialisation de L'url Api Custom
                this.urlApiStat = "https://api.jcdecaux.com/vls/v1/stations/"+res[this.nombre].number+"?contract="+this.contract+"&apiKey=8347b106cda08753b9772f93b433a984f8c98347";
                
                // FETCH récupération des données JSON  
                fetch(this.urlApiStat)
                .then(data=>{return data.json()})   
                .then(res1=>{

                    //Affichage des données récuperées
                    document.getElementById("reservation").style.display = "block";
                    $("#mapid").animate({ width:'50%' },700, 'linear');   
                    document.getElementById("reservation").classList.add('reservationactive');
                    document.getElementById("carteresa").classList.add('carteresa');
                    document.getElementById("nomStation").textContent = res1.name;
                    document.getElementById("adressStation").textContent = res1.address;
                    document.getElementById("ville").textContent = res1.contract_name;
                    document.getElementById("places").textContent = "places disponibles : "+ res1.available_bike_stands;
                    document.getElementById("veloDispo").textContent = "velos disponibles : "+ res1.available_bikes;
                    
                    //affiche les infos de la station selon le nom de vélo et le statut de la borne
                    if(res1.status ==="CLOSED"){
                        document.getElementById("veloDispo").textContent ="Cette station est fermée";
                        document.getElementById("veloDispo").style.color = "red";
                        document.getElementById("veloDispo").style.fontSize = "20px";
                    }else if(res1.available_bikes === 0){
                        document.getElementById("veloDispo").textContent  ="Aucun velo disponible";
                        document.getElementById("veloDispo").style.color = "red";
                        document.getElementById("veloDispo").style.fontSize = "20px";                       
                    }else if(res1.available_bikes > 0){
                        document.getElementById("veloDispo").style.color = "black";
                        document.getElementById("veloDispo").style.fontSize = "17px";
                    };               
                })
                .catch(error=>console.log(error))
                //Renvoi vers le formulaire
                location.href="#nomprenomform";
            });
         };
    
    // Ajout des Clusters
    this.myMap.addLayer(this.markersCluster);
    }
}

