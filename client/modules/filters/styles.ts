import { StyleSheet } from 'react-native'
import { white } from '~client/colors'

const styles = StyleSheet.create({
  header: {
    marginTop: 'auto',
    backgroundColor: white,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  title: {
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actions: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clear: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  content: {
    paddingBottom: 40,
  },
  section: {
    paddingTop: 24,
    paddingBottom: 12,
    paddingStart: 16,
    fontSize: 12,
    fontWeight: 'bold',
  },
  chips: {
    paddingStart: 16,
    paddingEnd: 8,
  },
})

export default styles
