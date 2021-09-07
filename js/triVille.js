let csvFile;
let listVille = [];
let nbPermutation = 0;
let nbComparaison = 0;

document.querySelector("#read-button").addEventListener('click', function () {
    csvFile = document.querySelector("#file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        // récupération de la liste des villes
        listVille = getArrayCsv(e.target.result);

        // Calcul de la distance des villes par rapport à Grenoble
        listVille.forEach(ville => {
            ville.distanceFromGrenoble = distanceFromGrenoble(ville);
        });
        // Tri
        const algo = $("#algo-select").val();
        nbPermutation = 0;
        nbComparaison = 0;
        sort(algo);

        // Affichage 
        displayListVille()
    });
    reader.readAsText(csvFile)
})

/**
 * Récupére la liste des villes contenu dans le fichier csv
 * @param csv fichier csv brut
 * @returns la liste des villes mis en forme
 */
function getArrayCsv(csv) {
    let listLine = csv.split("\n")
    listVille = [];
    let isFirstLine = true;
    listLine.forEach(line => {
        if (isFirstLine || line === '') {
            isFirstLine = false;
        } else {
            let listColumn = line.split(";");
            listVille.push(
                new Ville(
                    listColumn[8],
                    listColumn[9],
                    listColumn[11],
                    listColumn[12],
                    listColumn[13],
                    0
                )
            );
        }
    });
    return listVille;
}

/**
 * Calcul de la distance entre Grenoble et une ville donnée
 * @param ville ville
 * @returns la distance qui sépare la ville de Grenoble
 */
function distanceFromGrenoble(ville) {
    const R = 6371e3; // metres
    const lat1 = 45.188529;
    const lon1 = 5.724524;
    const lat2 = ville.latitude;
    const lon2 = ville.longitude;
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
   // console.log('implement me !');
   // return 0;
}

/**
 * Retourne vrai si la ville i est plus proche de Grenoble
 * par rapport à j
 * @param {*} i distance de la ville i
 * @param {*} j distance de la ville j
 * @return vrai si la ville i est plus proche
 */
function isLess(i, j) {
    //console.log('implement me !');
     nbComparaison++;
    return i < j;
}
/**
 * interverti la ville i avec la ville j dans la liste des villes
 * @param {*} i 
 * @param {*} j 
 */
function swap(i, j) {
    nbPermutation++;
    [listVille[i], listVille[j]] = [listVille[j], listVille[i]];
}
    // Si Distance A plus proche de Grenoble > Distance B de Grenoble
    // dist(A,Grenoble) > dist(B,Grenoble)

    // Si Distance A de Grenoble < Distance B plus proche de Grenoble
    // dist(A,Grenoble) < dist(B,Grenoble)
    console.log('implement me !');


function sort(type) {
    switch (type) {
        case 'insert':
            insertsort(listVille);
            break;
        case 'select':
            selectionsort(listVille);
            break;
        case 'bubble':
            bubblesort(listVille);
            break;
        case 'shell':
            shellsort(listVille);
            break;
        case 'merge':
            mergesort(listVille);
            break;
        case 'heap':
            heapsort(listVille);
            break;
        case 'quick':
            quicksort(listVille,0, listVille.length - 1);
            break;
    }
}

function insertsort() {
    let n = listVille.length;
    for (let i = 0; i < n; i++) {
        let temp = listVille[i];
        let j = i;
        while (j > 0 && isLess(temp.distanceFromGrenoble, listVille[j - 1].distanceFromGrenoble)) {
            swap(j, j - 1);
            j--;
        }
        listVille[j] = temp;
    }
    console.log("insertsort - implement me !");
}

function selectionsort() {
    for (let i = 0; i < listVille.length; i++) {
        let min = i;
        for (let j = i + 1; j < listVille.length; j++) {
            if (isLess(listVille[j].distanceFromGrenoble, listVille[min].distanceFromGrenoble)) {
                min = j;
            }
        }
        swap(i, min);
    }
    console.log("selectionsort - implement me !");
}

function bubblesort(tab) {
    let passage = 0;
    let permut = true;
    while (permut) {
        permut = false;
        for (let i = 0; i < listVille.length - 1; i++) {
            if (isLess(listVille[i + 1].distanceFromGrenoble, listVille[i].distanceFromGrenoble)) {
                swap(i, i + 1);
                permut = true
            }
        }
        passage++;
    }
    console.log("bubblesort - implement me !");
}

function shellsort(tab) {
    let longueur = listVille.length;
    let n = 0;
    while (n < longueur) {
        n = Math.floor(3 * n + 1);
    }

    while (n !== 0) {
        n = Math.floor(n / 3);
        for (let i = n; i < longueur; i++) {
            let valeur = listVille[i];
            let j = i;
            while ((j > n - 1) && isLess(valeur.distanceFromGrenoble, listVille[j - n].distanceFromGrenoble)) {
                swap(j, j - n);
                j = j - n;
            }
            listVille[j] = valeur;
        }

    }
    console.log("shellsort - implement me !");
}

function mergesort(left,right) {
    let tab = [];

    if (left.length < 1) {
        return right;
    }
    else if (right.length < 1) {
        return left;
    }
    else if (isLess(left[0].distanceFromGrenoble, right[0].distanceFromGrenoble)) {
        tab.push(left[0]);
        return tab.concat(merge(left.slice(1), right));
    }
    else {
        tab.push(right[0]);
        return tab.concat(merge(left, right.slice(1)));
    }
}

function mergesort(tab) {
    let n = tab.length;
    let middle = Math.floor(n / 2);

    if (n <= 1) {
        return tab
    }
    else {
        let left = tab.slice(0, middle);
        let right = tab.slice(middle);
        return merge(mergesort(left), mergesort(right));
    }

}
    console.log("mergesort - implement me !");



function heapsort(tab) {
    organiser(tab);

    for (let i = tab.length - 1; i > 0; i--) {
        swap(0, i);
        redescendre(tab, i, 0)
    }

    return tab;

}

function organiser(tab) {

    for (let  i = 0; i < tab.length - 1; i++) {
        remonter(tab, i);
    }
}

function remonter(tab, index) {

    if (isLess(tab[Math.floor(index / 2)].distanceFromGrenoble, tab[index].distanceFromGrenoble)) {
        swap(index, Math.floor(index / 2));
        remonter(tab, Math.floor(index / 2));
    }
}

function redescendre(tab, element, index) {

    let formule = Math.floor(2 * index + 1);
    if (formule < element) {
        if (isLess(tab[Math.floor(2 * index)].distanceFromGrenoble, tab[formule].distanceFromGrenoble)) {
            var max = formule;
        } else {
            max = Math.floor(2 * index);
        }
        if (isLess(tab[index].distanceFromGrenoble, tab[max].distanceFromGrenoble)) {
            swap(max, index);
            redescendre(tab, element, max)
        }
    }
}

function quicksort(tab, first, last) {
    // console.log("quicksort - implement me !");

    if (first < last) {
        let pi = partitionner(tab, first, last);
        quicksort(tab, first, pi - 1);
        quicksort(tab, pi + 1, last);
    }
    console.log("heapsort - implement me !");
}

function quicksort(tab) {

    if (first < last) {
        let pi = partitionner(tab, first, last);
        quicksort(tab, first, pi - 1);
        quicksort(tab, pi + 1, last);
    }

    return tab;

}

    function partitionner(tab, first, last) {
        let pivot = last;
        let j = first;
        for (let i = first; i < last; i++) {
            if (isLess(tab[i].distanceFromGrenoble, tab[pivot].distanceFromGrenoble)) {
                swap(i, j);
                j++;
            }
        }
        swap(last, j);
        return j;
    }
  console.log("quicksort - implement me !");


/** MODEL */

class Ville {
    constructor(nom_commune, codes_postaux, latitude, longitude, dist, distanceFromGrenoble) {
        this.nom_commune = nom_commune;
        this.codes_postaux = codes_postaux;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dist = dist;
        this.distanceFromGrenoble = distanceFromGrenoble;
    }
}

/** AFFICHAGE */
function displayPermutation(nbPermutation) {
    document.getElementById('permutation').innerHTML = nbPermutation + ' permutations';
}

function displayListVille() {
    document.getElementById("navp").innerHTML = "";
    displayPermutation(nbPermutation);
    let mainList = document.getElementById("navp");
    for (var i = 0; i < listVille.length; i++) {
        let item = listVille[i];
        let elem = document.createElement("li");
        elem.innerHTML = item.nom_commune + " - \t" + Math.round(item.distanceFromGrenoble * 100) / 100 + ' m';
        mainList.appendChild(elem);
    }
}
