import React,{Component} from 'react';

import {Route,Switch,BrowserRouter} from 'react-router-dom';

/** COMPONENTES LOGIN */
import Login from './modules/login/login.cmpt';

/** COMPONENTES CHAT */
import Chat from './modules/chat/chat.cmpt';

import AddContact from './modules/chat/agregarContact.cmpt';

import Messagess from './modules/chat/messagess.cmpt';


class RouterAPP extends Component{

    render(){
        return (
          
            <BrowserRouter>
                <Switch>
                    <Route path="/chat/:usuario" component={Messagess} />
                    <Route path="/addContact" component={AddContact} />
                    <Route path="/chat" component={Chat} />
                    <Route path="/" component={Login} />
                </Switch>
            </BrowserRouter>
        )
    }

}


export default RouterAPP;