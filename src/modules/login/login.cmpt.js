import React, { Component } from 'react';
import {login} from './login.code';


class Login extends Component {


    state ={
        email:"",
        password:"",
        remember:false,
        errorMessage:null
    }

    onChange(event){
        var target = event.target;
        this.setState({[target.id]:target.value,errorMessage:null});
    }

    onChangeCheck(event){
        var target= event.target;
        let value = target.checked;
        this.setState({remember:value});
    }

    loginAction(event){
        event.preventDefault();
        console.log(this.state);
        login(this.state.email,this.state.password,this.state.remember).then((user)=>{
            this.props.history.push("/chat");
        }).catch((error)=>{
            this.setState({errorMessage:error.msg})
        });
    }

    render() {

        const {errorMessage} = this.state;

        return (
            <div className="card">
            <form className="text-center border border-light p-5" onSubmit={this.loginAction.bind(this)}>

                <p className="h4 mb-4">Ingresar</p>


                <input type="email" id="email" className="form-control mb-4" 
                    placeholder="E-mail" 
                    value={this.state.email}
                    onChange={this.onChange.bind(this)}
                    />


                <input type="password" id="password" className="form-control mb-4" 
                    placeholder="Password" 
                    value={this.state.password}
                    onChange={this.onChange.bind(this)}
                    />

                <div className="d-flex justify-content-around">
                    <div>

                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="remember" name="remember"
                            onChange={this.onChangeCheck.bind(this)}
                            checked={this.state.remember}
                            />
                            <label className="custom-control-label" htmlFor="remember">Recuerdame</label>
                        </div>
                    </div>
                    <div>

                        <a href="">Ólvide mi contraseña</a>
                    </div>
                </div>


                <button className="btn btn-info btn-block my-4" type="submit">Ingresar</button>

                {
                    errorMessage ?
                    <p className="text-danger"> 
                        {errorMessage}
                        </p>: null
                }

                <p>¿No eres miembro? <a href="">Registrarme</a>
                </p>

            </form>
            </div>

        )
    }

}


export default Login;