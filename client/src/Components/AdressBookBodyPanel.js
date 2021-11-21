import { Box, Grid } from '@mui/material'
import React, { useContext } from 'react'

import useAddressBookBodyPanelStyles from './styles/addressBookBodyPanelStyles.js'
import { ContactsContext } from './AppLayout.js'
import ContactCard from './ContactCard.js'
import { InfoAlert } from './InfoAlert.js'

const AddressBookBodyPanel = () => {

    const classes = useAddressBookBodyPanelStyles()
    const contactsData = useContext(ContactsContext)
    

    return (
        <>
            <Box className={classes.contactPanelContainer}>
                <Box className={classes.internalFrame}>
                    <InfoAlert messageText={contactsData.infoAlert.message}
                        showMessage={contactsData.infoAlert.showInfoAlert}/>
                    <Grid container spacing={1} className={classes.gridLayout}>
                        {contactsData.filteredAndSortedContacts.map((contact)=>(                    
                                <Grid key={contact._id} item xs={12} md={6} lg={4} xl={3}
                                    minWidth="350px" className={classes.griditem}>
                                        <ContactCard contact={contact}/>
                                </Grid>                        
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default AddressBookBodyPanel