const http = require('http');
const fs = require('fs');

let writeToFile = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if(err) return reject(err);
            resolve(data);
        });
    })
}

let getUserID = () => {
    let count; let idArr =[];
    let userDataInObj = JSON.parse(fs.readFileSync("./jobs.json", 'utf-8', err => {
        if(err) console.error(err);
    }));
    userDataInObj.forEach(( obj => {
        idArr.push(obj.ID);
    }));
    for(let i=1; ;i++){
        if(!idArr.includes(i)){
            count = i;
            return count;
        }
    }
}

let readData = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, data) => {
            if(err) return reject(new Error(err));
            resolve(data);
        })
    })
}

const server = http.createServer( async (req, res) => {
    if(req.method == 'PUT'){
       updateData(req, res);
    }
    else if(req.method === 'GET'){
       displayData(req,res);
    }
    else if(req.method === 'POST'){
        addData(req, res);
    }
    else if(req.method === 'DELETE'){
       deleteData(req, res)
    }
});

server.listen(8000, console.log("Server running 8000 port"));

function displayData(req,res){
    const url = new URL(req.url, "http://localhost:8000");
    let id = url.searchParams.get("id");
    if(typeof id === 'object'){
        readData("./jobs.json")
        .then(data => {
            console.log(JSON.parse(data))
            res.end(data);
        })
        .catch(err => console.error(err));
        console.log("all data fetched succesfully");
    }else{
        id = parseInt(id);
        readData("./jobs.json")
        .then(data => {
            let idArr = [];
            data = JSON.parse(data);
            data.forEach(job => {
                idArr.push(job.ID);
            })
            if(idArr.includes(id)){
                console.log("data fetch successfully");
                data.forEach( jobObj => {
                    if(jobObj.ID === id){
                        console.log(jobObj);
                        res.end(JSON.stringify(jobObj));
                    }
                });
            }else{
                console.log("data doesn't exist");
                res.end("data doesn't exist");
            }
        })
        .catch(err => console.error(err));
    }
}
function deleteData(req, res){
    const url = new URL(req.url, "http://localhost:8000");
    const id = parseInt(url.searchParams.get("id"));
    readData("./jobs.json")
    .then( data => {
        let idArr = [];
        data = JSON.parse(data.toString());
        data.forEach( obj => {
            idArr.push(obj.ID);
        });
        if(idArr.includes(id)){
            readData("./jobs.json").then( data => {
                let dataDelete = [];
                data = JSON.parse(data);
                data.forEach( obj => {
                    if(obj.ID != id){
                        dataDelete.push(obj);
                    }
                });
                writeToFile("./jobs.json", dataDelete)
                .then( (data) => {
                    console.log("data deleted successfully")
                    res.end(JSON.stringify(dataDelete));
                })
                .catch( (err) => console.error(err));
            })
            .catch(err => console.error(err));
        }else{
            console.log("data doesn't exist");
            res.end("data doesn't exist");
        }
    })
    .catch( (err) => console.error(err));
}
function addData(req, res){
    let dataAdd = "";
        req.on('data', chunk => {
            dataAdd += chunk;
        });
        req.on('end', () => {
            dataAdd = JSON.parse(dataAdd);
            dataAdd.ID = getUserID();
            readData("./jobs.json")
            .then( data => {
                data = JSON.parse(data);
                data.push(dataAdd);
                writeToFile("./jobs.json", data)
                .then( (data) => {
                    console.log("data added successfully")
                    res.end(JSON.stringify(dataAdd));
                })
                .catch( (err) => console.error(err));
            }).catch(err => console.error(err));
        });
}
function updateData(req, res){
    const url = new URL(req.url, "http://localhost:8000");
    const id = parseInt(url.searchParams.get("id"));
    readData("./jobs.json")
    .then( data => {
        let idArr = [];
        data = JSON.parse(data.toString());
        data.forEach( obj => {
            idArr.push(obj.ID);
        });
        if(idArr.includes(id)){
            let dataUpdate = "";
            req.on('data', chunk => {
                dataUpdate += chunk;
            });
            req.on('end', () =>{
                dataUpdate = JSON.parse(dataUpdate);
                data.forEach( jobObj => {
                    if(jobObj.ID === id) {
                        for( const [key, value] of Object.entries(dataUpdate)){
                            if(typeof value === 'string'){
                                jobObj[key] = value;
                            }else{
                                for( const [key2, value2] of Object.entries(value)){
                                    jobObj[key][key2] = value2;
                                }
                            }
                        }
                    }
                });
                writeToFile("./jobs.json", data)
                .then( (data) => {
                    console.log("data updated succesfully");
                    res.end(JSON.stringify(dataUpdate));
                })
                .catch( (err) => console.error(err));
            });
        }else{
            console.log("data doesn't exist");
            res.end("data doesn't exist");
        }
    })
    .catch( (err) => console.error(err));
}
