
const saveButton = document.querySelector('#btnSave');
const stateSelect = document.getElementById('formState');
const stateArray = [ "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal"];
    stateArray.forEach(state => {
        if(state === "Gujarat"){
            stateSelect.appendChild(new Option(state, state, true, true));
        }else{
            stateSelect.appendChild(new Option(state, state));
        }
    });

const populateTable = () => {
    const tableBody = document.getElementById('table-data');
    const userID = JSON.parse(localStorage.getItem("IDs"));
    userID.forEach(id => {
        const user = JSON.parse(localStorage.getItem(JSON.stringify(id)));
        const row = document.createElement("tr");
        const cellID = document.createElement("td");
        const cellName = document.createElement("td");
        const cellGender = document.createElement("td");
        const cellEmail = document.createElement("td");
        const cellContect = document.createElement("td");
        const cellAddress = document.createElement("td");
        const cellDesignation = document.createElement("td");
        const cellTech = document.createElement("td");
        const cellExp = document.createElement("td");
        const cellBtn = document.createElement("td");

        cellID.innerHTML = user.ID;
        cellName.innerHTML = user["fullName"];
        cellGender.innerHTML = user["gender"];
        cellEmail.innerHTML = user["email"];
        cellContect.innerHTML = user["contactNo"];
        cellAddress.innerHTML = user["address"];
        cellDesignation.innerHTML = user["designation"];
        cellTech.innerHTML = user["tech_exp"];
        cellExp.innerHTML = user["total_exp"];
        const btn = document.createElement("button");
        btn.innerText = "Delete";
        btn.value = user.ID;
        btn.classList.add("btn","btn-danger","btn-sm");
        btn.setAttribute("onclick", `deleteUser(${JSON.stringify(user.ID)})`);
        cellBtn.appendChild(btn);
        row.append(cellID, cellName, cellGender, cellEmail, cellContect, cellAddress, cellDesignation, cellTech, cellExp, cellBtn);
        tableBody.appendChild(row);
    });
}
populateTable();
const deleteUser = id => {
    localStorage.removeItem(id);
    userIDs = JSON.parse(localStorage.getItem("IDs"));
    let i;
    userIDs.forEach((ID, index) => {
        if(id === ID){
            i = index;
            return ;
        }
    });
    userIDs.splice(i,1);
    localStorage.setItem("IDs", JSON.stringify(userIDs));
    window.location.reload();
}
const workOnForm = () => {
    const regForm = document.forms['registration'];
    const nameNodes = regForm.firstElementChild.children;
    const fullName = `${nameNodes[0].value}.${nameNodes[1].value} ${nameNodes[2].value} ${nameNodes[3].value}`;
    checkValidName(fullName, nameNodes[1], nameNodes[2], nameNodes[3]);
    const gender = regForm.elements['gender'].value;
    const email = regForm.elements['email'].value;
    checkValidEmail(email, regForm.elements['email']);
    const mobile = regForm.elements['contact'].value;
    checkValidContact(mobile, regForm.elements['contact']);
    const addressNode = regForm.querySelector('#parmenentAddress').children;
    const address = {
        house: addressNode[1].value,
        addressLine1: addressNode[2].value,
        addressLine2: addressNode[3].value,
        landmark: addressNode[4].value,
        city: addressNode[5].value,
        state: addressNode[6].value,
        country: addressNode[7].value,
        pincode: addressNode[8].value
    }
    checkValidAddress(address, addressNode);
    const designation = regForm.elements.designation.value;
    if(isEmpty(designation)){
        designation.setCustomValidity("please enter designation");
        designation.reportValidity();
    }
    const tech = regForm.querySelector('#techKnown').children;
    let tech_exp = [];
    for(let i=2 ; i<tech.length; i++){
        if(tech[i].firstElementChild.checked){
            let expValue = tech[i].lastElementChild.value;
            if(!isValidExp(expValue)){
            }else{
                tech_exp.push(`${tech[i].firstElementChild.value}, ${expValue} years \n`);
            }
        }
    }
    console.log(tech_exp);
    const careerStartdate = regForm.elements['careerStartDate'].value;
    if(!isValidcareerDate(careerStartdate)){
        careerStartdate.setCustomValidity("please valid date");
        careerStartdate.reportValidity();
    }
    const total_exp = () =>{
        let year = new Date(careerStartdate).getFullYear();
        year = new Date().getFullYear() - year;
        let month = new Date(careerStartdate).getMonth();
        month = new Date().getMonth() - month;
        if(month < 0){
            month = 11 - Math.abs(month);
            year -= 1;
        }
        return  `${year} years, ${month} months`;
    }
    const userDataObj = {
        ID: new Date().getTime(),
        "fullName": fullName,
        "gender": gender,
        "email": email,
        "contactNo": mobile,
        "address": `${address.house}, ${address.addressLine1}, ${address.addressLine2}, ${address.landmark}, ${address.city}, ${address.state}, ${address.country}-${address.pincode}`,
        "designation": designation,
        "tech_exp": tech_exp.toString(),
        "total_exp": total_exp()
    }
    return userDataObj;
}
const isEmpty = str => {
    return str === "";
}
const checkValidName = (name,fName,mName,lName) => {
    const regExpFirstName = /^(Mr.|Mrs.|Ms.)[A-Za-z]+[']{0,1}[A-Za-z]+$/;
    const regExpName = /^[A-Za-z]+[']{0,1}[A-Za-z]+$/;
    const nameArr = name.split(/\s/g);
    if(nameArr.length >= 4){
        fName.setCustomValidity("space is not allowed in names");
        fName.reportValidity();
    }
    if(regExpFirstName.test(nameArr[0])){
        fName.setCustomValidity("please Enter valid contact number");
        fName.reportValidity();
    }else if(regExpName.test(nameArr[1])){
        mName.setCustomValidity("please Enter valid contact number");
        mName.reportValidity();
    }else if(regExpName.test(nameArr[2])){
        lName.setCustomValidity("please Enter valid contact number");
        lName.reportValidity();
    }else{
        fName.setCustomValidity("");
        mName.setCustomValidity("");
        lName.setCustomValidity("");
    }
}
const checkValidContact = (value, contact) => {
    let test = /^\d{10}$/.test(value);
    if(isEmpty(value)){
        contact.setCustomValidity("please Enter contact number");
    }else if(test){
        contact.setCustomValidity("please Enter valid contact number");
    }else{
        contact.setCustomValidity("");
    }
    contact.reportValidity();
}
const checkValidEmail = (value, email) => {
    let test = typeof email.checkValidity === 'function' ? email.checkValidity() : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.text(value) ;
    if(isEmpty(value)){
        email.setCustomValidity("please enter Email address");
    }else if(test){
        email.setCustomValidity("please enter valid Email address");
    }else{
        email.setCustomValidity("");
    }
    email.reportValidity();
}
const isValidExp = str => {
    let regExp = /^(0.[0-9]+|[0-9]+$)/;
    return regExp.test(str);
}
const checkValidAddress = (address, addressNode) => {
    if(isEmpty(address.house)){
        addressNode[1].setCustomValidity("please enter house No.");
        addressNode[1].reportValidity();
    }else if(isEmpty(address.addressLine1)){
        
       addressNode[2].setCustomValidity("please enter address line1");
        addressNode[2].reportValidity();
    }
    if(isEmpty(address.landmark)){
        addressNode[3].setCustomValidity("please enter landmark");
        addressNode[3].reportValidity();
    }
    if(isEmpty(address.city)){
        addressNode[4].setCustomValidity("please enter city");
        addressNode[4].reportValidity();
    }
    if(isEmpty(address.state)){
        addressNode[5].setCustomValidity("please select state");
        addressNode[5].reportValidity();
    }
    if(isEmpty(address.pincode)){
        addressNode[6].setCustomValidity("please enter pincode");
        addressNode[6].reportValidity();
    }
}
const isValidcareerDate = dateStr => {
    const date = new Date(dateStr);
    const ToDate = new Date();
    if(date.getTime() > ToDate.getTime()){
        return false;
    }
    return true;
}
saveButton.onclick = () => {
    const userData = workOnForm();
        
    let IDs = JSON.parse(localStorage.getItem("IDs"));
    if(IDs == null){
        IDs = [userData.ID];
    }else{
        IDs.push(userData.ID);
    }
    localStorage.setItem(JSON.stringify(userData.ID), JSON.stringify(userData));
    localStorage.setItem("IDs", JSON.stringify(IDs));
    window.location.reload();
}
