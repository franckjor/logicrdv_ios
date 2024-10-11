import React, { useEffect } from 'react'
import ContainerScreen from '../../components/wrappers/ContainerScreen'
import { Image, ScrollView, View } from 'react-native'
import CustomText from '../../components/global/CustomText'
import { colors } from '../../components/global/colors'
import { connect, useDispatch } from 'react-redux'
import { listMessagesRequest } from '../../redux/document/actions'
import MessageDetails from '../../components/Message/Message_Details'

const Message = ({ listMessages, isLoading }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listMessagesRequest());
  }, []);
  return (
    <ContainerScreen isLoading={isLoading}>
      {
        listMessages && listMessages.list && listMessages.list.length > 0  ? (
          <>
          {
            listMessages.list.map((message, index) => (
              <MessageDetails 
              key={index}
              datetime={message.datetime}
              file={message.file}
              from={message.from}
              to={message.to}
              subject={message.subject}
              />
            ))
          }
          </>
        ) : (
          <View style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/images/favicon.jpg')} style={{ width: 25, height: 25, borderRadius: 5 }} />
            <CustomText color={colors.blue}>Aucune donnée disponible</CustomText>
          </View>
        )
      }

    </ContainerScreen >
  )
}

const mapStateToProps = ({ MessageReducer }) => ({
  listMessages: MessageReducer.listMessages,
  isLoading: MessageReducer.isLoading,
});

export default connect(mapStateToProps)(Message);
