const request = require("supertest");

describe('Testing user Controller', () => {
  
    test("should Throw an Error Adding a user - Data Required", async () => {
      const payload = {
        fullName: "Vinayak Chavan",
        designation: "Software Developer",
        department: "NodeJS",
        technologiesKnown: ["JavaScript, NodeJS, MongoDB"],
        projects: [1,2,4],
      };
  
      const response = await request(app)
        .post("/addUser")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Adding a user - Data Required", async () => {
      const payload = {
        fullName: "Vinayak Chavan",
        emailId: "vinayak.chavan@bacancy.com",
        designation: "Software Developer",
        department: "NodeJS",
      };
  
      const response = await request(app)
        .post("/addUser")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Add a Non-existing user", async () => {
      const payload = {
        fullName: "Vinayak Chavan",
        emailId: "vinayak.chavan@bacancy.com",
        designation: "Software Developer",
        department: "NodeJS",
      	technologiesKnown: ["JavaScript, NodeJS, MongoDB"],
        projects: [1,2,4],
      };
      
      const response = await request(app)
        .post("/addUser")
        .send(payload);
      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Adding an Existing User", async () => {
      const payload = {
        fullName: "Vinayak Chavan",
        emailId: "vinayak.chavan@bacancy.com",
        designation: "Software Developer",
        department: "NodeJS", 
        technologiesKnown: ["JavaScript, NodeJS, MongoDB"],
        projects: [1,2,4],
    	};
      const response = await request(app)
        .post("/addUser")
        .send(payload);
      expect(response.statusCode).toBe(302);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Get an Existing User", async () => {
      const payload = {
        id: 1
      };
  
      const body = {
				fullName: "Vinayak Chavan",
        emailId: "vinayak.chavan@bacancy.com",
        designation: "Software Developer",
        department: "NodeJS", 
        technologiesKnown: ["JavaScript, NodeJS, MongoDB"],
        projects: [1,2,4],
      }
  
      const response = await request(app)
        .post("/getUser")
        .send(payload);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Getting a user - Data Required", async () => {
  
			const payload = {
        id: 1
      };

      const response = await request(app)
        .post("/getUser")
        .send(payload);
      expect(response.statusCode).toBe(406);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Update an Existing User", async () => {
      const payload = {
        id:1
      };
  
      const response = await request(app)
        .post("/updateUser")
        .send(payload);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Updating a Movie - Data Required", async () => {
  
      const payload = {
        id: null
      };

      const response = await request(app)
        .post("/updateUser")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Updating a User - Data Required", async () => {
      const payload = {
				id:1
      };
    
      const response = await request(app)
        .post("/updateUser")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });
  
		test("should Throw an Error Deleting a Movie - Data Required", async () => {
  
      const payload = {
        id: null
      };

      const response = await request(app)
        .post("/deleteUser")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });

    test("should Delete an Existing User", async () => {
      const payload = {
        id:1
      };
  
      const body = {
				fullName: "Vinayak Chavan",
				emailId: "vinayak.chavan@bacancy.com",
				designation: "Software Developer",
				department: "NodeJS", 
				technologiesKnown: ["JavaScript, NodeJS, MongoDB"],
				projects: [1,2,4],
      }
  
      const response = await request(app)
        .post("/deleteUser")
        .send(payload);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(body);
    });

  });