import { User } from "./../entities/User"
import { MyContext } from "./../types"
import { Resolver, Mutation, Arg, Field, Ctx, ObjectType } from "type-graphql"
import argon2 from "argon2"

@ObjectType()
class FieldError {
  @Field()
  field: string
  @Field()
  message: string
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver()
export class UserResolver {
  //Register a new user
  @Mutation(() => UserResponse)
  async register(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string,
    @Arg("milRank", () => String) milRank: string,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "Length must be greater than 2",
          },
        ],
      }
    }
    if (password.length <= 5) {
      return {
        errors: [
          {
            field: "password",
            message: "Length must be greater than 5",
          },
        ],
      }
    }

    const hashedPassword = await argon2.hash(password)
    const user = em.create(User, {
      username: username,
      password: hashedPassword,
      milRank: milRank,
    })
    try {
      await em.persistAndFlush(user)
    } catch (err) {
      if (err.code === "23505" || err.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
              message: "Username is already taken",
            },
          ],
        }
      }
      console.log("Message: " + err.message)
    }
    return {
      user,
    }
  }

  // Login the user
  @Mutation(() => UserResponse)
  async login(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: username })
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "That username does not exist",
          },
        ],
      }
    }
    const valid = await argon2.verify(user.password, password)
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      }
    }

    return {
      user,
    }
  }
}
