import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { UserType } from '../UserContext';

const AddressScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNO] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const { userId, setUserId } = useContext(UserType)
    useEffect(() => {
        const fetchUser = async() => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId)
        }
        fetchUser();
    }, []);
    console.log(userId)
    const handleAddAddress = () => {
        const address = {
            name,
            mobileNo,
            houseNo,
            street,
            landmark,
            postalCode,
        }
       // axios.post("http://172.20.10.2:8000/addresses", { userId, address }).then((response) => {

         axios.post("http://192.168.1.11:8000/addresses", { userId, address }).then((response) => {
            Alert.alert("Success", "Addresses added successfully");
            setName("");
            setMobileNo("");
            setHouseNO("");
            setStreet("");
            setLandmark("");
            setPostalCode("");

            setTimeout(() => {
                navigation.goBack();    
            }, 500);
        }).catch((error) => {
            Alert.alert("Error", "Failed to add address")
            console.log("error", error)
        })
    
    }
    return (
        <ScrollView style={{ marginTop: 50 }}>
            <View style={{ height: 50, backgroundColor: "#00CED1" }} />
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Add a new Address</Text>
                <TextInput placeholder='India' placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Full Name (First and Last name)</Text>
                    <TextInput value={name} onChangeText={(text) => setName(text)} placeholder='enter your name' placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Mobile no</Text>
                    <TextInput value={mobileNo} onChangeText={(text) => setMobileNo(text)} placeholder='mobile no' placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Flat,House No,Building,Company</Text>
                    <TextInput value={houseNo} onChangeText={(text) => setHouseNO(text)} placeholder='' placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Area,Street,sector,village</Text>
                    <TextInput value={street} onChangeText={(text) => setStreet(text)} placeholder='' placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
                    <TextInput value={landmark} onChangeText={(text) => setLandmark(text)} placeholder='Eg: nrear HSR ' placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>
                    <TextInput value={postalCode} onChangeText={(text) => setPostalCode(text)} placeholder='Enter pincode ' placeholderTextColor={"black"} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>
                <Pressable onPress={handleAddAddress} style={{ backgroundColor: "#FFC72C", padding: 10, borderRadius: 6, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                    <Text style={{ fontWeight: "bold", }}>
                        Add Address
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default AddressScreen

const styles = StyleSheet.create({})