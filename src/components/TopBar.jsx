import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskList } from '../Dashboard/ducks/TaskReducer';
import { updateLoggedIn } from '../Login/ducks/LoginReducer';

export default function TopBar() {
    const userName = useSelector(state => state.loginReducer.userName)
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(updateTaskList([]))
        dispatch(updateLoggedIn({loggedIn: false}))
        sessionStorage.removeItem("_redux_state_data")
    }
    return (
        <>
            <Navbar className="top-bar">
                <Container>
                    <Navbar.Brand>
                        <Avatar round={true} size={50} src={require('../assets/img/profile.png')} />
                        &nbsp; {userName}
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text style={{cursor:'pointer'}} onClick={logout}>
                            Logout
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}