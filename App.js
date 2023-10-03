import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,ImageBackground, TextInput, TouchableOpacity, TouchableHighlight, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  
  const image = require('./resources/bg.jpg');

  console.disableYellowBox = true;

  const [tarefaAtual,setTaskAtual] = useState('');
  
  const [tarefas, setarTarefas] = useState([]);

  const [modal,setModal] = useState(false);



  useEffect(()=>{
    //alert('app carregado...');

    (async () => {
      try {
        let tarefaAtual = await AsyncStorage.getItem('tarefas');
        if(tarefaAtual == null)
        setarTarefas([]);
      else
        setarTarefas(JSON.parse(tarefaAtual));
      } catch (error) {

      }
    })();
  });
  
 
  
  function deletarTarefa(id){
    alert('Tarefa com id'+id+' foi deletada com sucesso!');
    let newTarefas = tarefas.filter(function(val){
          return val.id != id;
    });

    setarTarefas(newTarefas);

    (async () => {
      try {
        await AsyncStorage.setItem('tarefas', JSON.stringify(newTarefas));
      } catch (error) {}
    })();

  }

  function addTarefa(){
      setModal(!modal);
      let id = 0;
      if(tarefas.length > 0){
        id = tarefas[tarefas.length-1].id+1;
      }

      let tarefa = {id:id,tarefa:tarefaAtual};

      setarTarefas([...tarefas,tarefa]);

      (async () => {
        try {
          await AsyncStorage.setItem('tarefas', JSON.stringify([...tarefas,tarefa]));
        } catch (error) {}
      })();

  }

  


  return (
    <ScrollView style={{flex:1}}>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput onChangeText={text => setTaskAtual(text)} autoFocus={true}></TextInput>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => addTarefa()}
            >
              <Text style={styles.textStyle}>Adicionar Tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <ImageBackground source={image} style={styles.image}>
      <View style={styles.coverView}>
        <Text style={styles.textHeader}>Lista de tarefas</Text>
        </View>
      </ImageBackground>



    {
      tarefas.map(function(val){
    return (<View style={styles.tarefaSingle}>
      <View style={{flex:1,width:'100%', padding:10}}>
        <Text style={{fontSize:18}}>{val.tarefa}</Text>
      </View>
      <View style={{alignItems:'flex-end', flex:1, paddingEnd:10}}>
        <TouchableOpacity onPress={()=> deletarTarefa(val.id)}><Text style={{fontSize:35, paddingRight:10}}>-</Text></TouchableOpacity>
      </View>
    </View>);
    })
    }

    <TouchableOpacity style={styles.bynAddTarefa} onPress={()=>setModal(true)}><Text style={{textAlign:'center', color:'white'}}>Adicionar Tarefa!</Text></TouchableOpacity>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width:'100%',
    height:60,
    resizeMode:"cover",
    justifyContent:'center',
  },
  coverView: {
    width:'100%',
    height:60,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  textHeader: {
    textAlign:'center',
    color:'white',
    fontSize:20,
    marginTop:20
  },
  tarefaSingle:{
    marginTop:30,
    width:'100%',
    flexDirection:'row',
    paddingBottom:10,
  },
  //Estilos para nossa modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex:5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  bynAddTarefa: {
    width:200,
    padding:8,
    backgroundColor:'gray',
    marginTop:20,
    alignSelf:'center',
    borderRadius:20
  }

 
});
