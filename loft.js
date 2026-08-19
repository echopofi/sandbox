const express = require("express")
const app = express()
const PORT = 3002
app.use(express.json())

app.get("/f", (req, res) =>{
	res.json({
		"message": "Hello World",
		"status":"EP hit",
		"isActive": true,

	})
})

app.listen(PORT, () =>{
	console.log("Server PORT 3002")
})
