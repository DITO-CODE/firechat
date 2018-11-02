import firebase from 'firebase';



export function addContact(contact){


    return new Promise((resolve,reject)=>{

        let uid = contact.uid;
        delete contact.uid;
        firebase.firestore().collection(`usuarios/${uid}/contactos`).add(contact).then((result)=>{
            resolve({error:false})
        }).catch((error)=>{
            console.log(error);
            reject({error:true,msg:"No se logro agregar el contacto."});
        });
    });

}



 export function getContacts(uid){
   return new Promise((resolve,reject)=>{

   
        firebase.firestore().collection(`usuarios/${uid}/contactos`).onSnapshot((result)=>{
           
            if(result.docChanges()){
              
                let data = [];

                result.docChanges().forEach((element)=>{

                    data.push(element.doc.data());
                })
                resolve(data);
            }else{
                resolve(null);
            }  
               
         });
      });  


}