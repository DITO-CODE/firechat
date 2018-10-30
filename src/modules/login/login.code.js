import firebase from 'firebase';

export function getCurrentUser(){

    return new Promise((resolve,reject)=>{
        firebase.auth().onAuthStateChanged((user)=>{
           if(user){
               resolve(user)
           }else{
               reject({error:true,msg:"Sin usuario"});
           }
        });
    })
  
}

export function login(email,password,remember){

    return new Promise((resolve,reject)=>{
        let persistence  = firebase.auth.Auth.Persistence.SESSION;
        
        if(remember){
            persistence  = firebase.auth.Auth.Persistence.LOCAL;
        }

        firebase.auth().setPersistence(persistence).then(()=>{
            firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{
                resolve(user);
            }).catch((error)=>{
    
                let code = error.code;
                let data = {
                    msg:"",
                    error:true
                }
    
                if(code === "auth/invalid-email"){
                    data.msg = "Correo no válido."
                }else if(code === "auth/user-disabled"){
                    data.msg = "Usuario inhabilitado."
                }else if(code === "auth/user-not-found"){
                    data.msg = "Usuario no encontrado."
                }else if(code === "auth/wrong-password"){
                    data.msg = "Contraseña incorrecta."
                }else{
                    console.log(error);
                    data.msg = "Ocurrio un error inesperado intente de nuevo."
                }
                reject(data);
            });
        }).catch((error)=>{
            reject({error:true,msg:"Ocurrio un error inesperado intente de nuevo."});
        })
        
    });

}