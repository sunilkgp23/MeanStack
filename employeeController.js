mainApp.controller("employeeController", function($scope) {

    $scope.submitted = false;
    $scope.editMode = false;
    $scope.UpdateRecordNum = 0;

    $scope.employees = {
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        gender: 'male',
        dob: '',
        firstNameError: false,
        employeesList: [{
                firstName: 'John',
                lastName: 'Conway',
                email: 'john.con@pqr.com',
                age: 38,
                gender: 'male',
                dob: '1979-11-25'
            },
            {
                firstName: 'Julia',
                lastName: 'Hall',
                email: 'jul.ha@qwe.com',
                age: 28,
                gender: 'female',
                dob: '1989-11-23'
            }
        ]
    };

    if (JSON.parse(localStorage.getItem("Records")) == null ||JSON.parse(localStorage.getItem("Records")).length == 0) {
        localStorage.setItem('Records', JSON.stringify($scope.employees.employeesList));
    } else {
        $scope.employees.employeesList = JSON.parse(localStorage.getItem("Records"));
    }

    $scope.reset = function() {
        $scope.employees.firstName = '';
        $scope.employees.lastName = '';
        $scope.employees.email = '';
        $scope.employees.age = '';
        $scope.employees.dob = '';
        $scope.employees.gender = 'male';

    };

    $scope.clearfunc = function() {
        $scope.editMode = false;
        $scope.reset();
    };

    $scope.removeRecord = function($index) {
        $scope.employees.employeesList.splice($index, 1);
        localStorage.setItem('Records', JSON.stringify($scope.employees.employeesList));
    };

    $scope.editRecord = function($index) {
        $scope.editMode = true;
        $scope.UpdateRecordNum = $index;
        $scope.employees.firstName = $scope.employees.employeesList[$index].firstName;
        $scope.employees.lastName = $scope.employees.employeesList[$index].lastName;
        $scope.employees.email = $scope.employees.employeesList[$index].email;
        $scope.employees.age = $scope.employees.employeesList[$index].age;
        $scope.employees.gender = $scope.employees.employeesList[$index].gender;
        $scope.employees.dob = $scope.employees.employeesList[$index].dob;

    };

    $scope.$watch('employees.dob', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            console.log(newValue);
            var dateData = $scope.employees.dob.split('-');
            var d = new Date();
            var n = d.getFullYear();
            $scope.employees.age = n - parseInt(dateData[0]);
        }
    });

    $scope.update = function() {
        var result = validate();

        if (!result) {
            return;
        }

        $scope.employees.employeesList[$scope.UpdateRecordNum].firstName = $scope.employees.firstName;
        $scope.employees.employeesList[$scope.UpdateRecordNum].lastName = $scope.employees.lastName;
        $scope.employees.employeesList[$scope.UpdateRecordNum].email = $scope.employees.email;
        $scope.employees.employeesList[$scope.UpdateRecordNum].age = $scope.employees.age;
        $scope.employees.employeesList[$scope.UpdateRecordNum].gender = $scope.employees.gender;
        $scope.employees.employeesList[$scope.UpdateRecordNum].dob = $scope.employees.dob;

        localStorage.setItem('Records', JSON.stringify($scope.employees.employeesList));
    };

    function validate() {
        if (document.employeeForm.firstname.value == '') {
            return false;
        } else {
            var re = /^[A-Za-z]+$/;
            if (re.test(document.employeeForm.firstname.value))
                console.log('Valid First Name.');
            else {
                $scope.employees.firstName = '';
                alert('First Name should not Contain numerics');
                return false;
            }
        }

        if (document.employeeForm.lastname.value == '') {
            return false;
        } else {
            var re = /^[A-Za-z]+$/;
            if (re.test(document.employeeForm.lastname.value))
                console.log('Valid Last Name.');
            else {
                $scope.employees.lastName = '';
                alert('Last Name should not Contain numerics');
                return false;
            }
        }

        if (document.employeeForm.email.value == '') {
            return false;
        } else {
            var emailID = document.employeeForm.email.value;
            atpos = emailID.indexOf("@");
            dotpos = emailID.lastIndexOf(".");

            if (atpos < 1 || (dotpos - atpos < 2)) {

                return false;
            }
        }

        if (document.getElementById("dob").value == '') {
            return false;
        } else {
            var dateData = document.getElementById("dob").value.split('-');

            var d = new Date();
            var n = d.getFullYear();
            $scope.employees.age = n - parseInt(dateData[0]);
        }
        return true;
    };

    $scope.submit = function() {
        $scope.submitted = true;
        var result = validate();

        if (!result) {
            return;
        }

        var Confirmation = confirm("Please Click Ok to Submit the form.");

        if (!Confirmation) {
            return;
        }

        var newEmployee = {
            firstName: $scope.employees.firstName,
            lastName: $scope.employees.lastName,
            email: $scope.employees.email,
            age: $scope.employees.age,
            gender: $scope.employees.gender,
            dob: $scope.employees.dob
        };
        $scope.employees.employeesList.push(newEmployee);

        localStorage.setItem('Records', JSON.stringify($scope.employees.employeesList));


        $scope.reset();
        alert("Form Submitted Successfully");
    };
});