import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';


function App() {

  const [selectedIndex, setSelectedIndex] = useState(null)

  const [isEdit, setIsEdit] = useState(false)

  const [title, setTitle] = useState("")

  const [description, setDescription] = useState("")

  const [dueDate, setDueDate] = useState("")

  const [todos, setTodos] = useState([])

  const [showForm, setShowForm] = useState(false)

  const toggleForm = () => {
    setShowForm(true)
    setIsEdit(false)
    setTitle("")
    setDescription("")
    setDueDate("")

  }

  const addTodoTask = () => {
    if (!isEdit) {
      setTodos([...todos, { title, description, dueDate, isCompleted: false }])
    } else {
      const upDatedTodos = todos.map((todo, idx) => {
        if (selectedIndex === idx) {
          return {
            ...todo, title, description, dueDate
          }
        }
        return todo
      })
      setTodos(upDatedTodos)
    }
    setShowForm(false)
  }

  const handleTaskComplete = (index) => {
    const upDatedTodos = todos.map((todo, idx) => {
      if (index === idx) {
        return {
          ...todo, isCompleted: !todo.isCompleted
        }
      }
      return todo
    })
    setTodos(upDatedTodos)
  }

  const handleEdit = (index) => {
    setSelectedIndex(index)
    setIsEdit(true)
    setTitle(todos[index].title)
    setDescription(todos[index].description)
    setDueDate(todos[index].dueDate)
    setShowForm(true)
  }

  const handleDelete = (index) => {
    const upDatedTodos = todos.filter((todo, idx) => index !== idx)
    setTodos(upDatedTodos)
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleDueDate = (e) => {
    setDueDate(e.target.value)
  }

  const onclose = () => {
    setShowForm(false)
    setTitle("")
    setDescription("")
    setDueDate("")
  }

  return (
    <>
      <Navbar />
      <div className="box1">
        <button className="btn2" onClick={toggleForm}>Add Task</button>
        <h2 className="heading">Your Todos</h2>
        <div className="grid">
          <div className="container1">
            <div className="todos">
              {todos.map((item, index) => {
                return <div key={index} className={`todolist ${item.isCompleted ? "task-completed" : ""}`}>
                  <div className="checkbox">
                    <input onChange={() => handleTaskComplete(index)} type="checkbox" value={item.isCompleted} />
                    <div className={`${item.isCompleted ? "line-through" : ""} task-title`}>{item.title}</div>
                  </div>
                  <div className="task-description">{item.description}</div>
                  <div className={item.isCompleted ? "" : ""}>{item.dueDate}</div>
                  <button className="buttons" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="buttons" onClick={() => handleDelete(index)}>Delete</button>

                </div>
              })}
            </div>
          </div>
        </div>

      </div>
      {
        showForm &&
        <div className="form-popup">
          <div className="form-container">
            <div className="popup-header">
              <h2>Add a Todo</h2>
              <div className="closebtn" onClick={onclose}>
                close
              </div>
            </div>
            <div className="form">
              <label htmlFor="title">Title</label>
              <input className="title" onChange={handleTitle} value={title} type="text" id="title" placeholder="Title" />
              <label htmlFor="description">Description</label>
              <textarea className="description" onChange={handleDescription} value={description} type="textarea" id="description" placeholder="Discreption" />
              <label htmlFor="date">Date</label>
              <input className="date" onChange={handleDueDate} value={dueDate} type="date" id="date" />
              <button className="btn1" onClick={addTodoTask}>{isEdit ? 'Edit' : 'Add'}</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default App
