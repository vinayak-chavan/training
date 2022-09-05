const fs = require('fs');
const path= require('path');
const fileUsers = path.join(__dirname,'..' ,'data', 'users.json')
const fileProjects =path.join(__dirname,'..', 'data', 'projects.json')
const fileTasks = path.join(__dirname,'..', 'data', 'tasks.json')

fetchPromise = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if(err){
                reject(new Error(`file is not readable`));
            }
            resolve(data);
        })
    })
}

const dataPromise = () => {
    Promise.all([
        fetchPromise(fileUsers),
        fetchPromise(fileProjects),
        fetchPromise(fileTasks)
    ]).then((dataArray) => {
        users=JSON.parse(dataArray[0])
        projects=JSON.parse(dataArray[1])
        tasks=JSON.parse(dataArray[2])
        const result = [];
        users.forEach(user => {
        userProjectList = user["projects"];
        const projectData = [];
        userProjectList.forEach(userProjectID => {
            projects.forEach(project => {
                if(project.ID === userProjectID){
                    const taskData = [];

                        tasks.forEach(task => {
                            if(task.projectID === userProjectID){
                                taskData.push(task);
                            }
                        });
                    project["tasks"] = taskData;
                    projectData.push(project);
                }
            });
            
        });
        user["projects"] = projectData;
        result.push(user);
    });
    console.log(JSON.stringify(result,null,2));
    }).catch((err)=> {
        return console.error(err);
    })
}

module.exports = dataPromise;
