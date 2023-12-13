const express = require("express");
const mongoose = require("mongoose");
const port = 3001;
const app = express();

mongoose.connect("mongodb://localhost/confessions2k24", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
let db = mongoose.connection;

app.use(express.json());

// For serving static HTML files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.set({
		"Allow-access-Allow-Origin": "*",
	});

	// res.send("Hello World");
	return res.redirect("main.html");
});

app.post("/formFillUp", (req, res) => {
	const message = req.body.message;
	const to = req.body.to;
	const from = req.body.from;
	

	const data = {
		message: message,
		to: to,
		from: from,
		
	};

	db.collection("confessions").insertOne(
		data, (err, collection) => {
			if (err) {
				throw err;
			}
			console.log("Data inserted successfully!");
		});

	return res.redirect("success.html");
});



//for admin login

app.get("/login.html", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "login.html"));
  });


//for admin page

app.get("/admin.html", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "admin.html"));
  });




//fetch data from backend


// Add a new route to serve the displayData.html page
app.get("/displayData", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "displayData.html"));
  });
  
  // Add a new API route to fetch data
  app.get("/api/data", async (req, res) => {
	try {
	  const data = await db.collection("confessions").find().toArray();
	  res.json(data);
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  
  // ... (Remaining server code)
  






app.listen(port, () => {
	console.log(`The application started
successfully on port ${port}`);
});
