const apple = require("express")
const app = apple()
const PORT = 3500

app.use(apple.json())

app.get("/phay", (req, res) =>{
	res.send("Hello world, i am Phay")
})

app.get("/happiness", (req, res) => {
	res.json({
		"name": "Happiness",
		"gender": "Female",
		"isMarried": false,
		"age": 35,
		"height": 4.8,
	})
})

app.listen(PORT, () =>{
	console.log("Server at port 3500")
})
