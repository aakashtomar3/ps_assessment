import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function NoTask(props) {
    return (
        <>
            <Card className="login-card no-task">
                <Card.Body>
                    <div className="login-font" style={{marginTop:'20px'}}>You have no task.</div>
                    <Button onClick={()=> props.setModalShow(true)} className="new-task-button" style={{margin: '0', marginTop:'15px'}} variant="primary">+ New Task</Button>
                </Card.Body>
            </Card>
        </>
    )
}
