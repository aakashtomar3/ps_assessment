import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskList } from '../Dashboard/ducks/TaskReducer';

export default function MyVerticallyCenteredModal(props) {
  const oldTaskList = useSelector(state => state.TaskReducer?.tasks || [])
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const handleValidation = () => {
    let error = ""
    let validated = true
    // id
    if (props.taskName == "") {
      validated = false
      error = 'Task name is required'
    }
    setError(error)
    return validated
  }

  const handleNewTask = () => {
    if (handleValidation()) {
      createNewTask()
    }
  }

  const createNewTask = () => {
    if(props.editMode){
      let taskToEdit  = oldTaskList.filter((item) => item.name === props.oldTaskName)[0]
      let index = oldTaskList.indexOf(taskToEdit)
      console.log("adivsxjosifd", props.oldTaskStatus)
      let newTask = {name: props.taskName, isComplete: props.oldTaskStatus}
      let newTaskList = [...oldTaskList]
      newTaskList.splice(index, 1, newTask)
      dispatch(updateTaskList(newTaskList))
      props.onHide()
    }
    else{
      if (oldTaskList.some((item) => item.name === props.taskName)) {
        alert('This task already exists')
      }
      else {
        let newTaskList = [...oldTaskList, { name: props.taskName, isComplete: false }]
        dispatch(updateTaskList(newTaskList))
        props.setTaskName('')
        props.onHide()
      }
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="w-90"
      centered
      onExited={() => {
        props.setEditMode(false)
        props.setTaskName('')
      }
      }
      onKeyDown={(e)=> {
        if (e.key === "Enter") {
          handleNewTask()
        }
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.editMode ? "Edit Task" : "+ New Task"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="login-fields m-top-5">
          <Form.Control
            placeholder="Task Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={props.taskName}
            onChange={(e) => props.setTaskName(e.target.value)}
          />
        </InputGroup>
        <span className='error-msg'>{error}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button className="new-task-button" style={{ width: '100%', margin: 'auto' }} onClick={handleNewTask}>{props.editMode ? "Save" : "+ New Task"}</Button>
      </Modal.Footer>
    </Modal>
  );
}