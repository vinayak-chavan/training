class person{
    constructor(fullName, email, contactNum){
        this.fullName = fullName;
        this.email = email;
        this.contactNum = contactNum;
    }
    display() {     
        console.log("class person");  
        console.log(`Name: ${this.fullName}`);   
        console.log(`Email: ${this.email}`);   
        console.log(`Contact Number: ${this.contactNum}`);
    }
}
class trainee extends person{   
    constructor(fullName, email, contactNum, highestQulification, college, university, passoutYear){
        super(fullName, email, contactNum);
        this.highestQulification = highestQulification;
        this.college = college;
        this.university = university;
        this.passoutYear = passoutYear;
    }
    display() {   
        super.display(); 
        console.log("class trainee");  
        console.log(`Highest Qualification: ${this.highestQulification}`);   
        console.log(`College: ${this.college}`);   
        console.log(`University: ${this.university}`);
        console.log(`Passout Year: ${this.passoutYear}`);
    } 
}
var obj = new trainee('vinayak chavan','chavan.vinayak017@gmail.com', 7383692583, 'BE', 'VGEC', 'GTU', 2022);
obj.display();