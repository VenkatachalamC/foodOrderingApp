import {View,Text,Image,StyleSheet,FlatList,TouchableOpacity,Pressable} from "react-native";
import { useContext, useEffect,useState } from "react";
import { cartContext } from "../contexts/cartcontext";
const Menu=({navigation,route})=>{
    const cartCont=useContext(cartContext);
    const [menu,setmenu]=useState([])

    useEffect(()=>{
        navigation.setOptions({
            headerRight:()=>{
                return (
                    <View>
                        <TouchableOpacity onPress={()=>navigation.navigate("cart")}>
                            <Image source={require('../assets/cart.png')} style={{height:30,width:30}}/>
                        </TouchableOpacity>
                    </View>
                )
            },
            headerTitleAlign:"center",
            headerLeft:()=>{
                return (
                    <Pressable onPress={()=>navigation.navigate("Home")}>
                        <Image source={require("../assets/home.png")}/>
                    </Pressable>
                )
            },
            headerStyle:{
                backgroundColor:"#C5FAD5"
            },
            contentStyle:{
                backgroundColor:"#FFFFD2"
            },
            headerTintColor:"#408EC6",
            headerTitle:route.params.dish

        },[menu])
        fetch(`https://foodordering-f87i.onrender.com/getcat/${route.params.dish}`)
        .then(res=>res.json())
        .then(data=>{setmenu(data)})
    })
    function renderFood({item}){
        //console.log(typeof item.url)
        //const src=require(item.location);
        const index=cartCont.cart.findIndex(it=>item._id===it._id)
        const url=`https://foodordering-f87i.onrender.com/image/${item.name}`
        return (
            <View style={styles.card}>
                <Image source={{uri:url}} style={styles.image}/>
                <View style={styles.desc}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>Rs.{item.price}</Text>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={()=>cartCont.add(item)}>
                        <Image source={require('../assets/add.png')} style={{height:30,width:30}}/>
                    </TouchableOpacity>
                    <Text style={styles.count}>{index!==-1?cartCont.cart[index].count:0}</Text>
                    <TouchableOpacity  onPress={()=>cartCont.remove(item)}>
                    <Image source={require('../assets/remove.png')} style={{height:30,width:30}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.menu}>
            <FlatList data={menu} renderItem={renderFood} keyExtractor={(item)=>item._id}/>
        </View>
    )
}

export default Menu;

const styles=StyleSheet.create({
    card:{
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        margin:10,
        height:100,
        width:370,
        alignSelf:"stretch"
    },
    menu:{
        flex:1,
        alignItems:"flex-start",
        justifyContent:"center"
    },
    name:{
        fontSize:15,
        flex:1,
        color:"#00008B",
        fontWeight:"bold"
    },
    price:{
        fontSize:20,
        flex:1,
        color:"#00008B"
    },
    desc:{
        margin:10,
        alignItems:"flex-start",
        justifyContent:"center",
        flex:2
    },
    image:{
        flex:2,
        height:100,
        width:100,
        borderRadius:20
    },
    button:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    add:{
        backgroundColor:"green",
        height:30,
        width:70,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:2,
        margin:5
    },
    remove:{
        backgroundColor:"red",
        height:30,
        width:70,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:2,
        margin:5
    },
    count:{
        alignItems:"center",
        justifyContent:"center",
        color:"#00008B"
    }
})