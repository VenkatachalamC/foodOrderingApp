import { useEffect,useContext,useState } from "react";
import { FlatList } from "react-native";
import {View,Text,StyleSheet} from 'react-native'
import { userContext } from "../contexts/usercontext";

const Orders=({navigation,route})=>{
    const userCont=useContext(userContext);
    const [orders,setorders]=useState([])
    useEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor:"#C5FAD5"
            },
            contentStyle:{
                backgroundColor:"#FFFFD2"
            },
            headerTintColor:"#408EC6",
            headerTitleAlign:"center",
        })
        fetch(`https://foodordering-f87i.onrender.com/orders/${userCont.username}`).then(res=>res.json())
        .then(data=>setorders(data))
    },[])
    return (
        <View style={styles.container}>
            <FlatList data={orders} renderItem={({item})=>{
                return (
                    <View style={styles.order}>
                        <View style={styles.dateTime}>
                        <Text style={styles.dt}>Date:{item.date}</Text>
                        <Text style={styles.dt}>Time:{item.time}</Text>
                        </View>
                        <Text style={styles.cost}>Rs.{item.cost}</Text>
                    </View>
                )
            }}/>
        </View>
    )
}

export default Orders;

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    order:{
        flex:1,
        width:400,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly",
        borderLeftWidth:0,
        borderTopWidth:0,
        borderWidth:1,
        padding:5
    },
    dateTime:{
        flex:3,
        alignItems:"flex-start",
        justifyContent:"center",
        marginLeft:10
    },
    dt:{
        fontSize:20,
        fontWeight:"400",
        color:"#00008B"
    },
    cost:{
        flex:1,
        fontSize:20,
        fontWeight:"400",
        color:"#00008B"
    }
})