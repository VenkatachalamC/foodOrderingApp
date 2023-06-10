import { useEffect } from "react";
import { View,Text,TouchableOpacity,StyleSheet,Image, Pressable } from "react-native";

const Options=({navigation,route})=>{

    useEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor:"#C5FAD5"
            },
            contentStyle:{
                backgroundColor:"#FFFFD2"
            },
            headerTitleAlign:"center",
            headerTintColor:"#408EC6"
        })

    },[])
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.option} onPress={()=>{navigation.navigate("cart")}}>
                <Image source={require("../assets/cart.png")} style={{height:50,width:50}}/>
                <Text style={styles.txt}>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={()=>{navigation.navigate("Orders")}}>
                <Image source={require("../assets/order.png")} style={{height:50,width:50}}/>
                <Text style={styles.txt}>Your Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={()=>{navigation.navigate("Sign-In")}}>
                <Image source={require("../assets/logout.png")} style={{height:50,width:50}}/>
                <Text style={styles.txt}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Options;
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"flex-start",
        justifyContent:"flex-start"
    },
    option:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        margin:20
    },
    txt:{
        flex:1,
        fontSize:20,
        fontWeight:"300",
        color:"#00008B",
        marginLeft:20
    }
})