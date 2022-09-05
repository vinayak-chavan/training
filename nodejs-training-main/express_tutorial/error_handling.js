//error in synchronous code
app.get('/',(req,res) =>{
	throw new Error ('broken')
})


//error in asynchronous code
app.get('/',(req,res,next) => {
	fs.readFile('file not exist', (err, data) => {
		if(err){
			next(err)
		}
		else{
			res.send(data)
		}
	})
})
