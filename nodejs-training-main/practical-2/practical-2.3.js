class person{
    _fullName
    _email
    _contactNum
    constructor(fullName, email, contactNum){
        this._fullName = fullName;
        this._email = email;
        this._contactNum = contactNum;
    }
    _display(){  
        console.log(` Name: ${this._fullName}\n Email: ${this._email}\n Contact Number: ${this._contactNum}`);
    }
}
class employee extends person{
    static organizationName = 'Bacancy Technology';
    #employeeID = '';
    #department = '';
    #designation = '';
    #technologiesKnown = '';
    #dateOfJoining = '';
    #experience = '';
    set employeeData(value) {
        this.#employeeID = value.id;
        this.#department = value.depa;
        this.#designation = value.desig;
        this.#technologiesKnown = value.tech;
        this.#dateOfJoining = value.dOJ;
        this.#experience = value.expe;
    }
    get employeeData(){
        return {
            fullName: this._fullName,
            email: this._email,
            contactNum: this._contactNum,
            employeeID: this.#employeeID,
            department: this.#department,
            designation: this.#designation,
            technologiesKnown: this.#technologiesKnown,
            dateOfJoining: this.#dateOfJoining,
            experience: this.#experience,
            display: this.display,
        }
    }
    constructor(fullName, email, contact, id, depa, desig, tech, dateofjoin, experience) {
        super(fullName, email, contact);
        this.#employeeID = id;
        this.#department = depa;
        this.#designation = desig;
        this.#technologiesKnown = tech;
        this.#dateOfJoining = dateofjoin;
        this.#experience = experience;
    }
    static sortEmployees(a, b) {
        return a.dateOfJoining - b.dateOfJoining;
    }
    display(){
        console.log(`\nFull Name: ${this.fullName}\nEmail:  ${this.email}\nContact Number:${this.contactNum} \nId: ${this.employeeID}\nDepartment: ${this.department}\nDesignation: ${this.designation}\nTechnology known: ${this.technologiesKnown}\nDate of Joining: ${this.dateOfJoining}\nExperience: ${this.experience}`);
    }
}
let objArr = [];
var obj1 =new employee('vinayak chavan','chavan.vinayak017@gmail.com',7383692583, 11, 'Web', 'Senior developer', 'NodejS', new Date(2017,01, 01), 5);
var obj2 =new employee('pradip prajapati','pradip.prajapti@gmail.com',7183120185, 12, 'Web', 'Senior developer', 'ROR', new Date(2020, 01, 01), 2);
var obj3 =new employee('darshan tank','tank.darshan@gmail.com', 9427190871, 13, 'Web', 'Junior developer', 'ReactjS', new Date(2019, 07, 01), 2.5);
var obj4 =new employee('jay patel','patel.jay@gmail.com',7383692583, 14, 'Mobile', 'Senior developer', 'Android', new Date(2017, 01, 05), 5);
var obj5 =new employee('vishal prajapati','vishal.prajapati@gmail.com',9857565262, 15, 'Mobile', 'Senior developer', 'IOS', new Date(2018, 02, 04),4);
objArr.push(obj1.employeeData);
objArr.push(obj2.employeeData);
objArr.push(obj3.employeeData);
objArr.push(obj4.employeeData);
objArr.push(obj5.employeeData);

let objArrSorted = objArr.sort(employee.sortEmployees);
objArrSorted.forEach(obj => {
    obj.display();
});
