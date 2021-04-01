import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios()
    .then(usuarios => console.log(usuarios));

    // const promesa = new Promise((resolve, reject) => {

    //   if(false){
    //     resolve('Hola mundo');
    //   }
    //   else{
    //     reject('Algo salio mal');
    //   }

    // });

    // promesa.then((data) => {
    //   console.log(data);
    // })
    // .catch(error => console.log("Error en la promesa ", error));

    // console.log("FIN");
    

  }

  getUsuarios(){
    const promesa = new Promise(resolve => {
      fetch('https://reqres.in/api/users?page=2')
      .then(resp => resp.json())
      .then(body => resolve(body.data));
    });

    return promesa;
    
  }

}
