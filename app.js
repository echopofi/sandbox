const express = require("express")
const app = express()
app.use(express.json())

app.get("/", (req, res) => {
	//res.status(200).json({message: "hello world", status: "succuess"})
	//res.sendStatus(200).json({message: "hhhhhh"})
	//res.redirect("http://fb.com")//redirects to an external link
	res.redirect("/redirection")
})


app.get("/redirection", (req, res)=>{
	res.send("redirected end-point")
})

app.listen(3001, () =>{
	console.log("Sever up PORT 3001")
})
