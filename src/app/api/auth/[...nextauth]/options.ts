import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import db from "@/lib/db"
import UserModel from "@/models/User"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: any = {
    providers: [
        Credentials({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any, req:any): Promise<any> {
                try {
                    await db()
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.email },
                            { username: credentials.password },
                        ]
                    })
                    if (!user) {
                        throw new Error("No user found with this email.")
                    }
                    if (!user.isVerified) {
                        throw new Error("Please verify your account first before login.")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (isPasswordCorrect) {
                        
                        return user
                    }
                    else {
                        throw new Error("Incorrect credentials.")
                    }
                } catch (error: any) {
                    throw new Error(error)
                }

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.fullname = user.fullname
                token.username = user.username
                token.avatar = user.avatar
                token.role = user.role
                token.email = user.email
            }  
            return token
        },
        async session({ session, token }: any) {
            if (token) {
                session.user._id = token._id
                session.user.username = token.username
                session.user.avatar = token.avatar
                session.user.role = token.role
                session.user.email = token.email
                session.user.fullname = token.fullname
            }
            return session
        },
        // login through the OAuth
        async signIn({ user, account, profile, email, credentials }: any) {
            if (account.provider == 'credentials') {
                return true
            }
            if (account.provider === 'github') {
                try {
                    await db()
                    const currentUser = await UserModel.findOne({ email: profile.email })
                    if (!currentUser) {
                        const existingUserWithUsername = await UserModel.findOne({ username: profile.email.split('@')[0] })
                        if(!existingUserWithUsername){
                            const newUser = new UserModel(
                                {
                                    fullname: profile.name,
                                    email: profile.email,
                                    username: profile.email.split('@')[0],
                                    avatar: profile.avatar_url,
                                    isVerified: true,
                                    verifyCode: "781543",
                                    verifyCodeExpiry: new Date(Date.now() + 3600000),
                                    password: "1x$3kx81k"
                                }
                            )
                            await newUser.save()
                        }
                        else{
                            const newUser = new UserModel(
                                {
                                    fullname: profile.name,
                                    email: profile.email,
                                    username: existingUserWithUsername.username + "2",
                                    avatar: profile.avatar_url,
                                    isVerified: true,
                                    verifyCode: "781543",
                                    verifyCodeExpiry: new Date(Date.now() + 3600000),
                                    password: "1x$3kx81k"
                                }
                            )
                            await newUser.save()
                        }
                    }else{
                        // TODO: Linked account with github
                        console.log("User already exists")
                    }

                } catch (error) {
                    console.log(error)
                }
                return true;
            }
            if (account.provider === 'google') {
                try {
                    await db()
                    const currentUser = await UserModel.findOne({ email: profile.email })
                    if (!currentUser) {
                        const existingUserWithUsername = await UserModel.findOne({ username: profile.email.split('@')[0] })
                        if(!existingUserWithUsername){
                            const newUser = new UserModel(
                                {
                                    fullname: profile.name,
                                    email: profile.email,
                                    username: profile.email.split('@')[0],
                                    avatar: profile.avatar_url,
                                    isVerified: true,
                                    verifyCode: "781543",
                                    verifyCodeExpiry: new Date(Date.now() + 3600000),
                                    password: "1x$3kx81k723HFSDU"
                                }
                            )
                            await newUser.save()
                        }
                        else{
                            const newUser = new UserModel(
                                {
                                    fullname: profile.name,
                                    email: profile.email,
                                    username: existingUserWithUsername.username + "2",
                                    avatar: profile.avatar_url,
                                    isVerified: true,
                                    verifyCode: "781543",
                                    verifyCodeExpiry: new Date(Date.now() + 3600000),
                                    password: "1x$3kxfkrllds81k"
                                }
                            )
                            await newUser.save()
                        }
                    }else{
                        // TODO: Linked account with github
                        console.log("User already exists")
                    }

                } catch (error) {
                    console.log(error)
                }
                return true;
            }
        }
    },
    pages: {
        singIn: "/singin"
    },
    session: {
        strategy: "jwt"
    },
    secrets: process.env.AUTH_SECRET,
}

