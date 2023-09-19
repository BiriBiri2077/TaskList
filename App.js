import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';

export default function App() {
  return (
    <View>
      <Text style={{fontSize:22, textAlign:'center', paddingTop:20, backgroundColor:'grey',paddingBottom:5}}>pudim bobao</Text>
      <StatusBar style="auto" />
      <Image source={{uri: 'https://rlv.zcache.com.br/relogio_grande_sorrindo_o_macaco-rf6b6ef91230943a6a423bb593437c552_s0ysp_8byvr_644.jpg'}}
       style={{width: 400, height: 400}} />
    </View>
  );
}

const styles = StyleSheet.create({

});
