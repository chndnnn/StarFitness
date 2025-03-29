import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useUser } from '../UserContext';
import { BASE_URL } from '../utils/userData';

// Updated validation schema with price validation
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  number: Yup.string().matches(/^[0-9]+$/, 'Phone number is not valid').required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  price: Yup.number().required('Price is required').positive('Price must be a positive number'),
  startDate: Yup.date().required('Start date is required'),
  subscriptionDuration: Yup.string().required('Subscription duration is required'),
  endDate: Yup.date().required('End date is required'),
});

// let BASE_URL = 'http://192.168.31.186:3001'; // Change this to the correct API URL for your backend

const AddEditUser = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [subscriptionDuration, setSubscriptionDuration] = useState('1');
  const [userID,setUserId] = useState()
  const [formValues, setFormValues] = useState({
    name: '',
    number: '',
    address: '',
    price: '',
    startDate: new Date(),
    subscriptionDuration: '1',
    endDate: new Date(),
  });
  const { toggle,setToggle } = useUser();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState('SBI');

  useEffect(() => {
    if (user) {
      // Fetch the user data from the API
      fetchUserData(user);
    }
  }, [user]);

  // Fetch user details using API
  const fetchUserData = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/starFitness/v1/getUserDetails/${userId}`);
      const userData = response.data;

      // Set form values based on the fetched data
      setFormValues({
        name: userData.name,
        number: userData.number,
        address: userData.address,
        price: userData.price.toString(),
        startDate: new Date(userData.startDate),
        subscriptionDuration: userData.subscriptionDuration.toString(),
        endDate: new Date(userData.endDate),
      });

      // Update the selected dates
      setSelectedStartDate(new Date(userData.startDate));
      setSelectedEndDate(new Date(userData.endDate));
      setSubscriptionDuration(userData.subscriptionDuration.toString());
      setUserId(userData._id)
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert("Error", "Failed to fetch user data");
    }
    setLoading(false);
  };

  // Calculate End Date based on Start Date and Subscription Duration
  const calculateEndDate = (startDate, months) => {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + parseInt(months));
    return endDate;
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
    
      // Determine the request method (POST for new user, PUT for update)
      const requestMethod = user ? axios.post : axios.post;
      const url = user ? `${BASE_URL}/starFitness/v1/updateUser/${userID}` : `${BASE_URL}/starFitness/v1/createUser`;
      let ogData = {...values,subscriptionDuration:subscriptionDuration,startDate:selectedStartDate,endDate:selectedEndDate}

        await requestMethod(url, ogData);
      
      Alert.alert("Successful", user ? "User updated successfully" : "User registered successfully");
      router.back()
      // Reset the form if it's a new user
      if (!user) {
        resetForm();
      }
    } catch (err) {
      console.error('Error:', err);
  
      // Check if the error response has a message (from the backend)
      if (err.response && err.response.data && err.response.data.message) {
        // If error message exists, show it in the alert
        Alert.alert("Failed", err.response.data.message);
      } else {
        // If no specific message is provided, show a generic error
        Alert.alert("Failed", "Something went wrong");
      }
    } finally {
      setToggle(!toggle)
      setLoading(false);
    }
  };
  

  const handleStartDateChange = (event, date) => {
    setShowStartDatePicker(false);
    if (date) {
      setSelectedStartDate(date);
      const calculatedEndDate = calculateEndDate(date, subscriptionDuration); // Recalculate the end date
      setSelectedEndDate(calculatedEndDate);
    }
  };

  const handleEndDateChange = (event, date) => {
    setShowEndDatePicker(false);
    if (date) {
      setSelectedEndDate(date);
    }
  };

  const subscriptionDurations = ['1', '3', '6', '12'];

  useEffect(() => {
    // Ensure the end date is always calculated if subscriptionDuration is updated
    const calculatedEndDate = calculateEndDate(selectedStartDate, subscriptionDuration);
    setSelectedEndDate(calculatedEndDate);
  }, [subscriptionDuration, selectedStartDate]);

  if (loading) {
    return <Text className='text-white'>Loading...</Text>; // You can customize this loading state
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
         
        >
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            
              <Text style={styles.label}>Phone Number:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={handleChange('number')}
                onBlur={handleBlur('number')}
                value={values.number}
              />
              {touched.number && errors.number && <Text style={styles.errorText}>{errors.number}</Text>}

              <Text style={styles.label}>Address:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
              />
              {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

              <Text style={styles.label}>Price:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price}
              />
              {touched.price && errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

              <Text style={styles.label}>Start Date:</Text>
              <Button title={`Select Start Date: ${selectedStartDate ? selectedStartDate.toLocaleDateString() : 'Select Date'}`} onPress={() => setShowStartDatePicker(true)} />
              {showStartDatePicker && (
                <DateTimePicker
                  value={selectedStartDate}
                  mode="date"
                  display="default"
                  onChange={handleStartDateChange}
                />
              )}

              <Text style={{ ...styles.label, marginTop: 8 }}>Subscription Duration (months):</Text>
              <Picker
                selectedValue={subscriptionDuration}
                onValueChange={(itemValue) => {
                  setSubscriptionDuration(itemValue);
                }}
                style={styles.picker}
              >
                {subscriptionDurations.map((duration) => (
                  <Picker.Item key={duration} label={`${duration} Month${duration > 1 ? 's' : ''}`} value={duration} />
                ))}
              </Picker>

              <View style={{ marginBottom: 20 }}>
                <Text style={styles.label}>End Date:</Text>
                <Button title={`End Date: ${selectedEndDate ? selectedEndDate.toLocaleDateString() : 'Select Date'}`} onPress={() => setShowEndDatePicker(true)} />
                {showEndDatePicker && (
                  <DateTimePicker
                    value={selectedEndDate}
                    mode="date"
                    display="default"
                    onChange={handleEndDateChange}
                  />
                )}
              </View>

              {touched.subscriptionDuration && errors.subscriptionDuration && (
                <Text style={styles.errorText}>{errors.subscriptionDuration}</Text>
              )}

         <View style={styles.radioButtonsContainer}>
         <TouchableOpacity
            style={[styles.radioButton, selectedImage === 'SBI' && styles.selectedRadioButton]}
            onPress={() => setSelectedImage('SBI')}
          >
            <Text style={styles.radioButtonText}>SBI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, selectedImage === 'HDFC' && styles.selectedRadioButton]}
            onPress={() => setSelectedImage('HDFC')}
          >
            <Text style={styles.radioButtonText}>HDFC</Text>
          </TouchableOpacity>
          
        
         </View>
             {selectedImage == "SBI" ?  <Image source={require('../assets/images/SBI QR.jpeg')} style={styles.fixedImage} /> : <Image source={require('../assets/images/HDFC QR1.jpeg')} style={styles.fixedImage} />}
              <Button title={`${loading ? 'loading...' : 'save'}`} onPress={handleSubmit} style={styles.submitButton} />
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 100,
  },
  fixedImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#FFA500',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFA500',
    padding: 8,
    marginBottom: 8,
    color: '#FFF',
    backgroundColor: '#333',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  picker: {
    marginBottom: 16,
    backgroundColor: '#333',
    color: '#FFF',
  },
  submitButton: {
    marginTop: 16,
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    
  },
  radioButton: {
    padding: 5,
    width:60,
    marginBottom: 10,
    backgroundColor: '#ddd',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedRadioButton: {
    backgroundColor: '#007BFF', // Highlight color for selected button
  },
});

export default AddEditUser;
