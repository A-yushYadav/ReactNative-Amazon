import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable,Alert } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();
    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
        };

        //send a post request to backend  Api
         axios.post("http://192.168.1.13:8000/register", user).then((response) => {
        //    axios.post("http://172.20.10.2:8000/register", user).then((response) => {

            console.log(response,"yayyy");
            Alert.alert("Registration Succesfull", "You have register succesfully ");
            setName("");
            setEmail("");
            setPassword("");
        })
        .catch((error) => {
            if (error.response) {
                console.log("Server Error Response Data:", error.response.data);
            }
            Alert.alert("Registration Error", "An error occurred during registration");
            console.log("Registration Failure", error);
        });
        
        
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: 'center' }}>
            <View>
                <Image
                    style={{ width: 150, height: 100 }}
                    source={{
                        uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
                    }}
                />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>
                        Register  to your Account
                    </Text>
                </View >

                <View style={{ marginTop: 30 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                        <Ionicons style={{ marginLeft: 10, }} name="person" size={24} color="grey" />
                        <TextInput value={name} onChangeText={(text) => setName(text)} style={{ color: "grey", marginVertical: 10, width: 250, fontSize: name ? 16 : 16 }} placeholder='enter your Name' />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                        <MaterialIcons style={{ marginLeft: 10, }} name="email" size={24} color="grey" />
                        <TextInput value={email} onChangeText={(text) => setEmail(text)} style={{ color: "grey", marginVertical: 10, width: 250, fontSize: email ? 16 : 16 }} placeholder='enter your Email' />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                        <AntDesign style={{ marginLeft: 10, }} name="lock" size={24} color="grey" />
                        <TextInput value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} style={{ color: "grey", marginVertical: 10, width: 250, fontSize: password ? 16 : 16 }} placeholder='enter your Password' />
                    </View>
                </View>

                <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text>keep me logged in</Text>
                    <Text style={{ color: "#007FFF", fontWeight: 500 }}>Forget Password</Text>
                </View>

                <View style={{ marginTop: 80 }} />
                <Pressable onPress={handleRegister} style={{ width: 200, backgroundColor: "#FEBE10", borderRadius: 5, marginLeft: "auto", marginRight: "auto", padding: 15 }}>
                    <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>Register</Text>
                </Pressable>
                <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 15, }}>
                    <Text style={{ textAlign: "center", color: "grey", fontSize: 16 }}>
                        Already have an account ? Sign In
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})