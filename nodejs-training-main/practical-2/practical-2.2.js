class employee{
    static organizationName = 'Bacancy Technology';
    #employeeId
    #department
    #designation
    #techKnown
    #dateOfJoining
    #experience  
    constructor(id, joinDate, exp){
        this.#employeeId = id;
        this.#dateOfJoining = joinDate;
        this.#experience = exp;
    }
    set setData(value){
        const parts = value.split(',');
        this.#department = parts[0];
        this.#designation = parts[1];
        this.#techKnown = parts[2];
    }
    get getData(){
       console.log(` Organization name : ${employee.organizationName}\n Employee ID : ${this.#employeeId}\n Department : ${this.#department}\n Designation : ${this.#designation}\n Technology Known : ${this.#techKnown}\n date of Joining : ${this.#dateOfJoining}\n Experience : ${this.#experience}`);
    }
}

let obj = new employee(17, 'jan 01, 2021', '1 years');
obj.setData= 'Web, Junior Engineer, NodeJS';
obj.getData;
