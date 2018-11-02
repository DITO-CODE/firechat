import React,{Component} from 'react';
import {getCurrentUser} from '../login/login.code';
import firebase from 'firebase';

class Messagess extends Component{

    state={
        usuario:null,
        texto:""
    }
    componentDidMount(){
        console.log(this.props);

        

        if(this.props.match){
            if(this.props.match.params){
                if(this.props.match.params.usuario){

                    getCurrentUser().then((result)=>{
                        if(result){
                            this.setState({uid:result.uid,correo:result.email,
                                usuario:this.props.match.params.usuario},
                                ()=>{
                                    this.listenerMessagess();
                                });
                        }else{
                            this.props.history.push("/")
                        }
                      
                    }).catch((error)=>{
                        this.props.history.push("/")
                    })
                }else{
                    this.props.history.push("/chat");
                }
            }else{
            this.props.history.push("/chat");
            }
        }else{
            this.props.history.push("/chat");
        }
    }

    changeValues(event){
        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.setState({[name]:value});
    }


    listenerMessagess(){
        console.log(this.state.correo);
        firebase.firestore().collection("chats").where("participante1","==",this.state.correo)
        .get().then((result)=>{
           console.log(result.docs);
           result.docs.forEach((element)=>{
               console.log(element.data());
           })
        });
    }

    handleSubmit(event){
        event.preventDefault();
        let date = new Date().getTime().toString();

        console.log(this.state);

        let data = {}

        data[date] = {
            texto:this.state.texto,
            send:this.state.correo,
            date: date
        }

        console.log(data);

        let ref = firebase.firestore()
        .doc(`chats/${this.state.uid}${this.state.usuario}`);

        ref.get().then((result)=>{
            if(result.exists){
              ref.update(data).then((result)=>{
                this.setState({texto:""});
                }).catch((error)=>{
                    console.log(error);
                });
            }else{
                data.participante1=this.state.usuario;
                data.participante2=this.state.correo;
                

                ref.set(data).then((result)=>{
                    this.setState({texto:""});
                }).catch((error)=>{
                    console.log(error);
                });
            }
        })
    }

    render(){
        return (
            <div className="col-lg-12">
            <div className="card text-center">
                <div className="card-header info-color white-text text-left">
                <i className="fa fa-arrow-left" aria-hidden="true"
                onClick={()=>{
                    this.props.history.push("/chat")
                }}
                style={{cursor:"pointer"}}
                ></i> Chat 
                </div>
                <div className="card-body" style={{height:"80vh"}}>
                    <div clas="content">
                    
                    
                    </div>
                </div>
                    <div className="card-footer text-muted white-text">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" 
                            name="texto" id="texto"
                            onChange={this.changeValues.bind(this)}
                            value={this.state.texto}
                            placeholder="Escribe..."/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">
                                    <button className="fa fa-send" type="submit" aria-hidden="true"></button>
                                </span>
                            </div>
                        </div>
                        </form>
                        <p className="mb-0"><a href="www.ditocode.com">www.DITOCODE.com</a></p>
                    </div>
            </div>
        </div>
        )
    }

}


export default Messagess;