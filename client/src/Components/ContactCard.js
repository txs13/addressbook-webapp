import React, {useContext} from 'react'
import { Grid, Card, Typography, CardContent,
    CardActions, Button, ButtonGroup } from '@mui/material'

import useContactCardStyles  from './styles/contactCardStyles.js'
import { ContactsContext } from './AppLayout.js'    

const ContactCard = ({contact}) => {
    
    const classes = useContactCardStyles()
    const contactsData = useContext(ContactsContext)
    
    return (
        <>
            <Card raised className={classes.shortCardContact}>
                <CardContent className={classes.shortCardContent}>
                    <Grid container>
                        <Grid item xs={5}>
                            <Typography>Name:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                        <Typography>{contact.name}</Typography>
                        </Grid>    
                        <Grid item xs={5}>
                            <Typography>Familyname:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                        <Typography>{contact.familyName}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography>Phone number:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                        <Typography>{contact.primaryNumber}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography>Email:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                        <Typography>{contact.primaryEmail}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography>Address:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                        <Typography>{contact.primaryAddress}</Typography>
                        </Grid>                                    
                    </Grid>
                </CardContent>
                <CardActions>
                    <ButtonGroup fullWidth variant="text" aria-label="text button group">
                        <Button onClick={()=>contactsData.handleShareButtonClick(contact)}>
                            Share</Button>
                        <Button onClick={()=>contactsData.handleViewDetails(contact)}>
                            Details</Button>
                        <Button onClick={()=>contactsData.handleLikeContact(contact)}>
                            Like ({contact.searchesCount})</Button>
                    </ButtonGroup>
                </CardActions>
            </Card>    
        </>
    )
}

export default ContactCard