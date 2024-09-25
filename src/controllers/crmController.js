import mongoose from 'mongoose';

import {ContactSchema} from "../models/crmModel";

var Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req, res) => {
    var newContact = new Contact(req.body);
    try {
        var contact = await newContact.save();
        // res.send(contact);         // why not
        res.json(contact);
    } catch (err) {
        res.status(400).send(err);
        // res.send(err);

    }
};

export const getAllContacts = async (req, res) => {
    try {
        var allContacts = await Contact.find({});
        // res.send(allContacts);
        res.json(allContacts);
    } catch (err) {
        res.status(400).send(err);
    }
};

export const getContactById = async (req, res) => {
    try {
        // var contact = await Contact.find({_id: req.params.contactId});
        var contact = await Contact.findById(req.params.contactId);
        // res.send(contact);
        res.json(contact);
    } catch (err) {
        res.status(400).send(err);
    }
}

export const updateContactById = async (req, res) => {
    try {
        // var contact = await Contact.find({_id: req.params.contactId});
        var contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });

        if(contact) {
            res.json(contact);
        } else {
            res.json({message: `Contact with id ${req.params.contactId} was not found`});
        }

    } catch (err) {
        res.status(400).send(err);
    }
}

export const deleteContactById = async (req, res) => {
    try {
        // var contact = await Contact.find({_id: req.params.contactId});
        var contact = await Contact.findByIdAndDelete(req.params.contactId);
        // res.send(contact);
        // res.json(contact);
        if(contact) {
            res.json({message: `Contact with id: ${contact.id} was deleted successfully.`});
        } else {
            res.json({message: `Contact with id: ${req.params.contactId} was not found`});
        }
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
}
