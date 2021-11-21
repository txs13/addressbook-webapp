import { makeStyles } from '@mui/styles'

const useAddressBookBodyPanelStyles = makeStyles((theme)=>({
    contactPanelContainer: {
        margin: '0px',
        [theme.breakpoints.up('md')]: {
            height: 'calc(100vh - 120px)',
            overflow: 'hide'
        } 
    },

    internalFrame: {
        [theme.breakpoints.up('md')]: {
            overflowY: 'scroll',
            height: '100%'
        }
    },

    gridLayout: {
        padding: '5px',
        
    },

    gridItem: {
        padding: '5px'
    }
}))

export default useAddressBookBodyPanelStyles