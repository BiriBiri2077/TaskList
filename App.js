import React, {useState} from 'react';
import { StyleSheet, Text, View,ImageBackground, TouchableOpacity } from 'react-native';


export default function App() {
  
  const image = require('./resources/bg.jpg');

  console.disableYellowBox = true;
  
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
  
  function deletarTarefa(id){
    alert('Tarefa com id'+id+' foi deletada com sucesso!');
    let newTarefas = tarefas.filter(function(val){
          return val.id != id;
    });

    setarTarefas(newTarefas);
  }
  


  return (
    <View style={{flex:1}}>
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
    paddingBottom:10
  }
});
