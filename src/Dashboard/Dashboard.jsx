import React from 'react'
import TopBar from '../components/TopBar';
import NoTask from '../components/NoTask';
import NewTaskModal from '../components/NewTaskModal'
import { useState } from 'react';
import TopCards from '../components/TopCards';
import TaskTable from '../components/TaskTable';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

export default function Dashboard() {
    const [modalShow, setModalShow] = useState(false)
    const [taskName, setTaskName] = useState("")
    const [oldTaskName, setOldTaskName] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [oldTaskStatus, setOldTaskStatus] = useState(false)
    const taskList = useSelector(state => state.TaskReducer?.tasks || [])
    const loggedIn = useSelector(state => state.loginReducer.loggedIn)
    console.log("asdbiafss", oldTaskStatus)
    return (
        <>
            {!loggedIn && <Navigate to="/login" />}
            <TopBar />
            <div className="dashboard-container">
                {(!modalShow && taskList.length == 0) && <div className='no-task-wrapper'>
                    <NoTask setModalShow={setModalShow} />
                </div>}
                <NewTaskModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    taskName={taskName}
                    setTaskName={setTaskName}
                    setEditMode={setEditMode}
                    editMode={editMode}
                    oldTaskName={oldTaskName}
                    oldTaskStatus={oldTaskStatus}
                />
                {taskList.length !== 0 &&
                    <>
                        <TopCards />
                        <TaskTable
                            setModalShow={setModalShow}
                            setTaskName={setTaskName}
                            setEditMode={setEditMode}
                            editMode={editMode}
                            setOldTaskName={setOldTaskName}
                            setOldTaskStatus={setOldTaskStatus}
                            />
                    </>
                }

            </div>
        </>
    )
}
