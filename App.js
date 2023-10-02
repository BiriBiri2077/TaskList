import React, {useState} from 'react';
import { StyleSheet, Text, View,ImageBackground, TextInput, TouchableOpacity, TouchableHighlight,SafeAreaView, Modal } from 'react-native';


export default function App() {
  
  const image = require('./resources/bg.jpg');

  console.disableYellowBox = true;

  const [tarefaAtual,setTaskAtual] = useState('');
  
  const [tarefas, setarTarefas] = useState([
    {
      id: 1,
      tarefa: 'Minha tarefa 1.'
    },
    {
      id:2,
      tarefa: 'Minha tarefa 2.'
    }
  ]);

  const [modal,setModal] = useState(false);

 
  
  function deletarTarefa(id){
    alert('Tarefa com id'+id+' foi deletada com sucesso!');
    let newTarefas = tarefas.filter(function(val){
          return val.id != id;
    });

    setarTarefas(newTarefas);
  }

  function addTarefa(){
      setModal(!modal);
      let id = 0;
      if(tarefas.length > 0){
        id = tarefas[tarefas.length-1].id+1;
      }

      let tarefa = {id:id,tarefa:tarefaAtual};

      setarTarefas([...tarefas,tarefa]);

  }

  


  return (
    <View style={{flex:1}}>

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
        <Text>{val.tarefa}</Text>
      </View>
      <View style={{alignItems:'flex-end', flex:1, paddingEnd:10}}>
        <TouchableOpacity onPress={()=> deletarTarefa(val.id)}><Text style={{fontSize:25}}>+</Text></TouchableOpacity>
      </View>
    </View>);
    })
    }

    <TouchableOpacity style={styles.bynAddTarefa} onPress={()=>setModal(true)}><Text style={{textAlign:'center', color:'white'}}>Adicionar Tarefa!</Text></TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width:'100%',
    height:80,
    resizeMode:"cover",
    justifyContent:'center',
  },
  coverView: {
    width:'100%',
    height:80,
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
    margin: 20,
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
    marginTop:20
  }

 
});
