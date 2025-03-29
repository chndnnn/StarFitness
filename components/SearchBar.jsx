import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View, Text, ActivityIndicator } from "react-native";
import axios from "axios";
import EachUser from "./EachUser";
import { BASE_URL } from "../utils/userData";
// let BASE_URL = 'http://192.168.31.186:3001';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  let [showData,setShowData] = useState([])
  const [loading,setLoading] = useState(false)

  // Debounced API call function
  const searchUsers = async (searchTerm) => {
    setLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/starFitness/v1/searchUsersByName`, {
        params: { name: searchTerm }
      });
      setShowData(response.data); // Array of users that match the search term
    } catch (error) {
      console.error('Error searching users:', error.response ? error.response.data : error.message);
      setShowData([])
    }
    setLoading(false)
  };

  // Handle text change with debouncing
  const handleTextChange = (text) => {
    if(text == ""){
      setSearchQuery(text);
      setShowData([])
    }else{setSearchQuery(text);}
    
  };
 

  // Effect to handle debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        setDebouncedSearchQuery(searchQuery);
      }
    }, 1000); // Wait for 1 second before setting the debounced search query

    return () => {
      clearTimeout(timeoutId); // Cleanup timeout on every change
    };
  }, [searchQuery]);

  // Trigger API call when debounced query changes
  useEffect(() => {
    if (debouncedSearchQuery) {
      searchUsers(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);

  return (
    <View>
      <View className="flex flex-row items-center border border-black rounded-lg px-2">
        <TextInput
          className="flex-1 h-full text-black mt-2 mr-2"
          placeholder={"Search here"}
          onChangeText={handleTextChange}
          placeholderTextColor="black"
          value={searchQuery}
        />
        <Ionicons name="search" size={25} color="black" />
      </View>

      <View  className="mt-2 ">
        {loading?(
                       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                       <ActivityIndicator size="small" color="green" />
                       
                     </View>
                    ):showData.length>0 && showData.map((ele,i)=>{
          return <EachUser user={ele} key={i} search={true} />
        })}
      </View>
    </View>
  );
};

export default SearchBar;
