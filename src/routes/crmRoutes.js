import {
    addNewContact,
    deleteContactById,
    getAllContacts,
    getContactById,
    updateContactById
} from "../controllers/crmController";
import {loginRequired, loginUser, registerUser} from "../controllers/userController";

const routes = (app) => {
    app.route('/contact')
        .get(
            (req, res, next) => {
                // middleware
                console.log(`Request from ${req.originalUrl}`);
                console.log(`Request type ${req.method}`);
                next();
            },
            loginRequired,
            getAllContacts
        )
        .post(
            loginRequired,
            addNewContact
        );


    app.route('/contact/:contactId')
        .get(
            loginRequired,
            getContactById
        )
        .put(
            loginRequired,
            updateContactById
        )
        .delete(
            loginRequired,
            deleteContactById
        );

    app.route('/register')
        .post(
            registerUser
        );

    app.route('/login')
        .post(
            loginUser
        );
}

export default routes;
