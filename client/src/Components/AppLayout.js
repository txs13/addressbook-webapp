import React, { useState, useMemo } from 'react'
import { Grid, CssBaseline, Typography, Box } from '@mui/material'
import axios from 'axios'

import MainNavBar from './MainNavBar.js'
import ContactDetailsCard from './ContactDetailsCard.js'
import AddressBookBodyPanel from './AdressBookBodyPanel.js'
import useAppStyles from './styles/appStyles.js'
import { SERVER_URL, SERVER_PORT, CONTACTS_API } from '../api/server.js'
import { sortAndFilter, sortingOptions} from './sortAndFilter.js'
import contactToText from './contactToText.js'

const client = axios.create({
    baseURL: `${SERVER_URL}:${SERVER_PORT}${CONTACTS_API}`,
    timeout: 1000
})

const options = {
    headers: {"content-type":"application/json"}
}

export const ContactsContext = React.createContext()

const AppLayout = () => {

    const classes = useAppStyles()
    const [allContacts, setAllContacts] = useState([])
    const [filteredAndSortedContacts, setFilteredAndSortedContacts] = useState([])
    const [initiateAllContactsUpdate, setInitiateAllContactsUpdate] = useState(true)
    const [contactToBeShown, setContactToBeShown] = useState({updateContact: false, contact: {}})
    const [searchSortValues, setSearchSortValues] = useState(
        {
            search: "",
            sort: sortingOptions[1].value
        })
    const [infoAlert, setInfoAlert] = useState({message: "", showInfoAlert: false})


    useMemo(()=>{
        if (infoAlert.message !== "" && infoAlert.showInfoAlert) {
            setTimeout(()=>{
                setInfoAlert({message: "", showInfoAlert: false})
            }, 2500)
        }
    },[infoAlert])

    useMemo(()=>{
        
            setFilteredAndSortedContacts(sortAndFilter(allContacts, searchSortValues.search, searchSortValues.sort))
    
    },[searchSortValues, allContacts])

    useMemo(()=>{
        if (initiateAllContactsUpdate) {
            client.get('/',options)
                .then((res)=> {
                    const data = res.data
                    setAllContacts(data.contacts)
                })
                .then(()=>{
                    setInitiateAllContactsUpdate(false)
                })
                .catch((error) => {
                    console.log(error)
                    //somewhen floating error window for the user is supposed to be called here
                })
        }
    },[initiateAllContactsUpdate])

    const handleCreateContact = (contact) => {
        client.post('/', contact, options)
            .then((res)=>{
                console.log(res);
            })
            .then(()=>{
                setInitiateAllContactsUpdate(true)
            })
            .catch((error)=>{
                console.log(error);
                //somewhen floating error window for the user is supposed to be called here
            })
    }

    const handleLikeContact = (contact) => {
        let updatedContact = {...contact, searchesCount: contact.searchesCount+1}
        client.patch(`/${contact._id}`, updatedContact, options)
            .then((res)=>{
                setInitiateAllContactsUpdate(true)
            })
            .catch((error)=>{
                console.log(error);
                //somewhen floating error window for the user is supposed to be called here
            })
    }

    const handleViewDetails = (contact) => {
        setContactToBeShown({
            updateContact: true,
            contact: contact
        })
        handleLikeContact(contact)
    }


    const handleDeleteContact = (contact) => {
        client.delete(`/${contact._id}`, options)
            .then((res)=>{
                setInitiateAllContactsUpdate(true)
            })
            .catch((error)=>{
                console.log(error);
                //somewhen floating error window for the user is supposed to be called here
            })
    }


    const handleSaveContact = (contact) => {
        client.patch(`/${contact._id}`, contact, options)
            .then((res)=>{
                setInitiateAllContactsUpdate(true)
            })
            .catch((error)=>{
                console.log(error);
                //somewhen floating error window for the user is supposed to be called here
            })

    }

    const handleSearchSortInput = (e) => {
        const fieldName = e.target.name
        const value = e.target.value
        setSearchSortValues({...searchSortValues,[fieldName]:value})
    }

    const handleShareButtonClick = (contact) => {
        const contactText = contactToText(contact)   
        let data = [new window.ClipboardItem({ "text/plain": new Blob([contactText], { type: "text/plain" }) })]
        navigator.clipboard.write(data)
            .then(()=>{
                setInfoAlert({
                    message:"Contact details are copied to the clipboard!",
                    showInfoAlert: true})
            })
            .catch((error)=>{
                console.log(error);
                //error message handler to be called here somewhen
            })
    }

        return (
        <>
        <Box className={classes.wholeApp}>
            <ContactsContext.Provider
                value={{
                    handleCreateContact,
                    filteredAndSortedContacts,
                    handleLikeContact,
                    handleViewDetails,
                    handleDeleteContact,
                    handleSaveContact,
                    setSearchSortValues,
                    infoAlert,
                    handleShareButtonClick
                }}>
                <CssBaseline />
                <MainNavBar
                    searchSortValues={searchSortValues}
                    setSearchSortValues={setSearchSortValues}
                    handleSearchSortInput={handleSearchSortInput}
                    sortingOptions={sortingOptions}
                />
                <main>
                    <Box className={classes.mainFrame}>
                        
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={6} md={5} lg={4} xl={3}
                                className={classes.contactDetailsPanel}>
                                <ContactDetailsCard
                                    contactToBeShown={contactToBeShown}
                                    setContactToBeShown={setContactToBeShown} 
                                />
                            </Grid>    
                            <Grid item xs={12} sm={6} md={7} lg={8} xl={9}
                                className={classes.contactsPanel}>
                                <AddressBookBodyPanel />
                            </Grid>    
                        </Grid>
                    </Box>
                </main>
                <footer>
                    <CssBaseline />
                    <Box className={classes.footer}>
                    <Typography variant="body1" align="left" color="common.white">
                        Created by Txs
                    </Typography>
                    <Typography variant="subtitle2" align="left" gutterBottom color="common.white">
                        This is a demo addressbook web app for my portfolio.
                    </Typography>
                    </Box>
                </footer>
            </ContactsContext.Provider>
        </Box>    
        </>
    )
}

export default AppLayout