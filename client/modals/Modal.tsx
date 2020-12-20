import React, { FC } from 'react'
import { Modal as ReactNativeModal } from 'react-native'
import Shadow from '../components/Shadow'

const Modal: FC<Props> = ({ visible, children, onClose }) => (
  <ReactNativeModal
    visible={visible}
    transparent
    statusBarTranslucent
    animationType="fade"
    onRequestClose={onClose}
  >
    <Shadow onPress={onClose} />

    {children}
  </ReactNativeModal>
)

interface Props {
  visible: boolean
  onClose: () => any
}

export default Modal
