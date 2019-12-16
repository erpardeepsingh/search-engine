const pool = require('../lib/db');

function search(search_string, func) {
	str = search_string.replace(/\s+/g, " | ");
	 pool.query(
	 	"SELECT api_name,vendor_name, ts_rank_cd(weighted_tsv, to_tsquery($1)) AS rank FROM apis WHERE weighted_tsv @@ to_tsquery($1) ORDER BY rank DESC", 
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