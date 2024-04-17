import { useState, useEffect } from 'react';
import logo from './assets/hogwarts.png';
import './App.css';

function App() {
  const [students, setStudents] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('http://localhost:3000/real/students');
      const data = await response.json();
      setStudents(data);
    };

    fetchStudents();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Here is a list of all students:</p>
        <div className="App-intro">
          <table>
            <tr>
              <th>Name</th>
              <th>Alternate Name</th>
              <th>Species</th>
              <th>Gender</th>
              <th>House</th>
              <th>Date Of Birth</th>
              <th>Wizard</th>
              <th>Ancestry</th>
              <th>Eye Colour</th>
              <th>Hair Colour</th>
              <th>Wand</th>
              <th>Patronus</th>
              <th>Student</th>
              <th>Staff</th>
              <th>Actor</th>
              <th>Alternator Actor</th>
              <th>Alive</th>
              <th>Image</th>
            </tr>
          {students ? students.map(student =>
          <tr key={crypto.randomUUID()}>
            <td>{student.name ? student.name : "none"}</td>
            <td>{student.alternate_names && student.alternate_names.length > 0? student.alternate_names.join(", ") : "none"}</td>
            <td>{student.species ? student.species : "none"}</td>
            <td>{student.gender ? student.gender : "none"}</td>
            <td>{student.house ? student.house : "none"}</td>
            <td>{student.dateOfBirth ? student.dateOfBirth : student.yearOfBirth ? student.yearOfBirth : "none"}</td>
            <td>{student.wizard ? "true" : "false"}</td>
            <td>{student.ancestry ? student.ancestry : "none"}</td>
            <td>{student.eyeColour ? student.eyeColour : "none"}</td>
            <td>{student.hairColour ? student.hairColour : "none"}</td>
            <td>{student.wand ? Object.entries(student.wand).map(([key, value]) => `${key}=${value}`).join(", ") : "none"}</td>
            <td>{student.patronus ? student.patronus : "none"}</td>
            <td>{student.hogwartsStudent ? "true" : "false"}</td>
            <td>{student.hogwartsStaff ? "true" : "false"}</td>
            <td>{student.actor ? student.actor : "none"}</td>
            <td>{student.alternate_actors && student.alternate_actors.length > 0? student.alternate_actors.join(", ") : "none"}</td>
            <td>{student.alive ? "true" : "false"}</td>
            <td><img class="imagesize" src={student.image ? student.image : "https://i.pinimg.com/736x/d2/c7/40/d2c740bfc010b50918520013c420523b.jpg"} alt="image" /></td>
          </tr>
          ) : "Loading..."}
        </table>
        </div>
      </header>
    </div>
  );
}

export default App;