const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(express.json());
// Add morgan middleware, log messages using tiny configuration
app.use(morgan("tiny"));
// Add cors middleware to allow requests from all origins
app.use(cors());

let phonebookData = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Phonebook homepage
app.get("/", (request, response) => {
  response.send(
    `<h1>Phonebook Assignment for Part 3</h1>
    <a href="/info">Summary</a>
    <a href="/api/persons">Persons</a>
    `
  );
});
// Phonebook summary
app.get("/info", (request, response) => {
  date = new Date();
  response.send(
    `<p>Phonebook has info for ${phonebookData.length} people</p>
    <p>${date}</p>
    `
  );
});
// Fetch the entire phonebook
app.get("/api/persons", (request, response) => {
  response.json(phonebookData);
});

// Fetch a single entry
app.get("/api/persons/:id", (request, response) => {
  // Convert parameter ID string into number
  const id = Number(request.params.id);
  // Find appropriate entry
  const entry = phonebookData.find((p) => p.id === id);

  // If entry exists
  if (entry) {
    // Display entry
    response.json(entry);
  } else {
    // Return 404 and respond to request without sending data if entry not found
    response.status(404).end();
  }
});

// Delete entry
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  phonebookData = phonebookData.filter((entry) => entry.id !== id);

  response.status(204).end();
});

// Add entry
app.post("/api/persons", (request, response) => {
  // Generate ID
  const newId = Math.random() * (100000000, -100000000) - 100000000;
  // Get request body
  const body = request.body;
  // Check if name/number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "entry is missing a name or number",
    });
  }
  // Check if name already exists in phonebook
  if (phonebookData.filter((person) => person.name === person.name)) {
    return response.status(400).json({
      error: "name already exists in phonebook",
    });
  }

  // Create new entry object
  const entry = {
    id: newId,
    name: body.name,
    number: body.number,
  };

  // Add entry to phonebook
  phonebookData = phonebookData.concat(entry);
});

// PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
