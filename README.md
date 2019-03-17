# Anomaly detection in a network
*Authors : Marin BOUTHEMY, Julien PERRIN, Constance VIVIER, Jean-Baptiste FRAYSSE & Olivier LIOSWSKI*

This library  has been made to compute and process all the data and create a scoring system. We can find all the data on the internet (all of them are open data).
They mostly came from websites such as Enedis Open Data.

## Requirements
The library has some requirements :
 - Python 3
 - Numpy
 - Pandas
 - Java Script
 - HTML

To install all this requirement you can use the requirements.txt.

## Installation
To use our library, you just need to create a folder structure such as:

- data (contains the master file that we have created with QGIS)
- data_to_leaflet (export the JSON to be used in the JavaScript)


## Documentation and sources

We have used the data from the following websites to create our scoring system:

- https://www.data.gouv.fr/fr/datasets/mode-de-deplacement-domicile-travail/
- https://www.data.gouv.fr/fr/datasets/fichier-consolide-des-bornes-de-recharge-pour-vehicules-electriques/
- https://globalwindatlas.info/
- https://globalsolaratlas.info/ 
- https://www.statistiques.developpement-durable.gouv.fr/corine-land-cover-0 
- https://data.enedis.fr/pages/accueil/

## Files structure
The library contains many files. Each file has been commented.

First the files in the src folder, those are based Python file :
 - [main.py] -> merge the data, select randomly the communes to score and do the scoring with the ranking.
 - [get_score.py] -> compute the score based on the rank of each characteristics.
 - [create_JSON.py] -> create the JSON output with the correct longitude and latitude

In the interactiveMap folder, we have the files which corresponds to the front-end:
- [JSON.js] -> JSON file which contains the cities
- [MapProcessing.js] -> Process and display the map with the framewrok Leaflet

