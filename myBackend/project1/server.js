require("dotenv").config()
const express = require("express")
const app = express()
const useRoutes = require("./routes/userRoutes")
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use("/users", useRoutes)

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "CustomerDB API is running successfully!" })
})

app.listen(PORT, () => {
	console.log({
		success: true,
		message: "Server running",
		port: PORT
	})
})