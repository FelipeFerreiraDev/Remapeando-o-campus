import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import { LandingPage } from './pages/Landing';
import { RoomMap } from './pages/RoomsMap';
import { CreateRoom } from './pages/CreateRoom';
import { DeleteRoom } from './pages/DeleteRoom';
import RoomDetails from './pages/RoomDetails';
import { RoomList } from './pages/RoomList';
import { LoginUser } from './pages/LoginUser';

import { useContext } from "react";
import { Context } from './Context/AuthContext';
import { CreateUser } from './pages/CreateLogin';

function CustomRoute({ isPrivate, ...rest }) {
    const { authenticated } = useContext(Context);
    const emailAuth = localStorage.getItem('email');
    
    if(isPrivate && !authenticated) {
         return <Redirect to="/User/Login" />
    } else if(isPrivate && emailAuth !== 'remapeandoocampus@gmail.com') {
        return <Redirect to="/" />
    } 

    return <Route {...rest} />
}

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <CustomRoute path="/" exact component={LandingPage} />
                <CustomRoute path="/Map/Room/:latitude/:longitude" component={RoomMap}/>
                <CustomRoute path="/Map/Room/:id" component={RoomDetails}/>
                <CustomRoute path="/Map/RoomList" component={RoomList}/>
                <CustomRoute isPrivate path="/Map/CreateRoom"  component={CreateRoom}/>
                <CustomRoute isPrivate path="/Map/DeleteRoom" component={DeleteRoom}/>

                <CustomRoute path="/User/Login" component={LoginUser}/>
                <CustomRoute isPrivate path="/User/Create" component={CreateUser}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;