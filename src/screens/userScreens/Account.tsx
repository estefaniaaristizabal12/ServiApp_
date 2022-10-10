import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import Input2 from "../../components/input2";
import * as UserService from "../../services/UserService";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);




export const Account = () => {
    const [user, setUser] = React.useState<any>({});
    
    React.useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        UserService.getUser(auth.currentUser.uid)
            .then((data) => {
                const name_words = data?.nombrecliente.toLowerCase().split(" ");
                const name_normalized = name_words.map((word:any) => { 
                  return word[0].toUpperCase() + word.substring(1) 
                }).join(" ");
                data.nombrecliente = name_normalized
                setUser(data);
                console.log("getUser", user)
            })
            .catch((error) => {
                console.error(error)
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingTop: 0, paddingHorizontal: 22 }}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={styles.titleBar}>
                        <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                    </View>

                    <View style={{ alignSelf: "center" }}>
                        <View style={styles.profileImage}>
                            <Image source={require('../../../assets/robot.png')} style={styles.image} resizeMode="center"></Image>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, { fontWeight: "200", fontSize: 30, textAlign:'center' }]}>{user?.nombrecliente}</Text>
                        <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Universidad Javeriana</Text>
                    </View>


                    <View style={{ marginVertical: 80, marginTop: 50 }}>
                        <Input2

                            iconName="email-outline"
                            label="Correo Electrónico"
                            placeholder={user?.e_mail}
                            error
                            password
                        />

                        <Input2

                            iconName="account-outline"
                            label="Nombre"
                            placeholder={user?.nombrecliente}
                            error
                            password
                        />

                        <Input2

                            iconName="account-outline"
                            label="Dirección"
                            placeholder={user?.direccion1}
                            error
                            password
                        />

                        <Input2

                            iconName="lock-outline"
                            label="Contraseña"
                            placeholder="***********"
                            error //OJO ACA
                            password
                        />

                    </View>


                </ScrollView>
            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: Colors.black
    },
    image: {
        flex: 1,
        width: 130,
        height: 130,
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});

export default Account;
