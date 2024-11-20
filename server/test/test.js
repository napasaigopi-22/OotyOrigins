const request = require("supertest");
const app = require("../server"); // Adjust the path to your app

describe("Signup Endpoint Tests", () => {
  test("Valid Signup - should return 200 and a success message", async () => {
    const newUser = {
      username: "newuse0r123",
      email: "newuser0123@example.com",
      password: "secure0password",
      address: {
        street: "1230 Main Street",
        city: "Springfield",
        state: "IL",
        zipcode: "62704"
      },
      phone: "123-456-7890",
      IsUser: true
    };

    const res = await request(app).post("/signup").send(newUser);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Login successful");
    expect(res.body).toHaveProperty("jwtToken");
    expect(res.body).toHaveProperty("username", "newuse0r123");
  });

  test("Signup with Missing Fields - should return 400", async () => {
    const incompleteUser = {
      username: "newuser123",
      email: "newuser123@example.com",
      password: "short"
    };

    const res = await request(app).post("/signup").send(incompleteUser);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid email or password");
  });

  test("Signup with Existing Email - should return 400", async () => {
    const duplicateUser = {
      username: "anotheruser",
      email: "newuser0123@example.com", // Assume this email already exists
      password: "secure0password",
      address: {
        street: "456 Another Street",
        city: "Springfield",
        state: "IL",
        zipcode: "62704"
      },
      phone: "123-456-7890",
      IsUser: true
    };

    const res = await request(app).post("/signup").send(duplicateUser);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "User already exists");
  });
});

describe("Login Endpoint Tests",()=>{
  test('POST /login - should authenticate user and return a JWT token', async () => {
  const testUser = {
    username: "newuse0r123",
    email: "testuser123@example.com",
    password: 'secure0password', // Hash password manually for test setup
    address: {
      street: "123 Test St",
      city: "Testville",
      state: "TS",
      zipcode: "12345"
    },
    phone: "123-456-7890",
    IsUser: true,
    userId: "user 1"
  };

  // Step 2: Define the login payload
  const loginPayload = {
    username: testUser.username,
    password: testUser.password // Use the plain password for testing
  };

  // Step 3: Make the POST request to the login endpoint
  const res = await request(app).post('/login').send(loginPayload);

  // Step 4: Validate the response
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('message', "Login successful");
  expect(res.body).toHaveProperty('success', true);
  expect(res.body).toHaveProperty('jwtToken');
  expect(res.body).toHaveProperty('username', loginPayload.username);
});

test('POST /login - should return 403 for invalid username', async () => {
  const loginPayload = {
    username: "nonexistentuser",
    password: "securepassword"
  };

  const res = await request(app).post('/login').send(loginPayload);

  expect(res.statusCode).toBe(403);
  expect(res.body).toHaveProperty('message', "Authentication failed, email or password is wrong");
  expect(res.body).toHaveProperty('success', false);
});

test('POST /login - should return 403 for incorrect password', async () => {
  // Assuming a user already exists in the database
  const loginPayload = {
    username: "testuser123",
    password: "wrongpassword"
  };

  const res = await request(app).post('/login').send(loginPayload);

  expect(res.statusCode).toBe(403);
  expect(res.body).toHaveProperty('message', "Authentication failed, email or password is wrong");
  expect(res.body).toHaveProperty('success', false);
});

test('POST /login - should return 400 for missing fields', async () => {
  const loginPayload = {
    username: "testuser123"
    // Missing password
  };

  const res = await request(app).post('/login').send(loginPayload);

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty('message', "Email and password are required");
  expect(res.body).toHaveProperty('success', false);
});
after(() => {
  server.close(); // Ensures the server is properly shut down
});
})
