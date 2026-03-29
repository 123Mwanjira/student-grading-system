let students = [];
let editIndex = -1;

window.onload = function () {
  const data = localStorage.getItem("students");
  if (data) {
    students = JSON.parse(data);
    renderTable();
  }
};

function addOrUpdateStudent() {
  const name = document.getElementById("name").value;
  const marks = document.getElementById("marks").value;

  if (name === "" || marks === "") {
    alert("Fill all fields");
    return;
  }

  const student = {
    name,
    marks,
    grade: getGrade(marks)
  };

  if (editIndex === -1) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = -1;
  }

  saveData();
  renderTable();

  document.getElementById("name").value = "";
  document.getElementById("marks").value = "";
}

function getGrade(marks) {
  if (marks >= 80) return "A";
  else if (marks >= 60) return "B";
  else if (marks >= 40) return "C";
  else return "F";
}

function gradeClass(g) {
  if (g === "A") return "grade-A";
  if (g === "B") return "grade-B";
  if (g === "C") return "grade-C";
  return "grade-F";
}

function renderTable() {
  let table = document.getElementById("studentTable");
  table.innerHTML = "";

  let filtered = [...students];

  // Search
  const search = document.getElementById("search").value.toLowerCase();
  if (search) {
    filtered = filtered.filter(s => s.name.toLowerCase().includes(search));
  }

  // Sort
  const sort = document.getElementById("sort").value;
  if (sort === "marks") {
    filtered.sort((a, b) => b.marks - a.marks);
  } else if (sort === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  filtered.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.marks}</td>
      <td class="${gradeClass(student.grade)}">${student.grade}</td>
      <td>
        <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

function deleteStudent(index) {
  students.splice(index, 1);
  saveData();
  renderTable();
}

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("marks").value = student.marks;
  editIndex = index;
}

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}