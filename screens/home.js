import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable, Modal } from "react-native";
import { cartContext } from "../contexts/cartcontext";
import { userContext } from "../contexts/usercontext";
import { useContext } from "react";


const Home = ({ navigation, route }) => {
    const [modal, setmodal] = useState(false);
    const cartCont=useContext(cartContext);
    const userCont=useContext(userContext);
    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#C5FAD5"
            },
            contentStyle: {
                backgroundColor: "#FFFFD2"
            },
            headerTintColor: "#408EC6",
            headerTitleAlign: "center",
            headerRight: () => {
                return (
                    <Pressable onPress={() => { setmodal(true) }}>
                        <Image source={require('../assets/menu.png')} style={{ height: 30, width: 30 }} />
                    </Pressable>
                )
            },
            headerLeft: () => {
                return (<View>
                </View>)
            }
        })
    }, [])
    const signout=() => { 
        cartCont.setcart([]);
        userCont.logout();
        navigation.navigate("Sign-In") 
    }
    return (
        <View style={styles.container}>
            <Image source={require("../assets/hamBurger.png")} style={{ height: 150, width: 150 }} />
            <Text style={styles.topic}>Select Your category</Text>
            <View style={styles.categories}>
                <TouchableOpacity style={styles.category} onPress={() => navigation.navigate("Menu", { dish: "Fast Food" })}>
                    <Text style={styles.txt}>Fast Foods</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.category} onPress={() => navigation.navigate("Menu", { dish: "Indian" })}>
                    <Text style={styles.txt}>Indian</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.category} onPress={() => navigation.navigate("Menu", { dish: "Italian" })}>
                    <Text style={styles.txt}>Italian</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.category} onPress={() => navigation.navigate("Menu", { dish: "Drinks" })}>
                    <Text style={styles.txt}>Drinks</Text>
                </TouchableOpacity>
            </View>
            <Modal animationType="slide"
                transparent={true}
                visible={modal}
            >
                <View style={styles.modal}>
                    <View style={styles.options}>
                        <View style={styles.modalHead}>
                            <Pressable style={styles.mb} onPress={() => setmodal(false)}>
                                <Image source={require('../assets/close.png')} style={{ height: 25, width: 25, margin: 15 }} />
                            </Pressable>
                        </View>
                        <TouchableOpacity style={styles.option} onPress={() => { navigation.navigate("cart") }}>
                            <Image source={require("../assets/cart.png")} style={{ height: 40, width: 40 }} />
                            <Text style={styles.modaltxt}>Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={() => { navigation.navigate("Orders") }}>
                            <Image source={require("../assets/order.png")} style={{ height: 40, width: 40 }} />
                            <Text style={styles.modaltxt}>Your Orders</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={signout}>
                            <Image source={require("../assets/logout.png")} style={{ height: 40, width: 40 }} />
                            <Text style={styles.modaltxt}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Home;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    categories: {
    },
    category: {
        height: 50,
        width: 100,
        backgroundColor: "#AA96DA",
        margin: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    txt: {
        fontSize: 15,
        color: "#00008B"
    },
    topic: {
        color: "#00008B",
        fontSize: 20,
        fontWeight: "500"
    },
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",

    },
    options: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        margin: 20,
        marginBottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#C5FAD5",
        height: 250,
        width: 400
    },
    option: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: 10
    },
    modalHead: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        width: 400,
        height: 50,
    },
    modaltxt: {
        flex: 1,
        fontSize: 20,
        fontWeight: "300",
        color: "#00008B",
        marginLeft: 20
    }
})