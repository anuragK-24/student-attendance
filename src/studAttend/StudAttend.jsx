import React, { useState, useEffect } from 'react';
import "./studAttend.css"

export default function StudAttend() {
  const [students, setStudents] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  useEffect(() => {
    setStudentCount(students.length);
  }, [students]);
function handleCheckout(rollNumber) {
    const updatedStudents = students.map((student) => {
      if (student.rollNumber === rollNumber) {
        return {
          ...student,
          checkoutTime: new Date().toLocaleTimeString(),
        };
      }
      return student;
    });
    setStudents(updatedStudents);
  }


  function handleAddStudent(event) {
    event.preventDefault();
    const form = event.target;
    const rollNumber = form.elements['rollNumber'].value;
    const studentName = form.elements['studentName'].value;
    const checkinTime = new Date().toLocaleTimeString();
    const student = { rollNumber, studentName, checkinTime };
    setStudents([...students, student]);
    form.reset();
  }
  return (<>
  
    <center>
  <div className='info'>
          <h1><b>Student Attendance</b> </h1>
          <form onSubmit={handleAddStudent}>
            <label htmlFor="studentName"><b> Student Name :  </b></label>
            <input type="text" name="studentName" placeholder='Enter name...' /><br /><br /><br />
            <label htmlFor="rollNumber"> <b> Roll Number :   </b></label>
            <input type="text" name="rollNumber" placeholder='Enter '/> <br /><br /><br />
            <button className='sbm' type="submit"> <b>Check In</b></button>
          </form>
          <br /><br />
  </div>
  <div class="wrapper-b">
    <h2>There are currently <b> {studentCount} </b> students in the school.</h2>
    <div className="box-items">
      <table>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Student Name</th>
              <th>Check In Time</th>
            <th>Check Out Time</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNumber}>
              <td>{student.rollNumber}</td>
              <td>{student.studentName}</td>
              <td>{student.checkinTime}</td>
              <td>
                {student.checkoutTime ? (
                  student.checkoutTime
                ) : (
                  <button onClick={() => handleCheckout(student.rollNumber)}>
                    Check Out
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    </center>

  </>
  );
}
