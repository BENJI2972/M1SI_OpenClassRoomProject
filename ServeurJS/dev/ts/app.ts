class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = window.setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

class Voiture {
    
    listeConducteur = new Array();
    proprietaire: Proprietaire;
    immatriculation: string;
    marque: string;

    constructor(immatriculation: string, marque: string) {
        this.immatriculation = immatriculation;
        this.marque = marque;
    }

    chaine() {
        let ret: string = "";
        for (let v of this.listeConducteur) {
            ret += v.chaine() + "<br>";
        }
        //ret += " proprietaire " + this.proprietaire.chaine();
        return "Voiture, " + this.immatriculation + " " + this.marque + "<br>" + ret;
    }

    addConducteur(conducteur: Conducteur) {
        this.listeConducteur.push(conducteur);
    }

    setProprietaire(proprietaire: Proprietaire) {
        this.proprietaire = proprietaire;
    }
}

abstract class Personne {

    nomPersonne: string;
    prenomPersonne: string;

    constructor(nomPersonne: string, prenomPersonne: string) {
        this.nomPersonne = nomPersonne;
        this.prenomPersonne = prenomPersonne;
    }

    chaine() {
        return this.nomPersonne + " " + this.prenomPersonne;
    }

}

class Conducteur extends Personne {

    dateNaissance: Date;

    constructor(nomPersonne: string, prenomPersonne: string, dateNaissance: Date) {
        super(nomPersonne, prenomPersonne);
        this.dateNaissance = dateNaissance;
    }

    chaine() {
        return "Conducteur, " + super.chaine() + " " + this.dateNaissance + " ";
    }

}

class Proprietaire extends Personne {

    constructor(nomPersonne: string, prenomPersonne: string) {
        super(nomPersonne, prenomPersonne);
    }

    chaine() {
        return "Proprietaire, " + super.chaine();
    }

}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);

    let v1 = new Voiture("007", "toyota");
    let v2 = new Voiture("808", "peugeot");

    /* PART 1 */
    /* methode 1 */ // si les elements html existe déjà on les y insère
    document.getElementById('voiture1').innerHTML = v1.chaine();
    document.getElementById('voiture2').innerHTML = v2.chaine();


    /* methode 2 */ // on créer soit même les éléments html
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    p1.innerText = v1.chaine();
    p2.innerText = v2.chaine();
    el.appendChild(p1);
    el.appendChild(p2);


    /* PART 2 */
    let c1 = new Conducteur("John", "Doe", new Date("11/12/1995"));
    let c2 = new Conducteur("Jane", "Doa", new Date("01/08/2001"));
    let pro1 = new Proprietaire("James", "Bond");
    document.write(c1.chaine());
    document.write("</br>");
    document.write(c2.chaine());
    document.write("</br>");
    document.write(pro1.chaine());

    /* PART 3 */
    document.write("</br>");
    v1.setProprietaire(pro1);
    document.write(v1.chaine());

    /*v1.addConducteur(c1);
    v1.addConducteur(c2);
    document.write("</br>");
    document.write(pro1.chaine());*/


    greeter.start();
};