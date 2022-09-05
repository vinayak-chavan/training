const request = require("supertest");

describe('Testing Project Controller', () => {
  
    test("should Throw an Error Adding a Project - Data Required", async () => {
      const payload = {
        title:"Inventory Management System",
      };
  
      const response = await request(app)
        .post("/addProject")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Adding a Project - Data Required", async () => {
      const payload = {
        description:"It is an Inventory Management System"
      }
      const response = await request(app)
        .post("/addProject")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Add a Non-existing Project", async () => {
      const payload = {
        title:"Inventory Management System",
        description:"It is an Inventory Management System"
      };
      
      const response = await request(app)
        .post("/addProject")
        .send(payload);
      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Adding an Existing Project", async () => {
      const payload = {
        title:"Inventory Management System",
        description:"It is an Inventory Management System"
      };
      const response = await request(app)
        .post("/addProject")
        .send(payload);
      expect(response.statusCode).toBe(302);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Get an Existing Project", async () => {
      const payload = {
        id:1
      };
  
      const body = {
        title:"Inventory Management System",
        description:"It is an Inventory Management System"
      }
  
      const response = await request(app)
        .post("/getProject")
        .send(payload);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Getting a Project - Data Required", async () => {
			
	   const payload = {
        id:null
      };
			
      const response = await request(app)
        .post("/getProject")
        .send(payload);
      expect(response.statusCode).toBe(406);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Update an Existing Project", async () => {
      const payload = {
        id:1
      };
  
      const response = await request(app)
        .post("/updateProject")
        .send(payload);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Updating a Movie - Data Required", async () => {
  
			const payload = {
        id:null
      };

      const response = await request(app)
        .post("/updateProject")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });
  
    test("should Throw an Error Updating a Project - Data Required", async () => {
      const payload = {
				id:1
      };
    
      const response = await request(app)
        .post("/updateProject")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });
  
		test("should Throw an Error deleting a Movie - Data Required", async () => {
  
			const payload = {
        id:null
      };

      const response = await request(app)
        .post("/updateProject")
        .send(payload);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(body);
    });

    test("should Delete an Existing Project", async () => {
      const payload = {
        id:1
      };
  
      const body = {
				title:"Inventory Management System",
        description:"It is an Inventory Management System"
      }
  
      const response = await request(app)
        .post("/deleteProject")
        .send(payload);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(body);
    });

  });