const User = require("../models/User");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    let { email, name, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
      throw new Error("이미 존재하는 유저입니다");
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({email, name, password: hash});
    await newUser.save();

    res.status(200).json({ status: 'success'})
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message});
  }
};

userController.loginWithEmail = async(req,res) => {
    try{
        const {email, password} = req.body;
        //이메일이 일치하는 유저가 있는지
        const user = await User.findOne({email});

        if(user){
            const isMatch = bcrypt.compareSync(password, user.password);
            if(isMatch){
                //토큰을 여기서 안만들고 models/User.js에서 만듦
                const token = await user.generateToken();
                return res.status(200).json({ status: 'success', user, token})
            }
            throw new Error('아이디가 일치하지 않습니다');
        }
    } catch(error){
        res.status(400).json({ status: 'fail', error: error.message});
    }
};

userController.getUser = async(req, res) => {
  try{
    const {userId} = req;
    const user = await User.findById(userId);
    if(!user) {
      throw new Error('can not find user');
    } res.status(200).json({ status: 'success', user});
  } catch(error) {
    res.status(400).json({ status: 'fail', error: error.message});
  }
}

module.exports = userController;
