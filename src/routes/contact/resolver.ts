import { Request, Response } from "express";
import BaseController from "../base";
import Contact from '../../models/contact';

class ContactController extends BaseController {
  /**
   *
   */
  constructor() {
    super();
    
  }

  deleteContact = async (req: Request, res: Response) => {
    try {
      console.log(req.params)
      const id: string = req.params.id;
      const contact = await Contact.findOneAndDelete({ _id: id });

      res.status(200).json({
        contact,
        status: 'success',
        msg: 'contact deleted'
      })
      
    } catch (error) {
      this.failed(res, error)
    }
  }

  updateContact = async (req: Request, res: Response) => {
    try {
      console.log(req.params)
      const id: string = req.params.id;

      const contact = await Contact.findOneAndUpdate(
        { _id: id },
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          middle_name: req.body.middle_name,
          address: req.body.address,
          title: req.body.title,
          contact_number: req.body.contact_number,
          email: req.body.email
        },
        { new: true }
      );

      res.status(200).json({
        contact,
        status: 'success',
        msg: 'contact updated'
      })
      
    } catch (error) {
      this.failed(res, error)
    }
  }

  createContact = async (req: Request, res: Response) => {
    try {
      const user = await Contact.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({
          status: 'failed',
          msg: `Email ${req.body.email} already exist`
        })
      }

      const payload = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        middle_name: req.body.middle_name,
        address: req.body.address,
        title: req.body.title,
        contact_number: req.body.contact_number,
        email: req.body.email,
        avatar: req.body.avatar,
        password: req.body.password,
      };

      const contact = await Contact.create(payload);

      res.status(200).json({
        contact,
        status: 'success',
        msg: 'contact saved'
      })
      
    } catch (error) {
      this.failed(res, error)
    }
  }

  getContacts = async (req: Request, res: Response) => {
    try {

      const contacts = await Contact.find();

      res.status(200).json({ 
        contacts,
        total: contacts.length,
        status: 'succcess',
        msg: 'contact list'
      })
      
    } catch (error) {
      
      res.status(400).json(error)
    }
  }

  getContact = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const contact = await Contact.findOne({ _id: id });

      console.log({ id, contact })

      res.status(200).json({ 
        contact,
        status: 'succcess',
        msg: 'single contact'
      })
      
    } catch (error) {
      
      res.status(400).json(error)
    }
  }
}

export default ContactController;