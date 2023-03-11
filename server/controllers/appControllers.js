import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';

export async function signup(req, res) {
  try {
    const { email, password } = req.body;

    const existUsername = await UserModel.findOne({ email }).catch((err) => {
      console.log(err);
      res.status(500).send({ err });
    });

    if (!existUsername) {
      if (password) {
        bcrypt
          .hash(password, 10)
          .then((hashedPassword) => {
            const user = new UserModel({
              email,
              password: hashedPassword,
            });

            user
              .save()
              .then((result) => {
                res.status(201).send({ msg: 'User Register Succesfully' });
              })
              .catch((err) => {
                res.status(500).send({ err });
              });
          })
          .catch((err) => {
            return res.status(500).send({ err: 'Enable to hashed passwod' });
          });
      }
    } else {
      return res.status(500).send({ msg: 'error' });
    }
  } catch (error) {
    // internal server error
    res.status(500).send(error);
  }
}
