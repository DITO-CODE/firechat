import React from 'react';
import {getDataContacts} from './chat.code';


const Contacts = (props)=>{



    let {data,showChat} = props;


    return(
        <div className="col-lg-12">
            <div className="card text-center">
                <div className="card-header success-color white-text text-left">
                    Contactos 
                    <button type="button" 
                    onClick={props.agregarAction}
                    className="btn btn-info btn-sm">Agregar</button>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                       {
                           data ? 
                           data.map((element,index) => {
                         
                            return (
                                <li key={index} 

                                onClick={()=>{showChat(element.email)}}
                                
                                className="list-group-item-action list-group-item d-flex justify-content-between align-items-center">
                                    {element.nombre}
                                    <span className="badge badge-primary badge-pill">14</span>
                                </li>
                            )
                        }): null
                       }
                    </ul>
                </div>
                    <div className="card-footer text-muted success-color white-text">
                    <p className="mb-0"><a href="www.ditocode.com">www.DITOCODE.com</a></p>
                </div>
            </div>
        </div>
    )

}

export default Contacts;