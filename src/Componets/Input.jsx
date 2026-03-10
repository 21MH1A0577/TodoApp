import { useState } from "react"


function Input() {


  

  const [input, setInput] = useState({
    name:'',
    email:'',
    age:''
  });
  const [show,setShow]=useState([]);

  const handleInput=(e)=>{
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }


    const handleShow = async () => {

    if(input.name === '' || input.email === '' || input.age === ''){
      alert('Please fill the fields');
      return;
    }
    setShow([...show, input]);
    await fetch('http://localhost:3000/add', {
      method :'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(input)
    });
    console.log(input);
    setInput({
      name:'',
      email:'',
      age:''
    });

  }

  
  

  const handleSubmit=(e)=>{
    e.preventDefault();
  }


    const Delete = async (index) => {

      const id = show[index].id;

      await fetch(`http://localhost:3000/delete/${id}`, {
        method: "DELETE"
      });

      setShow(show.filter((item, i) => i !== index));

    };


  const Clear=()=>{
    setShow([]);
  }

  return (
    <>
    <h1 style={{fontFamily: "Lucida Console, Courier New, monospace"}}>Todo List</h1>
    <form onSubmit={handleSubmit} style={{background:'orange',padding:'20px'}}>
      <label htmlFor="name" style={{fontFamily:'fantasy'}}>Name : </label>
      <input type="text" id='name' name='name' placeholder='Enter your name' value={input.name} onChange={handleInput} style={{padding:'8px'}}/><br></br><br></br>
      <label htmlFor="email" style={{fontFamily:'fantasy'}}>Email : </label>
      <input type="email" id='email' name='email' placeholder='Enter your email' value={input.email} onChange={handleInput} style={{padding:'8px'}}/><br></br><br></br>
      <label htmlFor="age" style={{fontFamily:'fantasy'}}>Age : </label>
      <input type="number" id='age' name='age' placeholder='Enter your age' value={input.age} onChange={handleInput} style={{padding:'8px'}}/><br></br><br></br>
      <button type="button" onClick={handleShow} style={{border:'4px inset blue'}}>Add</button>
      <button type="button" onClick={Clear} style={{border:'4px outset blue',marginLeft:'6px'}}>Clear</button>
      {show.map((item,index)=>{
        return (
          <div key={index}>
            <h6>{item.name} - {item.email} - {item.age}</h6>
            <button type="button" onClick={() => Delete(index)}>Delete</button>
          </div>
        )
      })}
    </form>
    </>
  )
}
export default Input