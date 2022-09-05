const fs = require('fs');
const path= require('path');
const fileUsers = path.join(__dirname,'..' ,'data', 'users.json')
const fileProjects =path.join(__dirname,'..', 'data', 'projects.json')
const fileTasks = path.join(__dirname,'..', 'data', 'tasks.json')

fetchCallback = (file,callback) => {
    fs.readFile(file, "utf-8", (err, data) => {
        if(err) return callback(new Error("file is not readable"));
        return callback(null, data);
    })
}

const dataCallback = () => {
    let user;
    let project;
    let task;
    fetchCallback(fileUsers, (err,dataUser) => {
        if(err) console.log(err);
        user = dataUser;           
        fetchCallback(fileProjects, (err, dataProject) => {
            if(err) console.log(err);
            project = dataProject;
            fetchCallback(fileTasks, (err, dataTasks) => {
                if(err) console.log(err);
                task = dataTasks;
                const users = JSON.parse(user)
                const projects = JSON.parse(project)
                const tasks = JSON.parse(task)
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
            })
        })
    }) 
}

module.exports = dataCallback;
