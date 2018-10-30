import React,{Component} from 'react';

import {Route,Switch,BrowserRouter} from 'react-router-dom';

/** COMPONENTES LOGIN */
import Login from './modules/login/login.cmpt';

/** COMPONENTES CHAT */
import Chat from './modules/chat/chat.cmpt';


class RouterAPP extends Component{

    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/chat" component={Chat} />
                    <Route path="/" component={Login} />
                </Switch>
            </BrowserRouter>
        )
    }

}


export default RouterAPP;