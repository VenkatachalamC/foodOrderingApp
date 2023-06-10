import { TextInput,Text,TouchableOpacity ,View,Pressable,StyleSheet,Image} from "react-native";
import { useEffect, useState } from "react";

const SignUp=({route,navigation})=>{
    const [username,setusername]=useState("");
    const [pass,setpass]=useState("");
    const [pass2,setpass2]=useState("");
    const [error,seterror]=useState("");
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
            headerTitle:"Sign Up"
        })
    },[])
    const newuser=()=>{
        
                }
    return (
        <View style={styles.container}>
            <Text style={{color:"red",fontSize:20,fontWeight:"400"}}>{error}</Text>
            <View style={styles.card}>
                <TextInput placeholder="UserName" style={styles.input} value={username} onChangeText={(text)=>setusername(text)} placeholderTextColor="#00008B"/>
                <TextInput placeholder="Password" style={styles.input} secureTextEntry={true} value={pass} onChangeText={(text)=>setpass(text)} placeholderTextColor="#00008B"/>
                <TextInput placeholder="ConfirmPassword" style={styles.input} secureTextEntry={true} value={pass2} onChangeText={(text)=>setpass2(text)} placeholderTextColor="#00008B"/>
                <TouchableOpacity style={styles.button} onPress={()=>{
                    if(pass===pass2){
                    
                    fetch("https://foodordering-f87i.onrender.com/signup",{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            name:username,
                            password:pass
                        })}).then(res=>res.json())
                        .then(data=>{
                            if(data.status==="ok"){
                                seterror("");
                                navigation.navigate("Sign-In");
                            }
                        })
                    }
                    else{
                        seterror("passwords do not match");
                    }
                }}>
                    <Text style={styles.txt}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp;

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