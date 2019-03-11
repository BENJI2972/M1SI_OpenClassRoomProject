define(["require", "exports", "mysql"], function (require, exports, mysql) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MariaDb_Operations = /** @class */ (function () {
        function MariaDb_Operations(host, database, user, password) {
            this.host = host;
            this.database = database;
            this.user = user;
            this.password = password;
        }
        MariaDb_Operations.prototype.connexionMariaDb = function (functionToDo, listVariable,miseAJourReact) {
            var connexionMariaDb = mysql.createConnection({
                host: this.host,
                user: this.user,
                password: this.password,
                database: this.database
            });
            functionToDo(connexionMariaDb, listVariable, function () {
                connexionMariaDb.end();
            },miseAJourReact);
        };
        MariaDb_Operations.prototype.listerUser = function (connexionMariaDb, listVariable, callback,miseAJourReact) {
            connexionMariaDb.query('SELECT * FROM Utilisateur', function (err, rows) {
                console.log("error--" + err);
                //console.log(rows);
                var data = rows;
                console.log("SELECT OK\n");
                callback();
				miseAJourReact(rows);
            });
        };
        MariaDb_Operations.prototype.listerOneUser = function (connexionMariaDb, listVariable, callback,miseAJourReact) {
            connexionMariaDb.query('SELECT * FROM Utilisateur WHERE u_idUtilisateur=?', listVariable,function (err, rows) {
                console.log("error--" + err);
                //console.log(rows);
                var data = rows;
                console.log("SELECT OK\n");
                callback();
                miseAJourReact(rows);
            });
        };
        MariaDb_Operations.prototype.listerSuivi = function (connexionMariaDb, listVariable, callback) {
            connexionMariaDb.query('SELECT * FROM SuiviCour', function (err, rows) {
                console.log("error--" + err);
                //console.log(rows);
                var data = rows;
                console.log("SELECT OK\n");
                callback();
            });
        };
        MariaDb_Operations.prototype.insertUser = function (connexionMariaDb, listVariable, callback) {
            connexionMariaDb.query('INSERT INTO Utilisateur (u_idUtilisateur, u_nom, u_prenom,'
                + 'u_identifiant, u_password) VALUES (?,?,?,?,?)', listVariable, function (err, result) {
                console.log("error--" + err);
                //console.log(result);
                var data = result;
                console.log("INSERT OK\n");
                callback();
            });
        };
        MariaDb_Operations.prototype.insertSuivi = function (connexionMariaDb, listVariable, callback) {
            connexionMariaDb.query('INSERT INTO SuiviCour (s_id, s_chapitre, s_sousChapitre,'
                + 's_fini, f_id) VALUES (?,?,?,?,?)', listVariable, function (err, result) {
                console.log("error--" + err);
                //console.log(result);
                var data = result;
                console.log("INSERT OK\n");
                callback();
            });
        };
        MariaDb_Operations.prototype.updateUser = function (connexionMariaDb, listVariable, callback) {
            connexionMariaDb.query('UPDATE Utilisateur SET u_nom=? , u_prenom=? , u_identifiant=?,'
                + 'u_password=? WHERE u_idUtilisateur =?', listVariable, function (err, result) {
                console.log("error--" + err);
                //console.log(result);
                var data = result;
                console.log("UPDATE OK\n");
                callback();
            });
        };
        MariaDb_Operations.prototype.updateSuivi = function (connexionMariaDb, listVariable, callback) {
            connexionMariaDb.query('UPDATE SuiviCour SET s_chapitre=?, s_sousChapitre=?, s_fini=?,'
                + 'f_id=? WHERE s_id=?', listVariable, function (err, result) {
                console.log("error--" + err);
                //console.log(result);
                var data = result;
                console.log("UPDATE OK\n");
                callback();
            });
        };
        MariaDb_Operations.prototype.deleteUser = function (connexionMariaDb, listVariable, callback) {
            connexionMariaDb.query('DELETE FROM Utilisateur WHERE u_idUtilisateur=?', listVariable, function (err, result) {
                console.log("error--" + err);
                //console.log(result);
                var data = result;
                console.log("DELETE OK\n");
                callback();
            });
        };
        MariaDb_Operations.prototype.deleteSuivi = function (connexionMariaDb, listVariable, callback) {
            connexionMariaDb.query('DELETE FROM SuiviCour WHERE s_id=?', listVariable, function (err, result) {
                console.log("error--" + err);
                //console.log(result);
                var data = result;
                console.log("DELETE OK\n");
                callback();
            });
        };
        return MariaDb_Operations;
    }());
    exports.MariaDb_Operations = MariaDb_Operations;
});
