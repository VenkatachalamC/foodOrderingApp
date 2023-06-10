import {View,Text,Image,StyleSheet,FlatList,TouchableOpacity, Pressable, ToastAndroid} from "react-native"
import { useContext,useEffect } from "react";
import { cartContext } from "../contexts/cartcontext";
import { userContext } from "../contexts/usercontext";
function CartScreen({navigation,route}){
    const cartCont=useContext(cartContext);
    const userCont=useContext(userContext)
    useEffect(()=>{
        navigation.setOptions({
            headerTitleAlign:"center",
            headerTitle:"Cart",
            headerStyle:{
                backgroundColor:"#C5FAD5"
            },
            contentStyle:{
                backgroundColor:"#FFFFD2"
            },
            headerLeft:()=>{
                return (
                    <Pressable onPress={()=>navigation.navigate("Home")}>
                        <Image source={require('../assets/home.png')} style={{height:30,width:30}}/>
                    </Pressable>
                )
            },
            headerTintColor:"#408EC6"
        })
    })
    function order(){
        fetch("https://foodordering-f87i.onrender.com/order",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:userCont.username,
                cost:cartCont.total()
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.status==="ok"){
                ToastAndroid.show("order placed successfully",ToastAndroid.LONG);
                cartCont.setcart([])
            }
        })
    }
    return (
        <View style={{flex:1}}>
        {cartCont.cart.length>0?(<View style={styles.container}>
            <FlatList data={cartCont.cart} renderItem={({item})=>{
                const url=`https://foodordering-f87i.onrender.com/image/${item.item.name}`
                return (
                    <View style={styles.card}>
                <Image source={{uri:url}} style={styles.image}/>
                <View style={styles.desc}>
                <Text style={styles.name}>{item.item.name}</Text>
                <Text style={styles.price}>Rs.{item.item.price}</Text>
                </View>
                <Text style={styles.price}>{item.count}</Text>
                <View style={styles.button}>
                <TouchableOpacity  onPress={()=>cartCont.remove(item)}>
                    <Image source={require('../assets/remove.png')} style={{height:30,width:30}}/>
                    </TouchableOpacity>
                </View>
            </View>
                )
            }} keyExtractor={(item)=>item._id}/>
            <View style={styles.total}>
                <Text style={styles.totalText}>Total Cost:{cartCont.total()}</Text>
            
            <TouchableOpacity style={styles.placeorder} onPress={order} >
                <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
            </View>
        </View>):(<View style={styles.emptycart}>
            <Image source={require('../assets/sad.png')} style={{height:100,width:100}}/>
            <Text style={styles.emptymsg}>No Items In cart</Text>
            </View>)}
        </View>
    )
}

export default CartScreen;

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
        fontSize:25,
        flex:1,
        color:"#00008B"
    },
    price:{
        fontSize:20,
        flex:1,
        textAlign:"center",
        color:"#00008B"
    },
    desc:{
        flex:2,
        margin:10,
        alignItems:"center",
        justifyContent:"center",
    },
    image:{
        flex:2,
        height:100,
        width:100,
        borderRadius:20
    },
    button:{
        flex:1,
        alignItems:"flex-end",
        justifyContent:"center"
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
    container:{
        flex:1
    },
    total:{
        height:90,
        alignItems:"center",
        justifyContent:"center"
    },
    totalText:{
        fontSize:30,
        color:"#00008B"
    },
    placeorder:{
        alignItems:"center",
        justifyContent:"center",
        height:50,
        backgroundColor:"#AA96DA",
        width:400,
        borderRadius:10,
    },
    emptycart:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    emptymsg:{
        fontSize:20,
        margin:10,
        color:"#00008B",
        fontWeight:"500"
    },
    placeOrderText:{
        color:"#00008B",
        fontSize:20
    }
})