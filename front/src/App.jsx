import React, { useState, useEffect } from 'react';
import logo from './assets/hogwarts.png';
import './App.css';

function App() {
  
  const [isVisible, setIsVisible] = useState({
    Name: true,
    AlternateName: true,
    Species: true,
    Gender: true,
    House: true,
    DateOfBirth: true,
    Wizard: true,
    Ancestry: true,
    EyeColour: true,
    HairColour: true,
    Wand: true,
    Patronus: true,
    Student: true,
    Staff: true,
    Actor: true,
    AlternateActor: true,
    Alive: true,
    Image: true
  });

  const toggleVisibility = (columnName) => {
    setIsVisible({...isVisible, [columnName]: !isVisible[columnName]});
  };

  const [students, setStudents] = useState(null);

  const [formData, setFormData] = useState({
    Species: 'All',
    Gender: 'All',
    House: 'All',
    Ancestry: 'All',
    EyeColour: 'All',
    HairColour: 'All',
    Student: 'All',
    Staff: 'All',
    Alive: 'All'
  });

  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10; // Nombre de lignes par page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('http://localhost:3000/real/students');
      const data = await response.json();
      setStudents(data);
    };

    fetchStudents();
  }, []);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderRows = () => {
    const filteredStudents = students.filter(student =>
      (formData.Species === 'All' || student.species === formData.Species) &&
      (formData.Gender === "All" || student.gender === formData.Gender) &&
      (formData.House === "All" || student.house === formData.House) &&
      (formData.Ancestry === "All" || student.ancestry === formData.Ancestry) &&
      (formData.EyeColour === "All" || student.eyeColour === formData.EyeColour) &&
      (formData.HairColour === "All" || student.hairColour === formData.HairColour) &&
      (formData.Student === "All" || (student.hogwartsStudent ? "true" : "false") === formData.Student) &&
      (formData.Staff === "All" || (student.hogwartsStaff ? "true" : "false") === formData.Staff) &&
      (formData.Alive === "All" || (student.alive ? "true" : "false") === formData.Alive)
    );
  
    const startIndex = currentPage * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredStudents.length);
  
    return filteredStudents.slice(startIndex, endIndex).map(student => (
      <tr key={crypto.randomUUID()}>
        {Object.keys(isVisible).map(columnName => (
          isVisible[columnName] && (
            <td key={columnName} className={columnName}>
              {columnName === 'Wand' ? (student.wand && Object.entries(student.wand)[0][1].length > 0 ? Object.entries(student.wand).map(([key, value]) => value !== "" ? `${key}=${value}`: "none").join(", ") : "none") : 
                (columnName === 'DateOfBirth' ? (student.dateOfBirth || student.yearOfBirth || "none") : 
                columnName === 'AlternateName' ? (student.alternate_names && student.alternate_names.length > 0? student.alternate_names.join(", ") : "none") :
                columnName === 'Wizard' ? (student.wizard ? "true" : "false") :
                columnName === 'EyeColour' ? (student.eyeColour ? student.eyeColour : "none") :
                columnName === 'HairColour' ? (student.hairColour ? student.hairColour : "none") :
                columnName === 'Student' ? (student.hogwartsStudent ? "true" : "false") :
                columnName === 'Staff' ? (student.hogwartsStaff ? "true" : "false") :
                columnName === 'AlternateActor' ? (student.alternate_actors && student.alternate_actors.length > 0? student.alternate_actors.join(", ") : "none") :
                columnName === 'Alive' ? (student.alive ? "true" : "false") :
                columnName === 'Image' ? (<img className="imagesize" src={student.image ? student.image : "https://i.pinimg.com/736x/d2/c7/40/d2c740bfc010b50918520013c420523b.jpg"} alt="image" />) :
                (student[columnName.toLowerCase()] || "none"))
              }
            </td>
          )
        ))}
      </tr>
    ));
  };
  
  const totalPages = Math.ceil(students ? students.length / rowsPerPage : 0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Here is a list of all characters:</p>
        <div className="App-intro">
        <form>
            <label htmlFor="Species">Species : </label>
            <select name="Species" id="Species" onChange={handleChange} value={formData.Species}>
              <option value="All">All</option>
              <option value="human">human</option>
              <option value="half-giant">half-giant</option>
              <option value="werewolf">werewolf</option>
              <option value="cat">cat</option>
              <option value="goblin">goblin</option>
              <option value="owl">owl</option>
              <option value="ghost">ghost</option>
              <option value="poltergeist">poltergeist</option>
              <option value="three-headed dog">three-headed dog</option>
              <option value="dragon">dragon</option>
              <option value="centaur">centaur</option>
              <option value="acromantula">acromantula</option>
              <option value="hippogriff">hippogriff</option>
              <option value="house-elf">house-elf</option>
              <option value="giant">giant</option>
              <option value="vampire">vampire</option>
              <option value="half-human">half-human</option>
            </select>
            <label htmlFor="Gender">Gender : </label>
            <select name="Gender" id="Gender" onChange={handleChange} value={formData.Gender}>
              <option value="All">All</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            <label htmlFor="House">House : </label>
            <select name="House" id="House" onChange={handleChange} value={formData.House}>
              <option value="All">All</option>
              <option value="Gryffindor">Gryffindor</option>
              <option value="Slytherin">Slytherin</option>
              <option value="Hufflepuff">Hufflepuff</option>
              <option value="Ravenclaw">Ravenclaw</option>
            </select>
            <label htmlFor="Ancestry">Ancestry : </label>
            <select name="Ancestry" id="Ancestry" onChange={handleChange} value={formData.Ancestry}>
              <option value="All">All</option>
              <option value="half-blood">half-blood</option>
              <option value="muggleborn">muggleborn</option>
              <option value="pure-blood">pure-blood</option>
              <option value="squib">squib</option>
              <option value="muggle">muggle</option>
              <option value="half-veela">half-veela</option>
              <option value="quarter-veela">quarter-veela</option>
            </select>
            <label htmlFor="EyeColour">EyeColour : </label>
            <select name="EyeColour" id="EyeColour" onChange={handleChange} value={formData.EyeColour}>
              <option value="All">All</option>
              <option value="green">green</option>
              <option value="brown">brown</option>
              <option value="blue">blue</option>
              <option value="grey">grey</option>
              <option value="silver">silver</option>
              <option value="Scarlet">Scarlet</option>
              <option value="black">black</option>
              <option value="yellow">yellow</option>
              <option value="pale, silvery">pale, silvery</option>
              <option value="orange">orange</option>
              <option value="dark">dark</option>
              <option value="hazel">hazel</option>
              <option value="yellowish">yellowish</option>
              <option value="amber">amber</option>
              <option value="white">white</option>
            </select>
            <label htmlFor="HairColour">HairColour : </label>
            <select name="HairColour" id="HairColour" onChange={handleChange} value={formData.HairColour}>
              <option value="All">All</option>
              <option value="black">black</option>
              <option value="brown">brown</option>
              <option value="red">red</option>
              <option value="blonde">blonde</option>
              <option value="bald">bald</option>
              <option value="grey">grey</option>
              <option value="blond">blond</option>
              <option value="silver">silver</option>
              <option value="sandy">sandy</option>
              <option value="ginger">ginger</option>
              <option value="dark">dark</option>
              <option value="white">white</option>
              <option value="tawny">tawny</option>
              <option value="dull">dull</option>
            </select>
            <label htmlFor="Student">Student : </label>
            <select name="Student" id="Student" onChange={handleChange} value={formData.Student}>
              <option value="All">All</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
            <label htmlFor="Staff">Staff : </label>
            <select name="Staff" id="Staff" onChange={handleChange} value={formData.Staff}>
              <option value="All">All</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
            <label htmlFor="Alive">Alive : </label>
            <select name="Alive" id="Alive" onChange={handleChange} value={formData.Alive}>
              <option value="All">All</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </form>
          {Object.keys(isVisible).map(columnName => (
            <button key={columnName} onClick={() => toggleVisibility(columnName)}>{columnName}</button>
          ))}
          <table>
            <thead>
              <tr>
                {Object.keys(isVisible).map(columnName => (
                  isVisible[columnName] && <th key={columnName} className={columnName}>{columnName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students ? renderRows() : <tr><td colSpan={Object.keys(isVisible).length}>Loading...</td></tr>}
            </tbody>
          </table>
        </div>
        <div className='btnTable' id="pagination">
          <button onClick={previousPage}>Previous</button>
          <button onClick={nextPage}>Next</button>
        </div>
      </header>
    </div>
  );
}

export default App;
