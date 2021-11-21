import express from 'express'
import {
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} from '../controllers/contacts.js'


const router = express.Router()

router.route('/')
    .get(getAllContacts)
    .post(createContact)

router.route('/:id')
    .get(getContact)
    .patch(updateContact)
    .delete(deleteContact)

export default router