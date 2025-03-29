import { Stack } from "expo-router";
import {UserProvider} from './../UserContext'

// Import your global CSS file
import "../global.css"

const _Layout = () => {
  return (
    <UserProvider> 
         <Stack screenOptions={{ headerShown: false }}>
          </Stack>
    </UserProvider>
 
  );
};

export default _Layout;