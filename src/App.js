//Components
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

//Hooks
import {useState,useEffect} from "react";

//Pakages
import {v4 as uuidv4} from "uuid";
import Swal from "sweetalert2";

function App(){
  const [tasks,settasks]=useState([]);
  const [showAddTask,setShowAddTask] =useState(false);
  const [loading,setloading]=useState(true);

  //Fetching data from local storage

  const getTask= JSON.parse(localStorage.getItem("taskAdded"));

  useEffect(()=>{
    if(getTask==null){
      settasks([]);
    }else{
      settasks(getTask);
    }
  },[])

  useEffect(() => {
    setTimeout(() => {
        setloading(false); 
    }, 3500);
   }, [])

  // Add task
   const addTask=(task)=>{
     const id=uuidv4();
     const newTask ={id,...task};
     settasks([...tasks,newTask]);

     Swal.fire({
       icon:'success',
       title:'Yay...',
       text:'You have successfully added a new task!'
     })
     localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
   }

   // Delete Task

   const deleteTask =(id)=>{
     const deleteTask = tasks.filter((task)=> task.id!==id);
     settasks(deleteTask);
     Swal.fire(
       {
         icon:'success',
         title:'Oops...',
         text:'You have successfully deleted a task!'
       }
     )
     localStorage.setItem("taskAdded", JSON.stringify(deleteTask));
   }

   //Edit Task

   const editTask =(id)=>{
     const text = prompt("Task Name");
     const day=prompt("Day and Time");

     const myData= tasks.map(x =>{
       if(x.id===id){
         return{
           ...x,
           text:text,
           day:day,
           id:uuidv4()
         }
       }
       return x;
     })
     Swal.fire({
       icon:'success',
       title:'Yay...',
       text:'You have successfully edited an existing task!'
     })
     localStorage.setItem("taskAdded", JSON.stringify(myData));
     window.location.reload();
   }



  return(
    <>
      {
        loading ?
          <div className="spinnerContainer">
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
          </div> :
          <div className="container">
            {/* App Header that has open and App Name */}
            <Header showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />
              {/* Revealing of Add Task Form */}
              {showAddTask && <AddTask onSave={addTask} />}
              {/* Task Counter */}
              <h3>Number of Tasks: {tasks.length}</h3>
              
              {/* Displaying of Tasks */}
              {
                tasks.length > 0 ?
                  (<Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} />) :
                  ('No Task Found!')
              }
          </div>
        }
    </>
  )

}

export default App;