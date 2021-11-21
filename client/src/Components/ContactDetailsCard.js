import React, { useState, useContext, useMemo, useEffect } from 'react'
import { Card, Typography, TextField, Box } from '@mui/material'

import ButtonBlock from './ButtonBlock.js'
import useContactDetailsCardStyles from './styles/contactDetailsCardStyles.js'
import { ContactsContext } from './AppLayout.js'

const defaultNewContactState = {
            id:undefined,
            name:"",
            familyName: "",
            companyName: "",
            position: "",
            primaryNumber: "",
            secondaryNumber:"",
            primaryEmail:"",
            secondaryEmail:"",
            primaryAddress:"",
            secondaryAddress:"",
            created:undefined,
            searchesCount:undefined}


const ContactDetailsCard = ({contactToBeShown, setContactToBeShown}) => {

    const classes = useContactDetailsCardStyles()
    const contactsData = useContext(ContactsContext)

    // state: 0 - create contact 1 - view contact 2 - edit contact
    // fullForm: true - full contact details false - short contact details  
    const [cardState, setCardState] = useState({state: 0, fullForm: false})
    const [contact, setContact] = useState(defaultNewContactState) 

    const handleChange = (e) => {
        const fieldName = e.target.name
        const value = e.target.value
        setContact({...contact,[fieldName]:value})
    }

    useMemo(()=>{
        if (contactToBeShown.updateContact) {
            setContact(contactToBeShown.contact)
        }
    },[contactToBeShown])

    useEffect(()=>{
        if (contactToBeShown.updateContact) {
            setContactToBeShown({updateContact: false, contact: {}})
            setCardState({...cardState, state: 1})
        }

    },[contactToBeShown, setContactToBeShown, cardState])


    const getReadOnlyState = (cardState) => {
        return {readOnly: cardState.state === 1 ? true : false,
            disabled: cardState.state === 1 ? true : false}
    }

    const getVisibilitySxState = (cardState) => {
        return {display: cardState.fullForm ? "" : "none"}
    }

    const handleCreateButtonClick = () => {
        contactsData.handleCreateContact(contact)
        setContact(defaultNewContactState)
        setCardState({...cardState, state: 0})
    }

    const handleEditButtonClick = () => {
        setCardState({...cardState, state: 2})
    }

    const handleClearButton = () => {
        setContact(defaultNewContactState)
        setCardState({...cardState, state: 0})
    }

    const handleClickSaveButton = () => {
        contactsData.handleSaveContact(contact)
        setCardState({...cardState, state: 1})
    }

    const handleDeleteContact = () => {
        contactsData.handleDeleteContact(contact)
        setContact(defaultNewContactState)
        setCardState({...cardState, state: 0})
    }

    const handleShareButtonClick = () => {
        contactsData.handleShareButtonClick(contact)
    }

    return (
        <>
            <Box className={classes.contactCardContainer}>
                <Card className={classes.inputCard} raised>
                    <Typography variant="h5" color="textPrimary" align="center">
                        {cardState.state === 0 ? "Create new contact" :
                        cardState.state === 1 ? "View contact" :
                        cardState.state === 2 ? "Edit contact" : "Error: wrong state value"}
                    </Typography>
                    <Box component="form" className={classes.inputBox} autoComplete="off">
                        <TextField required label="Name" fullWidth margin="dense" size="small"
                            name="name" value={contact.name} onChange={handleChange}
                            autoComplete="off"
                            inputProps={getReadOnlyState(cardState)}></TextField>
                        <TextField label="Family name" fullWidth margin="dense" size="small"
                            name="familyName" value={contact.familyName} onChange={handleChange}
                            autoComplete="off"
                            inputProps={getReadOnlyState(cardState)}></TextField>
                        <TextField label="Company name" fullWidth margin="dense" size="small"
                            name="companyName" value={contact.companyName} onChange={handleChange}
                            autoComplete="off"
                            inputProps={getReadOnlyState(cardState)}></TextField>
                        <TextField label="Position" fullWidth margin="dense" size="small"
                            name="position" value={contact.position} onChange={handleChange}
                            inputProps={getReadOnlyState(cardState)}
                            autoComplete="off"
                            sx={getVisibilitySxState(cardState)}></TextField>
                        
                        <Typography variant="h6" align="center">
                            {cardState.fullForm ? "Phone numbers" : "Phone number"}</Typography>
                        <TextField required label="Primary phone number" fullWidth margin="dense" size="small"
                            name="primaryNumber" value={contact.primaryNumber} onChange={handleChange}
                            autoComplete="off"
                            inputProps={getReadOnlyState(cardState)} type="tel"></TextField>
                        <TextField label="Secondary phone number" fullWidth margin="dense" size="small"
                            name="secondaryNumber" value={contact.secondaryNumber} onChange={handleChange}
                            autoComplete="off"
                            inputProps={getReadOnlyState(cardState)} type="tel"
                            sx={getVisibilitySxState(cardState)}></TextField>
                        
                        <Typography variant="h6" align="center">
                            {cardState.fullForm ? "Emails" : "Email"}</Typography>
                        <TextField required label="Primary email" fullWidth margin="dense" size="small"
                            name="primaryEmail" value={contact.primaryEmail} onChange={handleChange}
                            autoComplete="off"
                            inputProps={getReadOnlyState(cardState)} type="email"></TextField>
                        <TextField label="Secondary email" fullWidth margin="dense" size="small"
                            name="secondaryEmail" value={contact.secondaryEmail} onChange={handleChange}
                            inputProps={getReadOnlyState(cardState)}
                            autoComplete="off"
                            sx={getVisibilitySxState(cardState)} type="email"></TextField>
                        
                        <Typography variant="h6" align="center">
                            {cardState.fullForm ? "Addresses" : "Address"}</Typography>
                        <TextField label="Primary address" fullWidth margin="dense" size="small"
                            multiline autoComplete="off"
                            name="primaryAddress" value={contact.primaryAddress} onChange={handleChange}
                            inputProps={getReadOnlyState(cardState)}></TextField>
                        <TextField label="Secondary address" fullWidth margin="dense" size="small"
                            multiline autoComplete="off"
                            name="secondaryAddress" value={contact.secondaryAddress} onChange={handleChange}
                            inputProps={getReadOnlyState(cardState)}
                            sx={getVisibilitySxState(cardState)}></TextField>

                        <ButtonBlock
                            handleDeleteContact={handleDeleteContact}
                            handleClickSaveButton={handleClickSaveButton}
                            handleClearButton={handleClearButton}
                            handleEditButtonClick={handleEditButtonClick}
                            handleCreateButtonClick = {handleCreateButtonClick}
                            handleShareButtonClick = {handleShareButtonClick}
                            
                            cardState={cardState}
                            setCardState={setCardState}/>
                    </Box>
                </Card>
            </Box>
        </>
    )
}

export default ContactDetailsCard