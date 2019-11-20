const pool = require('../lib/db');

function search(search_string, func) {
	str = search_string.replace(/\s+/g, " | ");
	 pool.query(
	 	"SELECT * FROM apis WHERE fts @@ to_tsquery($1)", 
	 	[str],
	 	function(err, result) {	 
		    if(err) {
		    	func([])
		    } else {
		    	func(result.rows)
		    }
		}
	);
}

module.exports = search