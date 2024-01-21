import bcrypt from 'bcryptjs'

const user = [
    {
        name: 'Admin user',
        email: 'soufianeowner@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'samira lbyad',
        email: 'samiraHbiba@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'mouad hmamou',
        email: 'mouad123@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
]

export default user;