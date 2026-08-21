const express = require("express")
const app = express()
const PORT = 3000

const users = [
  { id: 1, name: "Zacksman", role: "Admin", active: true },
  { id: 2, name: "Bobby Emma", role: "User", active: false },
  { id: 3, name: "Charlie", role: "Moderator", active: true },
  { id: 4, name: "Diana", role: "User", active: true }
];


app.use(express.json())

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Welcome to my Pagination API"
	})
})

app.get("/users", (req, res) =>{
	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 2

	const start = (page - 1) * limit
	const end = start + limit

	const paginateUser = users.slice(start, end)

	console.log("Page", page)
	console.log("Limit", limit)


	res.status(200).json({
		page: page,
		limit: limit,
		total: users.length,
		data: paginateUser
	})
})

app.listen(PORT, ()=>{
	console.log({
		port: PORT,
		health: "good",
		isRunning: true
	})
})