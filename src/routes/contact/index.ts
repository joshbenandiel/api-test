import express, { Request, Response } from 'express'
import ContactsResolver from './resolver';

const router = express.Router();
const resolver = new ContactsResolver();

router.get('/list', resolver.getContacts);
router.get('/:id/info', resolver.getContact);
router.post('/create', resolver.createContact);
router.put('/:id/update', resolver.updateContact);
router.delete('/:id/delete', resolver.deleteContact)

export default router;