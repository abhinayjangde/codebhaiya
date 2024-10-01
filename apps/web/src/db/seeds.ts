import db from '../db';

// const createUser = async () => {
//     await db.user.create({
//         data: {
//             email: "abhi@gmail.com",
//             name: "Abhishek",
//             password: "password"
//         }
//     })
// }
// createUser().catch(console.error);

const getUsers = async () => {
    const users = await db.user.findMany()
    console.log(users)
}
getUsers().catch(console.error);
