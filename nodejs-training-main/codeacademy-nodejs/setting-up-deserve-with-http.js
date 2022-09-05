
// The HTTP Module

const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello World');
});
server.listen(4001, () => {
  const { address, port } = server.address();
  console.log(`Server is listening on: http://${address}:${port}`);
});


// The Anatomy of the URL

const http = require('http');
const url = 'http://example.com/users/25/projects?type=personal&month=january';
http.get(url, (res) => {
  let data = '';  
  res.on('data', (chunk) => {
    data += chunk;
  }); 
  res.on('end', () => {
    console.log(data);
  });
});


// The URL Module

const url = require('url');
const URL_TO_PARSE = 'https://www.example.com/p/a/t/h?prop1=value1&prop2=value2';
const myUrl = new URL(URL_TO_PARSE);
const hostname = myUrl.hostname;
const pathname = myUrl.pathname;
const searchParams = myUrl.searchParams;


// The Querystring Module

const querystring = require('querystring');
const url = 'https://www.example.com/p/a/t/h?course=node&lesson=http';
const queryToParse = url.split('?')[1];
console.log(queryToParse)
const parsedQuery = querystring.parse(queryToParse);
parsedQuery.exercise = 'querystring';

const modifiedQueryString = querystring.stringify(parsedQuery);


// Routing

const http = require('http');
const handleGetRequest = (req, res) => {
  const pathname = req.url;
  if (pathname === '/users') {
    res.end(JSON.stringify([]));
  }
}
const server = http.createServer((req, res) => {
  const { method } = req;
  switch(method) {
    case 'GET':
      return handleGetRequest(req, res);
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }
});
server.listen(4001, () => {
  const { address, port } = server.address();
  console.log(`Server is listening on: http://${address}:${port}`);
});


// HTTP Status Codes

const http = require('http');
const handleGetRequest = (req, res) => {
  res.statusCode = 200;
  return res.end(JSON.stringify({ data: [] }));
}
const handlePostRequest = (req, res) => {
  res.statusCode = 500;
  return res.end("Unable to create record");
}

const server = http.createServer((req, res) => {
  const { method } = req;
  switch(method) {
    case 'GET':
      return handleGetRequest(req, res);
    case 'POST':
      return handlePostRequest(req, res);
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }
});

server.listen(4001, () => {
  const { address, port } = server.address();
  console.log(`Server is listening on: http://${address}:${port}`);
});


// Interacting with a Database
const http = require('http');
const fs = require('fs');

const handleGetRequest = (req, res) => {
 if (req.url === '/users') {
   // Loads the database and searches for data
   makeDatabaseRequest('users', (err, payload) => {
      if (err) {
        res.writeHeader(400);
        res.write("Error retrieving data");
      } else {
        res.writeHeader(200, {"Content-Type": "application/json"});  
        res.write(JSON.stringify(payload));
      }
      res.end(); 
   });
 }
}


// Interacting with Another Backend API

const http = require('http');
const handleGetRequest = (req, res) => {
  const options = {
    hostname: 'static-assets.codecademy.com',
    path: '/Courses/Learn-Node/http/data.json',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  } 
  const request = http.request(options, response => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      console.log("Retrieved Data:", data);
      res.end(data);
    });
  });
  request.end();
}
const server = http.createServer((req, res) => {
  const { method } = req;
 
  switch(method) {
    case 'GET':
      return handleGetRequest(req, res);
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }
});
server.listen(4001, () => {
  const { address, port } = server.address();
  console.log(`Server is listening on: http://${address}:${port}`);
});
