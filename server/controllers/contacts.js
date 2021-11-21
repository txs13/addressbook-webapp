import asyncWrapper from "../helpers/async-wrapper.js"
import Contact from "../models/Contact.js"
import { createCustomError } from '../error/custom-error.js'
import mongoose from 'mongoose' 

export const getAllContacts = asyncWrapper( async (req,res,next)=>{
    const contacts = await Contact.find({})
    res.status(200).json({contacts})
})

export const createContact = asyncWrapper( async (req, res, next) => {
    //console.log(req.body);
    const { id, name, familyName, companyName, position, primaryNumber, secondaryNumber, primaryEmail,
            secondaryEmail, primaryAddress, secondaryAddress} = req.body
    if (!id) {
        const newContact = new Contact({ name, familyName, companyName, position, primaryNumber,
            secondaryNumber, primaryEmail, secondaryEmail, primaryAddress, secondaryAddress})    
        try {
            await Contact.create(newContact)
            res.status(201).json({status:"SUCCESS"})     
        } catch (error) {
            return next(createCustomError(`Error has occured while creating the new contact: ${error}`, 500))    
        }
    } else {
        return next(createCustomError(`New contact already contains id=${id} which is whrong!`, 500))
    }
    
    const contacts = await Contact.find({})
})

export const getContact = asyncWrapper( async (req, res, next) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({status: `Id ${id} is not valid`})
    }
    const contact = await Contact.findById(id)

    if (!contact) {
        return next(createCustomError(`No contact with id ${id}`,404))
    }

    res.status(201).json(contact)

})

export const updateContact = asyncWrapper( async (req, res, next) => {
    const id = req.params.id
    const updatedContact = req.body
    //console.log(id,updatedContact);
      
    Contact.findByIdAndUpdate(id, updatedContact, (error, contact) => {
        if (error) {
            //console.log(error);
            return next(createCustomError(`Update of the contact id${id} failed with the error ${error}`,500))
        } else {
            //console.log(contact);
            res.status(201).json({status:"SUCCESS"})      
        }
    })
})

export const deleteContact = asyncWrapper( async (req, res, next) => {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({status: `Id ${id} is not valid`})
    }

    const deletedContact = await Contact.findByIdAndDelete(id)
 
    if (!deletedContact) {
        return next(createCustomError(`No contact with id ${id}`,404))
    }
    // console.log(deletedContact)

    res.status(201).json({status:"SUCCESS"})
})