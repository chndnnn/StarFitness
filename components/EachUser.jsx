import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const EachUser = ({ user, onPress, search ,setSearchQuery}) => {

  const router = useRouter()

  if (!user) {
    return null; // Guard against rendering if user is undefined
  }

  // Function to handle user press
  function onPress(user) {
    router.push({ pathname: "/AllUsersScreen", params: { id: user._id } });
  }

  // Format end date
  const formattedEndDate = new Date(user.endDate).toLocaleDateString('en-GB', {
    day: '2-digit',  // Two-digit day (e.g., 15)
    month: 'short',   // Full month name (e.g., March)
    year: 'numeric', // Full year (e.g., 2025)
});

  return (
    <TouchableOpacity
      style={[
        styles.userContainer, 
        search && styles.searchContainer // Apply additional styles when search is true
      ]}
      onPress={() => onPress(user)}
    >
      <Text style={[styles.userText, search && styles.searchText]}>{user?.name}</Text>
      <Text style={[styles.userText, search && styles.searchText]}>{formattedEndDate}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5, // Default border radius
  },
  searchContainer: {
    borderColor: "green", // Green border when search is true
    backgroundColor: "#f0f8ff", // Light blue background when search is true
    borderRadius: 15, // Round the borders more when search is true
  },
  userText: {
    fontSize: 16,
    color: "#333",
  },
  searchText: {
    color: "green", // Change text color to green when search is true
  },
});

export default EachUser;
