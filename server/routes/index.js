
module.exports = function(app) {
	app.get('/api', (req, res) => {
		res.render('index', {title: 'Express'});
	})
}