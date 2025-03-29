import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import EachUser from "./EachUser";  // Assuming EachUser is your component that displays individual user info
import { useUser } from "../UserContext";
import { BASE_URL } from "../utils/userData";

// let BASE_URL = 'http://192.168.31.186:3001';

const UserList = ({ name }) => {
    const [userList, setUserList] = useState([]);
    const [loader, setLoader] = useState(false);
    const { toggle } = useUser();

    useEffect(() => {
        getAllUSers();
    },[]);

    // useEffect(()=>{
    //     getAllUSers();
    // },[toggle])

    useEffect(() => {
        if (name === "defaulters") {
            getAllUSersPlanExpired();
        } else if (name === "deadline") {
            getAllUSersEnding();
        } else {
            getAllUSers();
        }
    }, [name,toggle]);

    // Fetch all users
    async function getAllUSers() {
        setLoader(true);
        try {
            let data = await axios.get(`${BASE_URL}/starFitness/v1/getAllUsers`);
            setUserList(data.data);
        } catch (err) {
            console.log(err);
        }
        setLoader(false);
    }

    // Fetch expired users
    async function getAllUSersPlanExpired() {
        setLoader(true);
        try {
            let data = await axios.get(`${BASE_URL}/starFitness/v1/expired`);
            setUserList(data.data);
        } catch (err) {
            console.log(err);
        }
        setLoader(false);
    }

    // Fetch users with subscriptions ending soon
    async function getAllUSersEnding() {
        setLoader(true);
        try {
            let data = await axios.get(`${BASE_URL}/starFitness/v1/ending-soon`);
            setUserList(data.data);
        } catch (err) {
            console.log(err);
        }
        setLoader(false);
    }

    return (
        <View className='mt-2 p-1 '>
            {/* Header with User Count and Today's Date */}
            <View className='flex flex-row justify-between p-2'>
                <Text>MEMBERS: {userList.length}</Text>
                <Text>END DATE</Text>
            </View>

            {/* Show loader if data is being fetched */}
            {loader ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                // Using map instead of FlatList
                <View >
                    {userList.length === 0 ? (
                        <Text>No data found</Text>  // Display when no users are available
                    ) : (
                        userList.map((user) => <EachUser key={user._id} user={user} />)  // Iterate over the userList and render EachUser component
                    )}
                </View>
            )}
        </View>
    );
};


export default UserList;
