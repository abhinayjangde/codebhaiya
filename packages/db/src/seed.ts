import prisma from "./index";
// const createUser = async () => {
//     await prisma.user.create({
//         data:{
//             name:"Rakesh",
//             email:"rakesh@gmail.com",
//             password:"1234rk"
//         }
//     })
// }

// createUser().then(() => {
//     console.log("User Created")
// }).catch((err) => {
//     console.log(err)
// })

const showUsers = async () => {
    const users = await prisma.user.findMany();
    console.log(users);
}
showUsers()
    