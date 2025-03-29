import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import NewUser from "../components/icons/addNewUser";
import SearchBar from "../components/SearchBar";
import Tab from "../components/Tab";
import { useState } from "react";
import UserList from "../components/UserList";
import { Button } from "react-native";
import axios from "axios";
import { BASE_URL } from "../utils/userData";
// let BASE_URL = 'http://192.168.31.186:3001';
// import * as XLSX from 'xlsx';
// import * as FileSystem from 'expo-file-system';

const Home = () => {
    const router = useRouter();
    const show = false;
    const [tab, setTab] = useState("AllUsers");
    const [userList,setUserList] = useState()

    function addUserClick() {
        router.push({ pathname: "/AllUsersScreen" });
    }

    async function getAllUSers() {
        try {
            let data = await axios.get(`${BASE_URL}/starFitness/v1/getAllUsers`);
            setUserList(data.data);
        } catch (err) {
            console.log(err);
        }
    }

   

    // const generatePDF = async () => {
    //     console.log("fetching user")
    //     await getAllUSers();
    //     console.log("User fetched");

    //     // Prepare the data for the Excel file
    //     const data = userList.map(member => ({
    //         Name: member.name,
    //         Phone: member.number,
    //         Address: member.address,
    //         Price: member.price,
    //         SubscriptionDuration: `${member.subscriptionDuration} months`,
    //         StartDate: new Date(member.startDate).toLocaleDateString(),
    //         EndDate: new Date(member.endDate).toLocaleDateString(),
    //     }));

    //     // Create a new workbook and add data to it
    //     const ws = XLSX.utils.json_to_sheet(data);
    //     const wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, "Members");

    //     // Generate Excel file as binary string
    //     const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    //     // Convert binary string to Base64 string
    //     const base64Excel = btoa(String.fromCharCode.apply(null, new Uint8Array(excelFile.length).map((_, i) => excelFile.charCodeAt(i))));

    //     // Get the file path and save the file to the device
    //     const fileUri = FileSystem.documentDirectory + "members_data.xlsx";

    //     try {
    //         // Save the file using FileSystem API
    //         await FileSystem.writeAsStringAsync(fileUri, base64Excel, { encoding: FileSystem.EncodingType.Base64 });
    //         Alert.alert('Success', `Excel file created at: ${fileUri}`);
    //     } catch (error) {
    //         console.error('Error creating Excel file:', error);
    //         Alert.alert("Error", "Failed to generate Excel file");
    //     }
    //   };
   

    return (
        <View className='p-1'>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header with New User Button */}
            <View className='flex flex-row items-center justify-between py-1'>
                <NewUser onPress={addUserClick} />
                
                <View className="flex flex-row">
                    <Text className='font-bold text-4xl text-orange-500'>S</Text>
                    <Text className='mr-2 font-bold text-4xl'>tar Fitness</Text>
                </View>
                {/* <Button title="backup" onPress={generatePDF}/> */}
            </View>

            {/* Search Bar */}
            <SearchBar />

            {/* Tabs */}
            <Tab setTab={setTab} />

            {/* User List */}
            <UserList name={tab} />

            {/* This is unwanted code */}
            {show && (
                <View className="flex flex-row items-center border border-black rounded-lg px-2">
                    <TextInput
                        className="flex-1 text-black mt-2 mr-2"
                        placeholder={"Search here"}
                        placeholderTextColor="black"
                    />
                </View>
            )}
            </ScrollView>
        </View>
    );
};

export default Home;
