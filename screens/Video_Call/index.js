import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { OTSession, OTPublisher, OTSubscriber, OTSubscriberView } from 'opentok-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../components/global/colors';
import CustomText from '../../components/global/CustomText';

const VideoCall = ( {route} ) => {
  const navigation = useNavigation();
  const { paiement } = route.params;
  const titlecall = paiement?.appt?.description
  const concerner = paiement?.appt?.patient
  const apiKey = paiement?.tokbox?.apiKey;
  const sessionId = paiement?.tokbox?.sessionId;
  const token = paiement?.tokbox?.token;
  const doctorName = paiement?.appt?.doctor
  

  const [subscriberIds, setSubscriberIds] = useState([]);
  const [localPublishAudio, setLocalPublishAudio] = useState(true);
  const [localPublishVideo, setLocalPublishVideo] = useState(true);
  const [join, setJoinCall] = useState(false);
  const [streamProperties, setStreamProperties] = useState({});
  const [publisherProperties, setPublisherProperties] = useState({ cameraPosition: 'front' });
  const [callDuration, setCallDuration] = useState(0);


  useEffect(() => {
    let startTime = 0;
    const interval = setInterval(() => {
      startTime += 1000; 
      setCallDuration(Math.floor(startTime / 1000)); 
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const removeWordFromString = (inputString, wordToRemove) => {
    const wordsArray = inputString.split(" ");
    const filteredArray = wordsArray.filter(word => word !== wordToRemove);
    const resultString = filteredArray.join(" ");
  
    return resultString;
  };


  const renderCallInfo = () => {
    return (
      <View style={styles.callInfoContainer}>
        <Text style={styles.mytitle}>{titlecall} :</Text>
        <Text style={styles.doctorName}> Entre {removeWordFromString(doctorName , "Avec")} et {removeWordFromString(concerner , "Pour")} </Text>
        <Text style={styles.callDuration}>{formatCallDuration(callDuration)}</Text>
      </View>
    );
  };

  const formatCallDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };



  const sessionEventHandlers = {
    streamCreated: (event) => {
      const newStreamProperties = {
        ...streamProperties,
        [event.streamId]: {
          subscribeToAudio: true,
          subscribeToVideo: true,
          preferredResolution: { width: 1280, height: 720 },
        },
      };
      setStreamProperties(newStreamProperties);
      setSubscriberIds([...subscriberIds, event.streamId]);
    },
    streamDestroyed: (event) => {
      const indexToRemove = subscriberIds.indexOf(event.streamId);
      if (indexToRemove !== -1) {
        const newSubscriberIds = [...subscriberIds];
        newSubscriberIds.splice(indexToRemove, 1);
        setSubscriberIds(newSubscriberIds);
      }
      const newStreamProperties = { ...streamProperties };
      delete newStreamProperties[event.streamId];
      setStreamProperties(newStreamProperties);
    },
    error: (error) => {
      console.log('session error:', error);
    },
    otrnError: (error) => {
      console.log('Session otrnError error:', error);
    },
    sessionDisconnected: () => {
      setStreamProperties({});
      setSubscriberIds([]);
    },
  };

  const publisherEventHandlers = {
    streamCreated: (event) => {
      console.log('Publisher stream created!', event);
    },
    streamDestroyed: (event) => {
      console.log('Publisher stream destroyed!', event);
    },
    audioLevel: (event) => {
    },
  };

  const subscriberEventHandlers = {
    connected: () => {
      console.log('[subscriberEventHandlers - connected]');
    },
    disconnected: () => {
      console.log('[subscriberEventHandlers - disconnected]');
    },
    error: (error) => {
      console.log('subscriberEventHandlers error:', error);
    },
  };

  const toggleAudio = () => {
    setLocalPublishAudio(!localPublishAudio);
    setPublisherProperties({
      ...publisherProperties,
      publishAudio: !localPublishAudio,
    });
  };

  const toggleVideo = () => {
    setLocalPublishVideo(!localPublishVideo);
    setPublisherProperties({
      ...publisherProperties,
      publishVideo: !localPublishVideo,
    });
    console.log('Video toggle', publisherProperties);
  };

  const toggleCamera = () => {
    const newCameraPosition = publisherProperties.cameraPosition === 'front' ? 'back' : 'front';
    setPublisherProperties({ ...publisherProperties, cameraPosition: newCameraPosition });
  };

  const endCall = () => {
      navigation.navigate('Paiement');
  };

  const renderSubscribers = (subscribers) => {
    if (subscribers.length > 0) {
      const streamId = subscribers[0]; 
      return (
        <>
          <OTSubscriberView
            streamId={streamId}
            key={streamId}
            style={{width: '100%', height: '70%', }}
          />
          <View style={styles.callInfo}>
            {renderCallInfo()}
          </View>
        </>
      );
    } else {
      return (
        <View style={styles.CallName}>
          <Text style={styles.DR}> { removeWordFromString (doctorName, "Avec")} </Text>
          <Text style={styles.wait}> En attente de réponse... </Text>
        </View>
      );
    } 
  };
  

  const videoView = () => {
    return (
        <>
          <View style={styles.chiffrement}>
            <Icon
              style={{ color: colors.gray }}
              name='lock-outline'
            />
            <CustomText fontSize={14} style={{ color: colors.gray }}> Chiffré de bout en bout</CustomText>
          </View>
          <View style={styles.fullView}>
            <OTSession
              apiKey={apiKey}
              sessionId={sessionId}
              token={token}
              eventHandlers={sessionEventHandlers}>
              <OTPublisher
                properties={publisherProperties}
                eventHandlers={publisherEventHandlers}
                style={styles.publisherStyle}
              />
              <OTSubscriber
                eventHandlers={subscriberEventHandlers}
                streamProperties={streamProperties}>
                {renderSubscribers}
              </OTSubscriber>
            </OTSession>
          </View>
  
          <View style={styles.buttonView}>
            <View style={styles.circularIconContainer}>
              <Icon
                style={styles.allicon}
                name={localPublishAudio ? 'mic' : 'mic-off'}
                onPress={toggleAudio}
              />
            </View>
            <View style={styles.circularIconContainer}>
              <Icon
                name="flip-camera-ios"
                style={styles.allicon}
                onPress={toggleCamera}
              
              />
            </View>
            <View style={styles.circularIconContainer}>
              <Icon
                style={styles.allicon}
                name={localPublishVideo ? 'videocam' : 'videocam-off'}
                onPress={toggleVideo}
              />
            </View>
            <View style={styles.phoneend }>
              <Icon
                style={styles.allicon }
                name="call-end"
                onPress={endCall}
              />
            </View>
          </View>
        </>
      );
  };

 

  return  videoView() ;
};

const styles = StyleSheet.create({
    buttonView: {
      height: 50,
      backgroundColor: 'transparent', 
      display: 'flex',
      width: '100%',
      position: 'absolute',
      bottom: 10,
      left: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      marginVertical:5,
    },
   
    fullView: {
      flex: 1,
    },
    publisherStyle: {
      position: 'absolute',
      width: 150,
      height: 200,
      bottom:70,
      right: 5,
  
    },
   
    circularIconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderRadius: 35,
      backgroundColor:  '#C0C0C0',
      marginHorizontal: 10,
    },
    phoneend :{
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderRadius: 35,
      backgroundColor:  '#ff0000',
      marginHorizontal: 10,
    },
    allicon:{
      paddingHorizontal:4,
      paddingVertical:2,
      color: '#fff',
      fontSize: 30,
    },
    chiffrement:{
      position:"absolute",
      borderRadius:10,
      top:20,
      backgroundColor:colors.white,
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"row",
      marginVertical:4,
      color:colors.gray500,
      height:20,
      width:"100%"
    },
    CallName:{
      justifyContent:"center",
      alignItems:"center",
      flex:1,
    },
    DR:{
      color: "#000",
      fontSize:18,
      fontWeight:"bold",
    },
    wait:{
      fontSize:13,
      color:colors.gray500
    },
    callInfo:{
      position: 'absolute',
      bottom: 90,
      left: 10,
      width:"50%",
    },
    doctorName: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#333333',
      textAlign: "center",
    },
    callDuration: {
      fontSize: 14,
      color: '#666666',
      textAlign: "center",
    },
    mytitle:{
      fontSize: 14,
      color: colors.blue,
      textAlign: "center"
    }
  });

export default VideoCall;