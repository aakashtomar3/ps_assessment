import React from 'react'
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';




export default function TopCards() {
    const taskList = useSelector(state => state.TaskReducer?.tasks || [])
    const completedTasks = taskList.filter((task) => task.isComplete == true).length
    const latestTasks = taskList.slice(-3)
    const data01 = [
        { name: 'Completed Tasks', value: completedTasks, fill: '#5285EC' },
        { name: 'Incomplete Tasks', value: (taskList.length - completedTasks), fill: '#E8ECEC' },
    ];
    return (
        <>
            <div className='cards-wrapper'>
                <Card className="top-cards login-card">
                    <Card.Body className="top-cards-body">
                        <div className='title-text'>Tasks completed</div>
                        <div><span className='completed-tasks'>{completedTasks}</span> <sub className='total-tasks'>/ {taskList.length}</sub></div>
                    </Card.Body>
                </Card>
                <Card className="top-cards login-card">
                    <Card.Body className="top-cards-body">
                        <div className='title-text'>Latest created tasks</div>
                        <div>
                            <ul className="task-ul">
                                {latestTasks.reverse().map((task) => {
                                    return (
                                        <li key={task.name} className={task.isComplete ? 'text-strike' : ''}>{task.name}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="top-cards login-card">
                    <Card.Body className="top-cards-body">
                        <ResponsiveContainer width="100%" height="100%" minHeight={100}>
                            <PieChart width={400} height={400}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={data01}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                    fill="#8884d8"
                                // label
                                />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
