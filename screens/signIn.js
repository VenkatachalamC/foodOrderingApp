import { TextInput,Text,TouchableOpacity ,View,Pressable,StyleSheet,Image} from "react-native";
import { useEffect, useState,useContext } from "react";
import { userContext } from "../contexts/usercontext";
const SignIn=({route,navigation})=>{
    const userCont=useContext(userContext);
    const [username,setusername]=useState("")
    const [password,setpassword]=useState("")
    const [error,seterror]=useState("")
    useEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor:"#C5FAD5"
            },
            contentStyle:{
                backgroundColor:"#FFFFD2"
            },
            headerTitleAlign:"center",
            headerTintColor:"#408EC6",
            headerTitle:"Online food Ordering"
        })
    })

    const signin=()=>{
        fetch('https://foodordering-f87i.onrender.com/signin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:username,
                password:password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.status==="ok"){
                userCont.login(username)
                seterror("")
                navigation.navigate("Home")
            }
            else{
                seterror(data.status)
            }
        })
        
    }
    return (
        <View style={styles.container}>
            <Image source={require('../assets/hamBurger.png')} style={{height:150,width:150}}/>
            <Text style={{color:"red",fontSize:20,fontWeight:"400"}}>{error}</Text>
            <View style={styles.card}>
                <TextInput placeholder="UserName" style={styles.input} value={username} onChangeText={(value)=>setusername(value)} placeholderTextColor="#00008B"/>
                <TextInput placeholder="UserName" secureTextEntry={true} style={styles.input} value={password} onChangeText={(value)=>setpassword(value)} placeholderTextColor="#00008B"/>
                <TouchableOpacity style={styles.button} onPress={signin}>
                    <Text style={styles.txt}>Sign In</Text>
                </TouchableOpacity>
                <Pressable onPress={()=>navigation.navigate("Sign-Up")}>
                    <Text style={styles.txt}>Sign up?</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default SignIn;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    card:{
        alignItems:"center",
        justifyContent:"center",
        width:300,
        borderColor:"#C5FAD5",
        borderWidth:2,
        borderRadius:10,
        padding:10
    },
    input:{
        width:250,
        margin:10,
        borderWidth:2,
        height:50,
        padding:10,
        borderColor:"#00008B",
        color:"#00008B",
        borderRadius:10,
        fontWeight:"500",
        fontSize:15
    },
    button:{
        backgroundColor:"green",
        width:100,
        alignItems:"center",
        justifyContent:"center",
        padding:5,
        borderRadius:10
    },
    txt:{
        fontSize:15,
        color:"#00008B",
        fontWeight:"500",
        margin:5
    }
})