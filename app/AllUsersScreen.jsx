import { View } from "react-native";
import AddEditUser from "../components/AddEditUser";
import { useLocalSearchParams, useRouter } from "expo-router";
import Back from "../components/icons/backicon";
import Delete from "../components/icons/Delete";
import { Alert } from "react-native";
import axios from "axios";
import { useUser } from "../UserContext";
import { BASE_URL } from "../utils/userData";
// let BASE_URL = 'http://192.168.31.186:3001';

const AllUsersScreen = () => {

  const { toggle,setToggle } = useUser();
   
   const router = useRouter()
   const {id} = useLocalSearchParams();
   const handleBackPress = () => {
    router.back()
   }

    const deleteUser = async (id) => {
       try {

         const confirm = await new Promise((resolve) => {
           Alert.alert(
             "Delete User",
             "Are you sure you want to delete this user?",
             [
               {
                 text: "Cancel",
                 onPress: () => resolve(false),
                 style: "cancel"
               },
               {
                 text: "OK",
                 onPress: () => resolve(true)
               }
             ]
           );
         });
   
         if (confirm) {

           const response = await axios.post(`${BASE_URL}/starFitness/v1/deleteUser/${id}`);

           
           // Handle the response after deletion
           if (response.status === 200) {
             Alert.alert("Success", "User deleted successfully.");
             router.back()
             // Optimistically remove the deleted user from the state (UI update)
            //  setUsers(users.filter(user => user._id !== id));
           }
         }
       } catch (error) {
         console.error('Error deleting user:', error.message);
         Alert.alert('Error', 'There was an error deleting the user.');
       }
       setToggle(!toggle)
     };

    return (
        <View className="flex-1 , p-2 , bg-black">
        <View className='flex flex-row justify-between px-2'>
        <Back onPress={handleBackPress}/>
        {id &&  <Delete onPress={()=>deleteUser(id)}/>}
       
        </View>
        <AddEditUser user={id} /> 
        
        </View>
    );
  };

export default AllUsersScreen