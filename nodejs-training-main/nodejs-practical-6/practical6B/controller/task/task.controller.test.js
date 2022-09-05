const request = require("supertest");

describe('Testing Task Controller', () => {
  
    test("should Throw an Error Adding a Task - Data Required", async () => {
      const payload = {
        title:"P1 - Task 1",
        description:"P1 - Task 1",
      };
  
      const response = await request(app)
        .post("/addTask")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Adding a Task - Data Required", async () => {
      const payload = {
        title:"P1 - Task 1",
        projectID:1
      };
  
      const response = await request(app)
        .post("/addTask")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Add a Non-existing Task", async () => {
      const payload = {
        title:"P1 - Task 1",
        description:"P1 - Task 1",
        projectID:1
      };
      
      const response = await request(app)
        .post("/addTask")
        .send(payload);
      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Adding an Existing Task", async () => {
      const payload = {
        title:"P1 - Task 1",
        description:"P1 - Task 1",
        projectID:1
      };
      const response = await request(app)
        .post("/addTask")
        .send(payload);
      expect(response.statusCode).toBe(302);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Get an Existing Task", async () => {
      const payload = {
        id:1
      };
  
      const body = {
				title:"P1 - Task 1",
        description:"P1 - Task 1",
        projectID:1
      }
  
      const response = await request(app)
        .post("/getTask")
        .send(payload);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Getting a Task - Data Required", async () => {
			
			const payload = {
        id:null
      };
			
      const response = await request(app)
        .post("/getTask")
        .send(payload);
      expect(response.statusCode).toBe(406);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Update an Existing Task", async () => {
      const payload = {
        id:1
      };
  
      const response = await request(app)
        .post("/updateTask")
        .send(payload);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Updating a Movie - Data Required", async () => {
  
			const payload = {
        id:null
      };

      const response = await request(app)
        .post("/updateTask")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Updating a Task - Data Required", async () => {
      const payload = {
				id:1
      };
    
      const response = await request(app)
        .post("/updateTask")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });
  
		test("should Throw an Error deleting a Movie - Data Required", async () => {
  
			const payload = {
        id:null
      };

      const response = await request(app)
        .post("/updateTask")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });

    test("should Delete an Existing Task", async () => {
      const payload = {
        id:1
      };
  
      const body = {
				title:"P1 - Task 1",
        description:"P1 - Task 1",
        projectID:1
      }
  
      const response = await request(app)
        .post("/deleteTask")
        .send(payload);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(body);
    });

  });