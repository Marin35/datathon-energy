
// On initialise la latitude et la longitude au centre de la France
var lat = 46.8;
var lon = 2.349903;
var macarte = null;


			// Fonction d'initialisation de la carte
			function initMap() {

				var overlapGraph = 0; // Permet d'alterner entre radioInput et mutiple select boxes

//-------------------------------Layers Group -----------------------------------

var citiesScoreTotal = L.layerGroup();
var citiesScoreConsoMoyenne = L.layerGroup();
var citiesSolMean = L.layerGroup();
var citiesScoreNbBorneE = L.layerGroup();
var citiesScoreProp_prote = L.layerGroup();
var citiesScoreVentMean = L.layerGroup();


//----------------------------- TileLayers Overlay ------------------------------

var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr}),
init = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
		// Il est toujours bien de laisser le lien vers la source des données
		attribution: 'données © OpenStreetMap/ODbL - rendu OSM France',
		minZoom: 1,
		maxZoom: 20
	}),
WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}),
CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
}),

Thunderforest_TransportDark = L.tileLayer('https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: 'db5ae1f5778a448ca662554581f283c5',
	maxZoom: 22
});

//---------------------------Init Map ----------------------------------------


macarte = L.map('map', {
	center: [lat, lon],
	zoom: 6,
	layers: [streets, citiesScoreTotal] // Base layers at launch
});



var baseLayers = {
	"Detailed" : init,
	"Grayscale": grayscale,
	"Streets": streets,
	"Imagery" : WorldImagery,
	"DarkScale" : CartoDB_DarkMatter,
	"Transport_Dark" : Thunderforest_TransportDark
};

var overlays = {
	"Score Total": citiesScoreTotal,
	"Score Conso moyenne Residentiel (MWh)" : citiesScoreConsoMoyenne,
	"Score Sol Mean" : citiesSolMean,
	"Score Nombre bornes E" : citiesScoreNbBorneE,
	"Score Prop prote" : citiesScoreProp_prote,
	"Score Vent Mean" : citiesScoreVentMean
};

var groupedOverlays = {
	"Classement selon le type de score":{
		"Score Total": citiesScoreTotal,
		"Consomation moyenne Residentiel (MWh)" : citiesScoreConsoMoyenne,
		"Potentiel solaire" : citiesSolMean,
		"Nombre bornes E pour recharge électrique" : citiesScoreNbBorneE,
		"Potentiel patrimoine" : citiesScoreProp_prote,
		"Potentiel Eolien" : citiesScoreVentMean
	}

};

var options = {
	exclusiveGroups: ["Classement selon le type de score"],
      // Show a checkbox next to non-exclusive group labels for toggling all
      groupCheckboxes: true
  };


  if(overlapGraph == 1){
  	L.control.layers(baseLayers, overlays).addTo(macarte); // Multiple Selectbox
  }
  else{

  	var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, options); // RadioInput
  	macarte.addControl(layerControl);
  }


  for (ville in villes) {

  	//Old Colors : blue, 67ABE8
  	// 			   FF4500, FF7F50
  	//				red, f03


		//-------------Score Total --------------------

		if(villes[ville].Score_Total < 35){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#8073ac',
				fillColor: '#8073ac',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Total
			}).bindPopup(ville + " a pour valeur : " + villes[ville].Score_Total ).addTo(citiesScoreTotal);
		}
		if(villes[ville].Score_Total > 35 && villes[ville].Score_Total < 65){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#fdb863',
				fillColor: '#fdb863',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Total
			}).bindPopup(ville + " a pour valeur : " + villes[ville].Score_Total ).addTo(citiesScoreTotal);
		}
		if(villes[ville].Score_Total > 65){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#b35806',
				fillColor: '#b35806',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Total
			}).bindPopup(ville+ " a pour valeur : " + villes[ville].Score_Total ).addTo(citiesScoreTotal);
		}

		//------------- Score_Conso_moyenne_Residentiel_ --------------------

		if(villes[ville].Score_Conso_moyenne_Residentiel < 35){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#8073ac',
				fillColor: '#8073ac',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Conso_moyenne_Residentiel
			}).bindPopup(ville + " a pour valeur : " + villes[ville].Score_Conso_moyenne_Residentiel ).addTo(citiesScoreConsoMoyenne);
		}
		if(villes[ville].Score_Conso_moyenne_Residentiel > 35 && villes[ville].Score_Conso_moyenne_Residentiel < 65){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#fdb863',
				fillColor: '#fdb863',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Conso_moyenne_Residentiel
			}).bindPopup(ville + " a pour valeur : " + villes[ville].Score_Conso_moyenne_Residentiel ).addTo(citiesScoreConsoMoyenne);
		}
		if(villes[ville].Score_Conso_moyenne_Residentiel > 65){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#b35806',
				fillColor: '#b35806',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Conso_moyenne_Residentiel
			}).bindPopup(ville+ " a pour valeur : " + villes[ville].Score_Conso_moyenne_Residentiel ).addTo(citiesScoreConsoMoyenne);
		}

		//------------- Score citiesSolMean --------------------

		if(villes[ville].Score_Sol_mean < 35){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#8073ac',
				fillColor: '#8073ac',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Sol_mean
			}).bindPopup(ville + " a pour valeur : " + villes[ville].Score_Sol_mean ).addTo(citiesSolMean);
		}
		if(villes[ville].Score_Sol_mean > 35 && villes[ville].Score_Sol_mean < 65){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#fdb863',
				fillColor: '#fdb863',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Sol_mean
			}).bindPopup(ville + " a pour valeur : " + villes[ville].Score_Sol_mean ).addTo(citiesSolMean);
		}
		if(villes[ville].Score_Sol_mean > 65){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#b35806',
				fillColor: '#b35806',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Sol_mean
			}).bindPopup(ville+ " a pour valeur : " + villes[ville].Score_Sol_mean ).addTo(citiesSolMean);
		}

		//------------- Score citiesScoreNbBorneE --------------------

		if(villes[ville].Score_nb_borne_e < 35){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#8073ac',
				fillColor: '#8073ac',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_nb_borne_e
			}).bindPopup(ville + " a pour valeur : " + villes[ville].Score_nb_borne_e ).addTo(citiesScoreNbBorneE);
		}
		if(villes[ville].Score_nb_borne_e > 35 && villes[ville].Score_nb_borne_e < 65){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#fdb863',
				fillColor: '#fdb863',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_nb_borne_e
			}).bindPopup(ville + " a pour valeur : " + villes[ville].Score_nb_borne_e ).addTo(citiesScoreNbBorneE);
		}
		if(villes[ville].Score_nb_borne_e > 65){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#b35806',
				fillColor: '#b35806',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_nb_borne_e
			}).bindPopup(ville+ " a pour valeur : " + villes[ville].Score_nb_borne_e ).addTo(citiesScoreNbBorneE);
		}

		//------------- Score citiesScoreProp_prote --------------------

		if(villes[ville].Score_Prop_prote < 35){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#8073ac',
				fillColor: '#8073ac',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Prop_prote
			}).bindPopup(ville + " a pour valeur : " + villes[ville].Score_Prop_prote ).addTo(citiesScoreProp_prote);
		}
		if(villes[ville].Score_Prop_prote > 35 && villes[ville].Score_Prop_prote < 65){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#fdb863',
				fillColor: '#fdb863',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Prop_prote
			}).bindPopup(ville + " a pour valeur : " + villes[ville].Score_Prop_prote ).addTo(citiesScoreProp_prote);
		}
		if(villes[ville].Score_Prop_prote > 65){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#b35806',
				fillColor: '#b35806',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Prop_prote
			}).bindPopup(ville+ " a pour valeur : " + villes[ville].Score_Prop_prote ).addTo(citiesScoreProp_prote);
		}

		//------------- Score citiesScoreVentMean --------------------

		if(villes[ville].Score_Vent_mean < 35){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#8073ac',
				fillColor: '#8073ac',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Vent_mean
			}).bindPopup(ville + " a pour valeur : " + villes[ville].Score_Vent_mean ).addTo(citiesScoreVentMean);
		}
		if(villes[ville].Score_Vent_mean > 35 && villes[ville].Score_Vent_mean < 65){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#fdb863',
				fillColor: '#fdb863',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Vent_mean
			}).bindPopup(ville + " a pour valeur : " + villes[ville].Score_Vent_mean ).addTo(citiesScoreVentMean);
		}
		if(villes[ville].Score_Vent_mean > 65){
			var circle = L.circle([villes[ville].lat, villes[ville].lon], {
				color: '#b35806',
				fillColor: '#b35806',
				fillOpacity: 0.5,
				radius: 50*villes[ville].Score_Vent_mean
			}).bindPopup(ville+ " a pour valeur : " + villes[ville].Score_Vent_mean ).addTo(citiesScoreVentMean);
		}


	}

//---------------- Affichage du titre de la carte ------------------------------

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
	this._div.innerHTML = '<h4>Territoires à fort potentiel de transition energétique</h4>' 
    /*+  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Hover over a state')*/;
    };

    info.addTo(macarte);     


//---------------------Affichage Legende ----------------------------------

function getColor(d) {
	return  d > 100  ? '#b35806' :
	d > 65   ? '#b35806' :
	d > 35   ? '#fdb863' :
	'#8073ac';
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

	var div = L.DomUtil.create('div', 'info legend'),
	grades = [0, 35, 65, 100],
	labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    /*for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '</br> &nbsp;' : '+');
        }*/
        div.innerHTML += "Scores des territoires :" + "</br>";

        for (var i = 0; i < grades.length-1; i++) {
        	div.innerHTML +=
        	'</br>'+
        	'<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        	grades[i] + ' - ' + (grades[i + 1] + '</br>');
        }

        return div;
    };

    legend.addTo(macarte);


}