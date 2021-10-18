const async = true;
let fullName;
let gpa;
let colonCount;

let option = document.querySelectorAll("Action-Options");




function addStudentAJAX(){   //!this is the orignal and works correctly
    const xhttp = new XMLHttpRequest();

    


    fullName = document.getElementById("fullNameADD").value;
    gpa = document.getElementById("GpaADD").value;

    

    // console.log("from within add student, we get " + fullName + "and " + gpa + "when we use a seperate function");
    colonCount = countOccurances(gpa, ".");
    if(fullName === "" & gpa === ""){
        console.log("TESTTEST")

        document.getElementById("displayInputADD").innerHTML = "You did not enter anything before pressing submit. Please enter at least one value into each input bar."
    }else if(fullName === ""){
        document.getElementById("displayInputADD").innerHTML = "You did not enter anything into the Full Name input bar before pressing submit. Please enter at least one value."

    }else if(gpa === ""){
        document.getElementById("displayInputADD").innerHTML = "You did not enter anything into the GPA input bar before pressing submit. Please enter at least one value."

    }else if(/\d/.test(fullName) == true  & /^(\d+[a-zA-Z]|[a-zA-Z]+\d)(\d|[a-zA-Z])*/mg.test(gpa) == true ){  //!checks if both inputs have wrong values (######Allow for periods as some people have those in their names####)

        document.getElementsByClassName("displayInputADD").innerHTML = "Both fields have incorrect values within them. Please check both of your inputs."

        // console.log("Inside test 1")

    }else if(/\d/.test(fullName) == true){    //! checks to make sure the name input bar only has letters

        document.getElementsByClassName("displayInputADD").innerHTML = "A incorrect character was input in the name field. Please only use characters ranging from A-Z in the name field."

        // console.log("Inside test 2")
        // console.log("The input is a number")

    }else if(/^(\d+[a-zA-Z]|[a-zA-Z]+\d)(\d|[a-zA-Z])*/mg.test(gpa) == true | (colonCount > 1)){   //!checks to make sure GPA does not have letters

        console.log("GPA has a character inside of itself")
        if(colonCount > 1){

            document.getElementsByClassName("displayInputADD").innerHTML = "To many colons were entered into the input bar. Only one (1) is allowed."

        }else {

            document.getElementsByClassName("displayInputADD").innerHTML = "A incorrect character was input into the GPA field. Please only use values ranging from 0-9 (including decimals) in the GPA field."
        }
       
        // console.log("Inside test 3")
        // console.log("The type of GPA is " + gpa)
    }else {
        console.log("passed all tests")


        document.getElementById("displayInputADD").innerHTML = "";
        document.getElementById("displayInputADD").innerHTML = "The name that was entered is: " + fullName + "<br>";
        document.getElementById("displayInputADD").innerHTML += "The GPA that was entered is: " + gpa;
    
    
        xhttp.open("POST","https://amhep.pythonanywhere.com/grades", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        const body = {"name": fullName, "grade": gpa};
        xhttp.send(JSON.stringify(body));

        xhttp.onload = function() {
            // const myObj =JSON.parse(this.responseText);
            const myObj = JSON.stringify(JSON.parse(this.responseText),null, 1);   //! this converts my JSON response into a string and changes size
            let i = 0;
            for(i; i < myObj.length; i++){  //! this iterates through the length of the JSON response
                if( myObj[i] != "{" & myObj[i] != "}"  & myObj[i] != '"' & myObj[i] != ","){    //! checks to remove the {}"," to help diplay to user
                    
                    console.log("This is the contents = " + myObj[i]);
                    // addto = myObj[i]
                    document.getElementById("output").innerHTML +=  myObj[i];    //~ this will append the newly cleaned text to the end of the previously displayed message
                }
            }
        };
       
    }
    


    // xhttp.onload = function(){
    //     let sendingData = JSON.parse(this.responseText);
    //     for (let key in sendingData){
    //         console.log("SendingData is equal to: " + sendingData);
    //         document.getElementsByClassName("displayInput").innerHTML += "(" + key + ": " + sendingData + ")";
    //     }
    // };
}


function getSpecificStudentAJAX(){
    const xhttp = new XMLHttpRequest();

    
    fullName = document.getElementById("fullNameGetSpecific").value;

    if(/\d/.test(fullName) == true){    //! checks to make sure the name input bar only has letters

        document.getElementById("displayInputSpecific").innerHTML = "A incorrect character was input in the name field. Please only use characters ranging from A-Z in the name field."

        // console.log("Inside test 2")
        // console.log("The input is a number")

    }else {
        console.log("passed all tests")


        document.getElementById("displayInputSpecific").innerHTML = "";
        document.getElementById("displayInputSpecific").innerHTML = "The name that was entered is " + fullName;
    
    
        // const body = {"name": fullName, "grade": gpa};
        // const body = {"grade": gpa};
        // xhttp.open("GET","https://amhep.pythonanywhere.com/grades" + "?grade" + gpa, true);
        xhttp.open("GET","https://amhep.pythonanywhere.com/grades/" + fullName , true);
        // newURL = "?grade" + gpa;
        xhttp.send();
        console.log("https://amhep.pythonanywhere.com/grades/" + fullName);
        // console.log("GPA contains: " + gpa);
        // console.log("This is what is being sent to the server: " + xhttp.send(JSON.stringify(body)));

        xhttp.onload = function() {
            const myObj = JSON.stringify(JSON.parse(this.responseText), null, 2);   //! this converts my JSON response into a string and changes size
            let i = 0;
            for(i; i < myObj.length; i++){  //! this iterates through the length of the JSON response
                if( myObj[i] != "{" & myObj[i] != "}"  & myObj[i] != '"' & myObj[i] != ","){    //! checks to remove the {}"," to help diplay to user
                    
                        console.log("This is the contents = " + myObj[i]);
                        // addto = myObj[i]
                        document.getElementById("output").innerHTML += "" + myObj[i];    //~ this will append the newly cleaned text to the end of the previously displayed message
                    
                }
            }
        }
        
    }

    // xhttp.send();
}

function getAllStudentsAJAX() { //!returns all students within server on screen for urser
    // clearContentsOfElements();
    const xhttp = new XMLHttpRequest();
    document.getElementById("outputGetAll").innerHTML = "<legend><em><u>Students Name : GPA</u></em></legend> ";
    document.getElementById('outputGetAll').style.display = 'block';
    document.getElementById('output').style.display = 'none';
    
    
    clear_Elements_For_Get_All();

    document.getElementById("optionDisplay").innerHTML = "Retrieve All Students"

    
    xhttp.onload = function() {
        // const myObj =JSON.parse(this.responseText);
        const myObj = JSON.stringify(JSON.parse(this.responseText),null, 1);   //! this converts my JSON response into a string and changes size
        let i = 0;
        for(i; i < myObj.length; i++){  //! this iterates through the length of the JSON response
            if( myObj[i] != "{" & myObj[i] != "}"  & myObj[i] != '"' & myObj[i] != ","){    //! checks to remove the {}"," to help diplay to user
                
                console.log("This is the contents = " + myObj[i]);
                // addto = myObj[i]
                document.getElementById("outputGetAll").innerHTML +=  myObj[i];    //~ this will append the newly cleaned text to the end of the previously displayed message
            }
        }
    };

    xhttp.open("GET","https://amhep.pythonanywhere.com/grades", true);
    xhttp.send();

    
}


function updateStudentAJAX(){
    const xhttp = new XMLHttpRequest();

    
    fullName = document.getElementById("fullNameUpdate").value;
    newGPA = document.getElementById("GpaUpdate").value;
    colonCount = countOccurances(newGPA, '.')

    xhttp.open("PUT","https://amhep.pythonanywhere.com/grades/" + fullName, true);
    // console.log("https://amhep.pythonanywhere.com/grades/" + fullName +"/grade=" + newGPA)
    console.log("I am inside of update student")

    if(fullName === "" & newGPA === ""){
        console.log("TESTTEST")

        document.getElementById("displayInputUpdate").innerHTML = "You did not enter anything before pressing submit. Please enter at least one value into each input bar."
    }else if(fullName === ""){
        document.getElementById("displayInputUpdate").innerHTML = "You did not enter anything into the Full Name input bar before pressing submit. Please enter at least one value."

    }else if(newGPA === ""){
        document.getElementById("displayInputUpdate").innerHTML = "You did not enter anything into the GPA input bar before pressing submit. Please enter at least one value."

    }else if(/\d/.test(fullName) == true  & /^(\d+[a-zA-Z]|[a-zA-Z]+\d)(\d|[a-zA-Z])*/mg.test(newGPA) == true ){  //!checks if both inputs have wrong values (######Allow for periods as some people have those in their names####)

        document.getElementById("displayInputUpdate").innerHTML = "Both fields have incorrect values within them. Please check both of your inputs."

        // console.log("Inside test 1")

    }else if(/\d/.test(fullName) == true){    //! checks to make sure the name input bar only has letters

        document.getElementById("displayInputUpdate").innerHTML = "A incorrect character was input in the name field. Please only use characters ranging from A-Z in the name field."

        // console.log("Inside test 2")
        // console.log("The input is a number")

    }else if(/^(\d+[a-zA-Z]|[a-zA-Z]+\d)(\d|[a-zA-Z])*/mg.test(newGPA) == true | (colonCount > 1)){   //!checks to make sure GPA does not have letters

        console.log("GPA has a character inside of itself")
        if(colonCount > 1){

            document.getElementById("displayInputUpdate").innerHTML = "To many colons were entered into the input bar. Only one (1) is allowed."

        }else {

            document.getElementById("displayInputUpdate").innerHTML = "A incorrect character was input into the GPA field. Please only use values ranging from 0-9 (including decimals) in the GPA field."
        }
       
        // console.log("Inside test 3")
        // console.log("The type of GPA is " + newGpa)
    }else {
        console.log("passed all tests")


        document.getElementById("displayInputUpdate").innerHTML = "";
        document.getElementById("displayInputUpdate").innerHTML = "The name that was entered is: " + fullName + "<br></br>";
        document.getElementById("displayInputUpdate").innerHTML += "The NEW GPA that was entered is: " + newGPA;


        xhttp.setRequestHeader("Content-Type", "application/json");
        const body = JSON.stringify({"grade": newGPA});

        // console.log(body)

        xhttp.send(body);

        //! before this we are updating the requested value


        //!after this we are doing a get specific student search to return everything in JSON via the GET request

        // xhttp.onload = function() {
        //     // const myObj = JSON.stringify(JSON.parse(this.response), null, 2);   //! this converts my JSON response into a string and changes size

        //     document.getElementById("output").innerHTML +=  fullName + ": " + newGPA;


        // }
        

        xhttp.onloadend = function() {
            const xhttp = new XMLHttpRequest();
            console.log("Im inside of onReadyState")
            // newURL = "?grade" + gpa;
            xhttp.open("GET","https://amhep.pythonanywhere.com/grades/" + fullName , true);

            console.log("https://amhep.pythonanywhere.com/grades/" + fullName);
            const myObj = JSON.stringify(JSON.parse(this.responseText), null, 2);   //! this converts my JSON response into a string and changes size
            let i = 0;
            for(i; i < myObj.length; i++){  //! this iterates through the length of the JSON response
                if( myObj[i] != "{" & myObj[i] != "}"  & myObj[i] != '"' & myObj[i] != ","){    //! checks to remove the {}"," to help diplay to user
                    
                        console.log("This is the contents = " + myObj[i]);
                        // addto = myObj[i]
                        document.getElementById("output").innerHTML +=  myObj[i];    //~ this will append the newly cleaned text to the end of the previously displayed message
                    
                }
            }
            xhttp.send();
        }


        

       
    }

}

function deleteStudentAJAX(){
    const xhttp = new XMLHttpRequest();

    fullName = document.getElementById("fullNameDelete").value;

    
    if(/\d/.test(fullName) == true){    //! checks to make sure the name input bar only has letters

        document.getElementById("displayInputDelete").innerHTML = "A incorrect character was input in the name field. Please only use characters ranging from A-Z in the name field."

        // console.log("Inside test 2")
        // console.log("The input is a number")

    }else {
        console.log("passed all tests")


        document.getElementById("displayInputDelete").innerHTML = "";
        document.getElementById("displayInputDelete").innerHTML = "The name that was entered is " + fullName;
    
    
        xhttp.open("DELETE","https://amhep.pythonanywhere.com/grades/" + fullName , true);
        // newURL = "?grade" + gpa;
        xhttp.send();
        console.log("https://amhep.pythonanywhere.com/grades/" + fullName);
        // console.log("GPA contains: " + gpa);
        // console.log("This is what is being sent to the server: " + xhttp.send(JSON.stringify(body)));

        xhttp.onload = function() {
            // const myObj =JSON.parse(this.responseText);
            const myObj = JSON.stringify(JSON.parse(this.responseText),null, 1);   //! this converts my JSON response into a string and changes size
            let i = 0;
            for(i; i < myObj.length; i++){  //! this iterates through the length of the JSON response
                if( myObj[i] != "{" & myObj[i] != "}"  & myObj[i] != '"' & myObj[i] != ","){    //! checks to remove the {}"," to help diplay to user
                    
                    console.log("This is the contents = " + myObj[i]);
                    // addto = myObj[i]
                    document.getElementById("output").innerHTML +=  myObj[i];    //~ this will append the newly cleaned text to the end of the previously displayed message
                }
            }
        };
        
    }

    // xhttp.open("DELETE","https://amhep.pythonanywhere.com/grades/" + fullName, true);
    // xhttp.send();

}





//! ##############################################################################################################################################################################################

function clearAddStudent(){ //!used specifically for addStudentAJAX
    fullName = '';
    gpa = '';
    colonCount = 0;
    body = 0;
}


function showSearchBarAddStudent(){  //!this will display the appropriate fields when clicked on "add student"
    document.getElementById("optionDisplay").innerHTML = "Add Student"
    document.getElementById("searchBarGetSpecificStudent").style.display = "none";
    document.getElementById('searchBarAddStudent').style.display = 'none';
    document.getElementById("searchBarDeleteStudent").style.display = "none";
    document.getElementById("searchBarUpdateStudent").style.display = "none";
    document.getElementById('outputGetAll').style.display = 'none';
    document.getElementById('description').style.display = 'none';


    document.getElementById("output").style.display = "block";
    // document.getElementById("output").innerHTML = "<legend><em><u>Students Name : GPA</u></em></legend> ";



    document.getElementById("searchBarAddStudent").style.display = "block";
    

}

function showSearchBar_SpecificStudent(){
    document.getElementById("optionDisplay").innerHTML = "Retrieve Specific Student"
    document.getElementById("searchBarAddStudent").style.display = "none";
    document.getElementById("searchBarDeleteStudent").style.display = "none";
    document.getElementById("searchBarUpdateStudent").style.display = "none";
    document.getElementById('outputGetAll').style.display = 'none';
    document.getElementById('description').style.display = 'none';


    document.getElementById("output").innerHTML = "<legend><em><u>Students Name : GPA</u></em></legend> ";




    document.getElementById("searchBarGetSpecificStudent").style.display = "block";
    document.getElementById("output").style.display = "block";
}

function showSearchBar_UpdateStudent(){
    document.getElementById("optionDisplay").innerHTML = "Update Specific Student Information"
    document.getElementById("searchBarAddStudent").style.display = "none";
    document.getElementById("searchBarGetSpecificStudent").style.display = "none";
    document.getElementById("searchBarDeleteStudent").style.display = "none";
    document.getElementById('description').style.display = 'none';



    document.getElementById("output").innerHTML = "<legend><em><u>Students Name : New GPA</u></em></legend> ";

    document.getElementById("searchBarUpdateStudent").style.display = "block";
    document.getElementById("output").style.display = "block";

}

function showSearchBar_DeleteStudent(){
    document.getElementById("optionDisplay").innerHTML = "Delete Specific Student Information"
    document.getElementById("searchBarAddStudent").style.display = "none";
    document.getElementById("searchBarGetSpecificStudent").style.display = "none";
    document.getElementById("searchBarUpdateStudent").style.display = "none";
    document.getElementById('output').style.display =  'block';
    document.getElementById('description').style.display = 'none';



    document.getElementById("output").innerHTML = "<legend><em><u>Students Name : GPA</u></em></legend> ";

    document.getElementById("searchBarDeleteStudent").style.display = "block";
}


function countOccurances(string, word){ //~used to count the occurnaces of a specificed string
    return string.split(word).length-1;
}

function clearContentsOfElements() {  //~ clears out the output area ready for new input
    document.getElementById("searchBar").style.display = "none";
    document.getElementById("output").style.display = "none";
    document.getElementById("output").innerHTML = "";
}

function clear_Elements_For_Get_All(){
    document.getElementById("searchBarAddStudent").style.display = "none";
    document.getElementById("searchBarGetSpecificStudent").style.display = "none";
    document.getElementById("searchBarUpdateStudent").style.display = "none";
    document.getElementById("searchBarDeleteStudent").style.display = "none";
}

//~https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript