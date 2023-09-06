import { ScrollView, StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { UserType } from '../UserContext';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';

const AddAddressScreen = () => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);
    const { userId, setUserId } = useContext(UserType)

    useEffect(() => {
        fetchAddresses();
    }, [])
    const fetchAddresses = async () => {
        try {
             const response = await axios.get(`http://192.168.1.13:8000/addresses/${userId}`)
           // const response = await axios.get(`http://172.20.10.2:8000/addresses/${userId}`)

            const { addresses } = response.data;
            setAddresses(addresses)
        } catch (error) {
            console.log("error", error)
        }
    };
    //refresh the addresses when the component comes into focus when we navigate back
    useFocusEffect(
        useCallback(()=>{
            fetchAddresses();
        },[])
    );
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
            <View style={{ backgroundColor: "#00CED1", padding: 10, flexDirection: "row", alignItems: "center" }}>
                <Pressable style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 7, gap: 10, backgroundColor: "white", borderRadius: 3, height: 38, flex: 1 }}>
                    <AntDesign style={{ paddingLeft: 10 }} name="search1" size={24} color="black" />
                    <TextInput placeholder='Search Amazon.in' />
                </Pressable>
                <Feather name="mic" size={24} color="black" />
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Address</Text>
                <Pressable onPress={() => navigation.navigate("Add")} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10, borderColor: "#D0D0D0", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, paddingHorizontal: 5, paddingVertical: 7 }}>
                    <Text>Add a new Address</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </Pressable>

                <Pressable>
                    {/* ALL THE ADDED Address */}
                    {addresses?.map((item, index) => (
                        <Pressable style={{ borderWidth: 1, borderColor: "#D0D0D0", padding: 10, flexDirection: "column", gap: 5, marginVertical: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item?.name}</Text>
                                <Entypo name="location-pin" size={24} color="red" />
                            </View>
                            <Text style={{ fontSize: 15, color: "#181818" }}>{item?.houseNo},{item?.landmark}</Text>
                            <Text style={{ fontSize: 15, color: "#181818" }}>{item?.street}</Text>
                            <Text style={{ fontSize: 15, color: "#181818" }}>India,Bangalore</Text>
                            <Text style={{ fontSize: 15, color: "#181818" }}> Phone No:{item?.mobileNo}</Text>
                            <Text style={{ fontSize: 15, color: "#181818" }}>Pincode:{item?.postalCode}</Text>
                            <View style={{flexDirection:"row",alignItems:"center",gap:10,marginTop:7}}>
                                <Pressable style={{ backgroundColor: "#F5F5F5", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, borderWidth: 0.9, borderColor: "#D0D0D0" }}>
                                    <Text>Edit</Text>
                                </Pressable>
                                <Pressable style={{ backgroundColor: "#F5F5F5", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, borderWidth: 0.9, borderColor: "#D0D0D0" }}>
                                    <Text>Remove</Text>
                                </Pressable>
                                <Pressable style={{ backgroundColor: "#F5F5F5", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, borderWidth: 0.9, borderColor: "#D0D0D0" }}>
                                    <Text>Set as Default</Text>
                                </Pressable>
                            </View>
                        </Pressable>
                    ))}
                </Pressable>
            </View>

        </ScrollView>
    )
}

export default AddAddressScreen

const styles = StyleSheet.create({})