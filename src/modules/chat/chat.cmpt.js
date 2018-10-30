import React,{Component} from 'react';
import {getCurrentUser} from '../login/login.code';


class Chat extends Component {

    componentDidMount(){
          
        let currentuser = getCurrentUser().then((result)=>{
            console.log(result);
        });


        console.log(currentuser);

    }

    componentWillMount(){
      
    }

    render(){
        return (
            <div>
                Hola putos
            </div>
        )
    }

}

export default Chat;