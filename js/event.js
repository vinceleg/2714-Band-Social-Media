

const mysql = require('../mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'bandsocialmedia'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
connection.query('SELECT * FROM event WHERE event_id = ' + id + ';'), (err,rows) => {
    if (err) throw err;

}
document.getElementsByName

document.getElementsByName("button")[0].addEventListener("click", function(){
  connection.query('SELECT band_name FROM band WHERE band_id IN (SELECT band_id FROM event_band WHERE event_id = ' + id + ');'), (err,rows) => {
    if(err) throw err;
    console.log(rows);
}
})
