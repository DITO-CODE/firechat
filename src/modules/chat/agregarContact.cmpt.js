import React,{Component} from 'react';
import {addContact} from './chat.code';


class AddContact extends Component{

    state={
        email:"",
        telefono:"",
        nombre:"",
        message:null,
        uid:null
    }

    componentDidMount(){
        console.log(this.props);
        if(this.props.location){
            if(this.props.location.state){
                this.setState({uid:this.props.location.state.uid})
            }else{
                this.props.history.push('/chat');
            }
        }else{
            this.props.history.push('/chat');
        }
    }

    changeValue(event){
        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.setState({[name]:value});
    }

    handleSubmit(event){
        event.preventDefault();
        let message = this.state.message;
        let valido = true;

        if(this.state.email
            .trim()===""){
            message = "Correo requerido.";
            valido=false;
        }else if(this.state.telefono.trim()===""){
            valido=false;
            message = "Teléfono requerido."
        }
        else if(this.state.nombre.trim()===""){
            valido=false;
            message = "Nombre requerido."
        }

        if(valido){
            console.log(this.state);

            let contact = {
                uid:this.state.uid,
                email: this.state.email,
                nombre: this.state.nombre,
                telefono: this.state.telefono
            }
            addContact(contact).then((result)=>{
                this.props.history.push("/chat");
            }).catch((error)=>{
                this.setState({message:error.msg});
            })
        }else{
            this.setState({message});
        }
    }


    render(){
        return (
            <div className="col-lg-12">
            <div className="card text-center">
                <div className="card-header info-color white-text text-left">
                    Contacto 
                </div>
                <div className="card-body">
                  <form 
                  onSubmit={this.handleSubmit.bind(this)}
                  className="text-center border border-light p-5">

                        <p className="h4 mb-4">Contacto</p>

                        <input type="text" id="nombre" name="nombre" 
                            className="form-control mb-4" placeholder="Nombre"
                            onChange={this.changeValue.bind(this)}
                            value={this.state.nombre}
                            ></input>

                        <input type="email" id="email" name="email" 
                            className="form-control mb-4" placeholder="Correo"
                            onChange={this.changeValue.bind(this)}
                            value={this.state.correo}
                            ></input>
                        <input type="text" id="telefono" name="telefono" className="form-control mb-4" 
                        onChange={this.changeValue.bind(this)}
                        value={this.state.telefono}
                        placeholder="Teléfono"
                        ></input>

                        {
                    this.state.message ?
                    <p className="text-danger"> 
                        {this.state.message}
                        </p>: null
                }

                        <button className="btn btn-info  my-4" type="submit">Agregar</button>
                        <button className="btn btn-danger my-4" type="button"
                        onClick={()=>{
                            this.props.history.push("/chat")
                        }}
                        >Cancelar</button>
                  </form>
                </div>
                    <div className="card-footer text-muted info-color white-text">
                    <p className="mb-0"><a href="www.ditocode.com">www.DITOCODE.com</a></p>
                </div>
            </div>
        </div>
        )
    }

}


export default AddContact;