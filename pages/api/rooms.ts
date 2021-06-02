// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../middleware/mongodb';
import Room from '../../models/room';

type Room = {
  name: string,
  id: string
}

type Data = {
  items: Room[]
}

export default connectDB((req: NextApiRequest, res: NextApiResponse<Data>) => {
  // if (req.method === 'GET') {
  //   res.status(200).send('req_method_not_supported');
  // }
  // if (req.method === 'POST') {
  //   return ();
  // }
  // res.status(200).json({
  //   items: [
  //     { name: 'Friends', id: 'f1' }
  //   ]
  // })
})

/*
const handler = async (req, res) => {
  if (req.method === 'POST') {
    // Check if name, email or password is provided
    const { name, email, password } = req.body;
    if (name && email && password) {
      try {
        // Hash password to store it in DB
        var passwordhash = await bcrypt.sign(password);
        var user = new User({
          name,
          email,
          password: passwordhash,
        });
        // Create new user
        var usercreated = await user.save();
        return res.status(200).send(usercreated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send('data_incomplete');
    }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);
*/
