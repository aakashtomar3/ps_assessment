import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskList } from '../Dashboard/ducks/TaskReducer';

export default function TaskTable(props) {
    const taskList = useSelector(state => state.TaskReducer?.tasks || [])
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')

    const handleTaskComplete = (e, name) => {
        let newTaskList = [...taskList]
        let index = taskList.indexOf(taskList.filter((item) => item.name == name)[0])

        if (e.target.checked) {
            let newElement = { name: name, isComplete: true }
            newTaskList.splice(index, 1, newElement)
        }
        else {
            let newElement = { name: name, isComplete: false }
            newTaskList.splice(index, 1, newElement)
        }

        dispatch(updateTaskList(newTaskList))
    }

    const deleteTask = (name) => {
        let newTaskList = [...taskList]
        let index = taskList.indexOf(taskList.filter((item) => item.name == name)[0])
        newTaskList.splice(index, 1)
        dispatch(updateTaskList(newTaskList))
    }

    const editTask = (task) => {
        props.setTaskName(task.name)
        props.setOldTaskName(task.name)
        props.setOldTaskStatus(task.isComplete)
        console.log("iuaiufbasfvx", task)
        props.setEditMode(true)
        props.setModalShow(true)
    }

    return (
        <div className="task-table">
            <div className='table-top-section'>
                <div className="task-table-title title-text">Tasks</div>
                <div className="flex-item search-section">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16.003" viewBox="0 0 16 16.003" fill='#647278'><defs><style></style></defs><path className="a" d="M15.782,13.835,12.667,10.72a.749.749,0,0,0-.531-.219h-.509A6.5,6.5,0,1,0,10.5,11.626v.509a.749.749,0,0,0,.219.531l3.116,3.116a.747.747,0,0,0,1.059,0l.884-.884A.754.754,0,0,0,15.782,13.835ZM6.5,10.5a4,4,0,1,1,4-4A4,4,0,0,1,6.5,10.5Z" /></svg>
                    <input placeholder='Search by task name' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className='search-field' />
                </div>
                <div className="flex-item table-new-task">
                    <Button className="new-task-button table-btn" onClick={() => props.setModalShow(true)} style={{ margin: '0', marginTop: '0' }} variant="primary">+ New Task</Button>
                </div>
            </div>
            <div className="table-content">
                <Card>
                    {
                        taskList.filter((task) => {
                            if (searchValue == "")
                                return true
                            else
                                return task.name.match(searchValue)
                        }).map((task, i) => {
                            return (
                                <React.Fragment key={task.name}>
                                    <Card.Body className='table-content-card'>
                                        <div className="desc-section">
                                            <input className='task-checkbox' checked={task.isComplete} type="checkbox" onChange={(e) => handleTaskComplete(e, task.name)} />
                                            <div className={task.isComplete ? "desc-text ml-10 text-strike  cl-grey" : "desc-text ml-10"}>{task.name}</div>
                                        </div>
                                        <div style={{ display: 'inline' }}>
                                            <svg style={{cursor: 'pointer'}} onClick={()=> editTask(task)} xmlns="http://www.w3.org/2000/svg" width="16.443" height="16.443" viewBox="0 0 16.443 16.443" fill='#647278'><defs><style></style></defs><path className="a" d="M8.989,3.007l4,4-9,9h-3a1.029,1.029,0,0,1-1-1v-3Zm7-1-2-2a1.358,1.358,0,0,0-2,0l-2,2,4,4,2-2A1.358,1.358,0,0,0,15.989,2.007Z" transform="translate(0.014 0.433)" /></svg>
                                            <svg style={{cursor: 'pointer'}} onClick={()=> deleteTask(task.name)} className=' ml-10' xmlns="http://www.w3.org/2000/svg" width="16" height="18.13" viewBox="0 0 16 18.13" fill='#647278'><defs><style></style></defs><path className="a" d="M15,1H11V0c-.145-.291-.675,0-1,0H6c-.325,0-.857-.292-1,0V1H1A1.577,1.577,0,0,0,0,2V3c0,.316.684,0,1,0H15c.316,0,1,.316,1,0V2A1.577,1.577,0,0,0,15,1ZM2,17c.057.9,1.095,1,2,1h8c.9,0,1.943-.1,2-1L15,5H1Z" transform="translate(0 0.13)" /></svg>
                                        </div>
                                    </Card.Body>

                                    {!(i == taskList.filter((task) => {
                                        if (searchValue == "")
                                            return true
                                        else
                                            return task.name.match(searchValue)
                                    }).length - 1) && <hr className="horizontal-divider" style={{ margin: 'auto' }} />}
                                </React.Fragment>
                            )

                        })}
                </Card>
            </div>
        </div>
    )
}
