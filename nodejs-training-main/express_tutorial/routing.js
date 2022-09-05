app.route('/book')
.get((req, res) => {
	res.send('get a random book');
})
.post((req,res) => {
	res.send('add a book');
})
.put((req,res) => {
	res.send('update the book');
})
.delete((req,res) => {
	res.send('delete the book');
})