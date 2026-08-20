const express = require("express")
const app = express()
app.use(express.json())


const users = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
  },
  {
    first_name: 'Alice',
    last_name: 'Smith',
    email: 'alicesmith@example.com',
  },
];

app.get("/", (req, res) => {
	//res.status(200).json({message: "hello world", status: "succuess"})
	//res.sendStatus(200).json({message: "hhhhhh"})
	//res.redirect("http://fb.com")//redirects to an external link
	//res.redirect("/redirection")
	

	res.json(users)
})


app.get("/redirection", (req, res)=>{
	res.send("redirected end-point")
})

app.get("/users/:index", (req, res) =>{
	const index = Number(req.params.index)
	const user = users[index]

	if (!user){
		return res.status(400).json({message: "User not found"})
	}
	res.status(200).json(users[index])
})

app.listen(3001, () =>{
	console.log("Sever up PORT 3001")
})
