Informe
=========
* **Carátula**
* **Indice / Páginado**
* **Requerimientos**
* **Protipos**
* **Historias**
* **Modelo de base de datos**
* Estructura de Firebase
* **Librerias/Frameworks**
* **APIs**
* Mapa de Sitio
* Ontologías a usar para cada página
* Ejemplos de json-ld o rdfa
* Resultados / Indexación.

20/10
===========
* **Renderizado offline**
https://alligator.io/vuejs/basic-ssr/
* **Sitemap**
* **Actores**
* **Rating**


SELECT ?movie ?movieLabel   WHERE {
    ?movie wdt:P31 wd:Q11424.
    ?movie rdfs:label ?movieLabel.
    ?movie wdt:P136 wd:Q471839.
   
    FILTER(LANGMATCHES(LANG(?movieLabel), "es"))
  }
LIMIT 50


SELECT ?movie ?movieGenre ?genre WHERE {
    ?movie wdt:P31 wd:Q11424.
    ?movie wdt:P136 ?movieGenre.
    ?movieGenre rdfs:label ?genre.
 	FILTER(LANGMATCHES(LANG(?genre), "es"))   
  }
LIMIT 500

 wd:Q93204	cine documental
 wd:Q130232	cine dramático
 wd:Q157394	cine de fantasía
 wd:Q157443	cine de comedia
 wd:Q172980	wéstern
 wd:Q188473	cine de acción
 wd:Q200092	cine de terror
 wd:Q471839	cine de ciencia ficción
 wd:Q319221	cine de aventuras
 wd:Q369747	cine belico de guerra
 wd:Q1401416	animación por computadora
 wd:Q1361932	cine familiar
 wd:Q842256	cine musical
 wd:Q1200678	cine de misterio
 wd:Q1054574	cine romántico
 wd:Q182015	suspenso
 wd:Q9503	suspense
 wd:Q19367312	cine policíaco de suspenso 
 
Trabajo para Laboratorio
============
* **Vuejs / Express**
* **Diseño de interfaces**


## Librerias / Servicios

### Wikidata:
```
https://query.wikidata.org/sparql?format=json&query=select distinct ?type where {
?thing a ?type
}
limit 20

```
### Youtube API:
Habilitar api
```
https://console.cloud.google.com

```
Usar el api:
```
https://www.googleapis.com/youtube/v3/search?part=id&q=trailer spiderman 3&type=video&key=AIzaSyAHyQ-GlNMGVxECRjRyInBDNJS-pf7biVQ
```

### Search API

```
https://www.googleapis.com/customsearch/v1?key=AIzaSyAHyQ-GlNMGVxECRjRyInBDNJS-pf7biVQ&cx=006657962570273736883:koufbjsjmxq&q=harry potter 3 poster&searchType=image&fileType=jpg&imgSize=xlarge&alt=json
```
