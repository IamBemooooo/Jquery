var url = "http://localhost:3000/students"
let selectedStudentIds = [];

const checkDel = document.querySelector('.deletecheck');
checkDel.disabled = true;

const checkEdit = document.querySelector('.editcheck');
checkEdit.disabled = true;

const FormStudent = document.querySelector('.form-student');



fetch(url)
.then(res => res.json())
.then(data => {
    if(!data)
    {
        console.log("No data found");
        return;
    }
    data.forEach(student => renderStudents(student)); 

    checkboxInputs = document.querySelectorAll('.chk'); 

    console.log(checkboxInputs);

    checkboxInputs.forEach(checkboxInput => {
    checkboxInput.addEventListener('change', () => {
    if (checkboxInput.checked) {
      selectedStudentIds.push(checkboxInput.id);
      checkDel.disabled = false;
      checkEdit.disabled = false;
    } else {
      selectedStudentIds = selectedStudentIds.filter(id => id !== checkboxInput.id);
      if (selectedStudentIds.length === 0) {
        checkDel.disabled = true;
        checkEdit.disabled = true;
      }
    }
    });
})
})
.catch(error => {
    console.error('Error:', error);
});

const tableStudents = document.querySelector('#table-student'); // Assuming 'doc' is a typo for 'document'

const renderStudents = (student) => {
  // Sử dụng thông tin từ 'student' để tạo nội dung của hàng
  const output = `
    <tr>
      <th scope="row">
        <input class="chk" id="${student.id}" type="checkbox">
      </th>
      <td>${student.name}</td>
      <td>${student.birthday}</td>
      <td>${student.phone}</td>
      <td>${student.hometown}</td>
    </tr>
  `;

  tableStudents.insertAdjacentHTML("beforeend", output);
};


//clear
const clearButton = document.querySelector('.btnclr');
const nameInput = document.querySelector('#Name');
const birthdayInput = document.querySelector('#Birthday');
const hometownInput = document.querySelector('#Hometown');
const PhoneInput = document.querySelector('#Phone');

clearButton.addEventListener('click', () => {
  nameInput.value = '';
  birthdayInput.value = '';
  hometownInput.value = '';
  PhoneInput.value = '';
});



//delete
const deleteButton = document.querySelector('.btndel');

deleteButton.addEventListener('click', () => 
{
    selectedStudentIds.forEach(StudentId => 
        {
            DeleteStudent(StudentId);
        });
})



const DeleteStudent = (id) => 
{
    fetch(`${url}/${id}`,{method:'DELETE'})
    .then(response => response.json())
    .then(()=> location.reload())
}

//add
FormStudent.addEventListener('submit', (e) =>
{
    const check = true;
    e.preventDefault();
    //validate
    if (nameInput.value.trim() === '' || nameInput.value.length > 50) {
        nameInput.classList.add('is-invalid');
        check = false;
    }

    if (!/^\d{10}$/.test(PhoneInput.value)) {
        PhoneInput.classList.add('is-invalid');
        check = false;
    }


    const birthdayString = birthdayInput.value;
    const birthdate = new Date(birthdayString);
    const today = new Date();
    var age = today.getFullYear() - birthdate.getFullYear();
    var m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) 
    {
        age--;   

    }
    if (age < 0 || age > 150) {
            birthdayInput.classList.add('is-invalid');
            check = false;
        }


    if(check)
        {
            fetch(url,
        {
            method:'POST',
            headers: 
            {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                    name : FormStudent.Name.value,
                    birthday : FormStudent.Birthday.value,
                    hometown : FormStudent.Hometown.value,
                    phone : FormStudent.Phone.value
                }),
        })
        .then(location.reload())
        .catch(()=> console.log('Failed to add event'));
    }
});


//update event


checkEdit.addEventListener('click', (e) => 
{
    const check = true;
    e.preventDefault();
    if(selectedStudentIds.length != 1)
    {
        alert('Edit no more than one student');
        check = false;
    }


    //validate
    if (nameInput.value.trim() === '' || nameInput.value.length > 50) {
        nameInput.classList.add('is-invalid');
        check = false;
    }

    if (!/^\d{10}$/.test(PhoneInput.value)) {
        PhoneInput.classList.add('is-invalid');
        check = false;
    }


    const birthdayString = birthdayInput.value;
    const birthdate = new Date(birthdayString);
    const today = new Date();
    var age = today.getFullYear() - birthdate.getFullYear();
    var m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) 
    {
        age--;   

    }
    if (age < 0 || age > 150) 
    {
        birthdayInput.classList.add('is-invalid');
        check = false;
    }

    const id = selectedStudentIds[0];

    if(check)
    {
        fetch(`${url}/${id}`,
        {
            method:'PATCH',
            headers: 
            {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                    name : FormStudent.Name.value,
                    birthday : FormStudent.Birthday.value,
                    hometown : FormStudent.Hometown.value,
                    phone : FormStudent.Phone.value
                }),
        })
        .then(location.reload())
        .catch(()=> console.log('Failed to add event'));   
    }
})





