import React from 'react'
import {ButtonGroup, Button} from '@mui/material'

import useButtonBlockStyles from './styles/buttonBlockStyles.js'

    // state: 0 - create contact 1 - view contact 2 - edit contact
    // fullForm: true - full contact details false - short contact details  
const ButtonBlock = ({cardState, setCardState, handleCreateButtonClick, 
    handleEditButtonClick, handleClearButton, handleClickSaveButton,
    handleDeleteContact, handleShareButtonClick}) => {

    const classes = useButtonBlockStyles()

    return (
        <>
            <ButtonGroup variant="text" aria-label="text button group" 
                className={classes.buttonBlock} fullWidth>
                <Button
                    onClick={()=>handleCreateButtonClick()}
                    sx={{display: cardState.state === 0 ? "" : "none"}}>
                    Create</Button>
                <Button onClick={()=>handleClearButton()}>
                    Clear</Button>                    
                <Button onClick={()=>handleClickSaveButton()}
                    sx={{display: cardState.state === 2 ? "" : "none"}}>
                    Save</Button>
                <Button onClick={()=>handleEditButtonClick()}
                    sx={{display: cardState.state === 1 ? "" : "none"}}>
                    Edit</Button>
                <Button onClick={()=>handleShareButtonClick()}
                    sx={{display: cardState.state === 1 ? "" : "none"}}>
                    Share</Button>
                <Button onClick={()=>handleDeleteContact()}
                    sx={{display: cardState.state === 2 ? "" : "none"}}>
                    Delete</Button>    

                {cardState.fullForm ? (
                    <Button onClick={()=>setCardState({...cardState, fullForm: false})}>
                    Shorten</Button>
                ) : (
                <Button onClick={()=>setCardState({...cardState, fullForm: true})}>
                    Extend</Button>
                )}    
           
            </ButtonGroup>
        </>
    )
}

export default ButtonBlock