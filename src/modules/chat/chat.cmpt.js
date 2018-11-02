import React,{Component} from 'react';
import {getCurrentUser} from '../login/login.code';
import firebase from 'firebase';
import {getContacts} from './chat.code';
import Contacts from './contacts.cmpt';
import Loading from './loading.cmpt';


class Chat extends Component {

    state={
        uid:null
    }

    componentDidMount(){
          
        getCurrentUser().then((result)=>{
            if(result){
              
                
                this.setState({uid:result.uid},()=>{
                    this.listenerUsuarios();
                });
            }else{
                this.props.history.push("/")
            }
          
        }).catch((error)=>{
            this.props.history.push("/")
        })

        
    }

    listenerUsuarios(){

        firebase.firestore().collection(`usuarios/${this.state.uid}/contactos`).onSnapshot((result)=>{
            if(result.docs){
                let data = [];
                result.docs.forEach((element)=>{
                    data.push(element.data());
                })
                this.setState({data})
            }
         });
    }

    componentWillMount(){
      
    }

    agregarAction(){
        this.props.history.push("/addContact",{uid:this.state.uid})
    }

    showChat(email){
        this.props.history.push(`/chat/${email}`);
    }

    render(){

        if(!this.state.uid){
            return (
                <Loading />
            )
        }
        return (
            <Contacts agregarAction={this.agregarAction.bind(this)} 
            uid={this.state.uid}
            data= {this.state.data}

            showChat={this.showChat.bind(this)}
             />
        )
    }

}

export default Chat;