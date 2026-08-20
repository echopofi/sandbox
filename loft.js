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

app.get("/users/:index/role", (req, res)=>{
	const index = Number(req.params.index)
	const user = users[index]

	if (!user){
		return res.json({message: "User not found"})
	}
	res.json({message: user.name})
})


app.get("/search", (req,res) => {
	const role = req.query.role
	const filtered = users.filter(user => user.role.toLowerCase() === role.toLowerCase())

	if (filtered.length === 0) {
		return res.status(404).json({ message: "Role not assigned to user" })
	}
	res.status(200).json(filtered)
})

app.get("/count", (req, res) => {
	res.json({count: users.length})
})


app.listen(PORT, ()=>{
	console.log("Server running at Port 3003")
})
