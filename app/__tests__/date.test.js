const request = require("supertest");
const { app } = require("../app.js");
const { seed } = require("../../db/seed.js");
const { dates } = require("../../db/data/testdata.json");
const db = require('../../db/connection.js')

beforeEach(() => {
  return seed(dates);
});

afterAll(() => {
  return db.end()
})

describe("GET", () => {
  test("/api/dates, status 200: responds with an array of date objects", () => {
    return request(app)
      .get("/api/dates")
      .expect(200)
      .then(({ body }) => {
        const dates = body;
        expect(Array.isArray(dates)).toBe(true);
        expect(dates).toHaveLength(3);
        dates.forEach((date) => {
          expect(typeof date).toEqual("object");
          expect(date).toHaveProperty("title");
          expect(date).toHaveProperty("description");
          expect(date).toHaveProperty("address");
          expect(date).toHaveProperty("postcode");
          expect(date).toHaveProperty("price_estimation");
        });
      });
  });
  test("/api/dates/:date_id, status 200: responds with a single date object", () => {
    return request(app)
    .get("/api/dates/2")
    .expect(200)
    .then(({ body }) => {
      const date = body;
      expect(typeof date).toBe('object');
      expect(date).toMatchObject({
          id: 2,
          title: "Big home and bargain",
          description:
            "literally going to a big home and bargain and spending money lol",
          address: "Stephenson Way, Liverpool",
          postcode: "L37 8EG",
          "price_estimation": 100,
      })
    })
  })
});

describe("POST", () => {
  test("/api/dates, status 201: should accept an object with title, description, address, postcode and price_estimation and assign a new id. It should also return the new posted date", () => {
    const sendDate = {
      title: "Costco",
      description: "we go to costco, we buy things, we are happy",
      address: "30 Waterloo Road Liverpool",
      postcode: "L3 7HY",
      price_estimation: 100,
    };
    return request(app)
      .post(`/api/dates`)
      .send(sendDate)
      .expect(201)
      .then(({ body }) => {
        expect(body).toMatchObject({
          id: 4,
          title: "Costco",
          description: "we go to costco, we buy things, we are happy",
          address: "30 Waterloo Road Liverpool",
          postcode: "L3 7HY",
          price_estimation: 100,
        });
      });
  });
});

describe("PATCH", () => {
  test("/api/dates/:date_id, status 200: should be able to update an existing park", () => {
    const sendPatch = {
      price_estimation: 25,
    };
    return request(app)
      .patch("/api/dates/2")
      .send(sendPatch)
      .expect(200)
      .then(( {body} ) => {
        expect(typeof body).toBe("object");
        expect(body).toEqual({
          id: 2,
          title: "Big home and bargain",
          description:
            "literally going to a big home and bargain and spending money lol",
          address: "Stephenson Way, Liverpool",
          postcode: "L37 8EG",
          "price_estimation": 25,
        });
      });
  });
});

describe('DELETE', () => {
  test("/api/dates/:date_id, status 204: should be able to delete a park - returns no content", () => {
    return request(app)
    .delete('/api/dates/4')
    .expect(204)
  });
});

describe("ERROR HANDLING", () => {
  test("/api/datez, status 404: not found - wrong url", () => {
    return request(app)
    .get('/api/datez')
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe('Not Found')
    })
  })
  test("/api/dates/:date_id, status 404: not found - date_id does not exist", () => {
    const id = 5000
    return request(app)
    .get(`/api/dates/${id}`)
    .expect(404)
    .then((response) => {
      expect(response.body).toEqual({msg: 'Date ID does not exist.'})
    })
  })
  test("/api/dates/:date_id, status 400: client error of incorrect date_id types", () => {
    const id = 'hi'
    return request(app)
    .get(`/api/dates/${id}`)
    .expect(400)
    .then((response) => {
      expect(response.body).toEqual({msg: 'Incorrect data type for Date ID.'})
    })
  })
})
