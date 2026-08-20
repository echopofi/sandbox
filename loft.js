const express = require("express")
const app = express()
const PORT = 3003
const users = [
  { id: 1, name: "Zacksman", role: "Admin", active: true },
  { id: 2, name: "Bobby Emma", role: "User", active: false },
  { id: 3, name: "Charlie", role: "Moderator", active: true },
  { id: 4, name: "Diana", role: "User", active: true }
];

app.use(express.json())

app.get("/", (req, res)=>{
	res.send("Welcome to my test api")
})

app.get("/users", (req, res)=>{
	res.json(users)
})

app.get("/users/:index", (req, res)=>{
	const index = Number(req.params.index)
	const user = users[index]

	if (!user){
		return res.json({message: "User not found"})
	}
	res.json(user)
})


app.listen(PORT, ()=>{
	console.log("Server running at Port 3003")
})
