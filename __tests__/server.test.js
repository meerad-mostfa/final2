// src/server/__test__/server.test.js

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Mock server setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

let tripsData = [];
let currentId = 0;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/all', (req, res) => {
  res.json(tripsData);
});

app.post('/add', (req, res) => {
  const newTrip = {
    id: ++currentId,
    ...req.body,
  };
  
  tripsData.push(newTrip);
  res.status(201).json(newTrip);
});

app.put('/update/:id', (req, res) => {
  const tripId = parseInt(req.params.id, 10);
  const index = tripsData.findIndex((trip) => trip.id === tripId);

  if (index !== -1) {
    tripsData[index] = {
      ...tripsData[index],
      ...req.body,
    };

    res.json(tripsData[index]);
  } else {
    res.status(404).json({ message: 'Trip not found' });
  }
});

app.delete('/delete/:id', (req, res) => {
  const tripId = parseInt(req.params.id, 10);
  const index = tripsData.findIndex((trip) => trip.id === tripId);

  if (index !== -1) {
    tripsData.splice(index, 1);
    res.json({ message: 'Trip deleted' });
  } else {
    res.status(404).json({ message: 'Trip not found' });
  }
});

describe('Server API Endpoints', () => {
  beforeEach(() => {
    tripsData = [];
    currentId = 0;
  });

  test('GET /all should return an empty array', async () => {
    const response = await request(app).get('/all');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /add should add a new trip and return it', async () => {
    const newTrip = { destination: 'Paris', date: '2024-10-01' };
    const response = await request(app).post('/add').send(newTrip);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newTrip);
    expect(response.body).toHaveProperty('id');
  });

  test('PUT /update/:id should update the trip and return it', async () => {
    const initialTrip = { destination: 'Berlin', date: '2024-10-01' };
    const addResponse = await request(app).post('/add').send(initialTrip);
    const tripId = addResponse.body.id;

    const updatedTrip = { destination: 'Munich' };
    const updateResponse = await request(app).put(`/update/${tripId}`).send(updatedTrip);
    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body).toMatchObject({ ...initialTrip, ...updatedTrip });
  });

  test('DELETE /delete/:id should delete the trip and confirm deletion', async () => {
    const initialTrip = { destination: 'Rome', date: '2024-10-01' };
    const addResponse = await request(app).post('/add').send(initialTrip);
    const tripId = addResponse.body.id;

    const deleteResponse = await request(app).delete(`/delete/${tripId}`);
    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body).toEqual({ message: 'Trip deleted' });

    const getAllResponse = await request(app).get('/all');
    expect(getAllResponse.body).toHaveLength(0);
  }); 
});
