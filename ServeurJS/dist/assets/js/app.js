var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Greeter = /** @class */ (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = window.setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
}());
var Voiture = /** @class */ (function () {
    function Voiture(immatriculation, marque) {
        this.listeConducteur = new Array();
        this.immatriculation = immatriculation;
        this.marque = marque;
    }
    Voiture.prototype.chaine = function () {
        var ret = "";
        for (var _i = 0, _a = this.listeConducteur; _i < _a.length; _i++) {
            var v = _a[_i];
            ret += v.chaine() + "<br>";
        }
        //ret += " proprietaire " + this.proprietaire.chaine();
        return "Voiture, " + this.immatriculation + " " + this.marque + "<br>" + ret;
    };
    Voiture.prototype.addConducteur = function (conducteur) {
        this.listeConducteur.push(conducteur);
    };
    Voiture.prototype.setProprietaire = function (proprietaire) {
        this.proprietaire = proprietaire;
    };
    return Voiture;
}());
var Personne = /** @class */ (function () {
    function Personne(nomPersonne, prenomPersonne) {
        this.nomPersonne = nomPersonne;
        this.prenomPersonne = prenomPersonne;
    }
    Personne.prototype.chaine = function () {
        return this.nomPersonne + " " + this.prenomPersonne;
    };
    return Personne;
}());
var Conducteur = /** @class */ (function (_super) {
    __extends(Conducteur, _super);
    function Conducteur(nomPersonne, prenomPersonne, dateNaissance) {
        var _this = _super.call(this, nomPersonne, prenomPersonne) || this;
        _this.dateNaissance = dateNaissance;
        return _this;
    }
    Conducteur.prototype.chaine = function () {
        return "Conducteur, " + _super.prototype.chaine.call(this) + " " + this.dateNaissance + " ";
    };
    return Conducteur;
}(Personne));
var Proprietaire = /** @class */ (function (_super) {
    __extends(Proprietaire, _super);
    function Proprietaire(nomPersonne, prenomPersonne) {
        return _super.call(this, nomPersonne, prenomPersonne) || this;
    }
    Proprietaire.prototype.chaine = function () {
        return "Proprietaire, " + _super.prototype.chaine.call(this);
    };
    return Proprietaire;
}(Personne));
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    var v1 = new Voiture("007", "toyota");
    var v2 = new Voiture("808", "peugeot");
    /* PART 1 */
    /* methode 1 */ // si les elements html existe déjà on les y insère
    document.getElementById('voiture1').innerHTML = v1.chaine();
    document.getElementById('voiture2').innerHTML = v2.chaine();
    /* methode 2 */ // on créer soit même les éléments html
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    p1.innerText = v1.chaine();
    p2.innerText = v2.chaine();
    el.appendChild(p1);
    el.appendChild(p2);
    /* PART 2 */
    var c1 = new Conducteur("John", "Doe", new Date("11/12/1995"));
    var c2 = new Conducteur("Jane", "Doa", new Date("01/08/2001"));
    var pro1 = new Proprietaire("James", "Bond");
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
//# sourceMappingURL=app.js.map