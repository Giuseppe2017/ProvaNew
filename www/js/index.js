/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
$(function(){
   $("#inserisciGiocatore").submit(function(event){
       event.preventDefault();
       var myObj = new Object();
       myObj.nome = $("#nome").val();
       myObj.telefono = $("#telefono").val();
       myObj.ruolo = $("#ruolo").val();
       var json = JSON.stringify(myObj);
   
       $.ajax({
          url:"https://calcetto-2d790.firebaseio.com/giocatori.json",
          type:"POST",
          data: json
       })
               .done(function(){
                   alert("Tutto ok");
       })
               .fail(function(){
                   alert("Errore!");
       }); 
   });
   $("#elenco").on("pageshow",function(){
      $.ajax("https://calcetto-2d790.firebaseio.com/giocatori.json")
              .done(function(data){
                  var lista = $("#listaGiocatori");
                  lista.empty();
                  $.map(data,function(riga,indice){
                      var testoGiocatore = "";
                          testoGiocatore += riga.nome + " ";
                          testoGiocatore += riga.telefono + " ";
                          testoGiocatore += riga.ruolo + " ";
                          //console.log(testoGiocatore);
                      $(lista).append('<li>'+ testoGiocatore +'</li>');
                  });
              })
              .fail(function(){
                  alert("Errore!");
              });
   });
});