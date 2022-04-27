import app from '../../app.js'
import request from "supertest";


describe('Error handling!', () => {
  test("It should return 400 status code if POST body request fields are empty strings", async () => {
    const response = await request(app)
      .post('/create-user')
      .send({
        first_name: '',
        last_name: '',
        note: '',
        email: ''
      });
    expect(response.status).toBe(400);
  });
  test("It should return 400 status code if POST body request fields are missing on the body", async () => {
    const response = await request(app)
      .post('/create-user')
      .send({
        first_name: '',
      });
    expect(response.status).toBe(400);
  });
  test("It should return 400 status code if POST body request fields are not expected", async () => {
    const response = await request(app)
      .post('/create-user')
      .send({
        first_name: '',
        new_unexpected_field: 1000
      });
    expect(response.status).toBe(400);
  });
  test("It should return 400 status code if email on the POST body request is not valid", async () => {
    const response = await request(app)
      .post('/create-user')
      .send({
        first_name: 'esteban',
        last_name: 'principe',
        note: 'fullstack developer',
        email: 'not_an_email'
      });
    expect(response.status).toBe(400);
  });

  test("It should return 400 status code if DELETE request has no id query string", async () => {
    const response = await request(app)
      .delete('/delete-user')
    expect(response.status).toBe(400);
  });

  test("It should return 400 status code if PUT request has no id query string", async () => {
    const response = await request(app)
      .put('/update-user')
    expect(response.status).toBe(400);
  });

  test("It should return 400 status code if PUT body request has unexpected fields", async () => {
    const response = await request(app)
      .put('/update-user')
      .send({
        first_name: 'esteban',
        last_name: 'principe',
        note: 'fullstack developer',
        email: 'not_an_email',
        new_unexpected_field: 1000
      });
    expect(response.status).toBe(400);
  });

});