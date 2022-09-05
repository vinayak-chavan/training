const fs = require('fs');
const path= require('path');
const fileUsers = path.join(__dirname,'..' ,'data', 'users.json')
const fileProjects =path.join(__dirname,'..', 'data', 'projects.json')
const fileTasks = path.join(__dirname,'..', 'data', 'tasks.json')

fetchAsync = async (file) => {
    try{
        const result = await fs.promises.readFile(file, "utf-8");
        return result;
    }catch(err){
        console.log(err);
    }
}

const dataAsync = async () => {
    const u  = await fetchAsync(fileUsers);
    const p = await fetchAsync(fileProjects);
    const t = await fetchAsync(fileTasks);
    const users = JSON.parse(u)
    const projects = JSON.parse(p)
    const tasks = JSON.parse(t)
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
}
 
module.exports = dataAsync;   
