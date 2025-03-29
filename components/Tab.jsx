import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useUser } from "../UserContext";

const Tab = ({setTab}) => {
  // State to track the selected tab
  const [selectedTab, setSelectedTab] = useState("allUsers");
  const { toggle } = useUser();

  // useEffect(()=>{
  //   setSelectedTab("allUsers")
  // },[toggle])

  // Function to handle tab selection
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    setTab(tab)
  };

  return (
    <View style={styles.tabContainer}>
      {/* Tab 1: All Users */}
      <TouchableOpacity
        style={[
          styles.tab,
          { backgroundColor: "#34D399" },
          selectedTab === "allUsers" && styles.selectedTab, // Underline if selected
        ]}
        onPress={() => handleTabPress("allUsers")}
      >
        <Text style={styles.tabText}>All Users</Text>
      </TouchableOpacity>

      {/* Tab 2: Deadline Approaching */}
      <TouchableOpacity
        style={[
          styles.tab,
          { backgroundColor: "#FBBF24" },
          selectedTab === "deadline" && styles.selectedTab, // Underline if selected
        ]}
        onPress={() => handleTabPress("deadline")}
      >
        <Text style={styles.tabText}>Deadline Approaching</Text>
      </TouchableOpacity>

      {/* Tab 3: Defaulters */}
      <TouchableOpacity
        style={[
          styles.tab,
          { backgroundColor: "#EF4444" },
          selectedTab === "defaulters" && styles.selectedTab, // Underline if selected
        ]}
        onPress={() => handleTabPress("defaulters")}
      >
        <Text style={styles.tabText}>Defaulters</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Spaces tabs evenly
    marginTop: 10,
    paddingHorizontal: 1, // Padding for container
  },
  tab: {
    paddingVertical: 8, // Vertical padding for the tabs
    paddingHorizontal: 12, // Horizontal padding for the tabs
    borderRadius: 8, // Rounded corners for the tabs
    alignItems: "center", // Center the text horizontally
    justifyContent: "center", // Center the text vertically
    elevation: 4, // Add shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  tabText: {
    color: "#FFFFFF", // White color for text
    fontSize: 14, // Font size for text
    fontWeight: "bold", // Make text bold
  },
  selectedTab: {
    borderBottomWidth: 3, // Underline width
    borderBottomColor: "#000", // Underline color (white)
  },
});

export default Tab;
