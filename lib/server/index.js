import { createGraphQLHandler } from "@miragejs/graphql";
import bcrypt from "bcryptjs";
import dayjs from "dayjs";
import { GraphQLError, GraphQLScalarType, Kind } from "graphql";
import { createServer } from "miragejs";
import { sign, verify } from "./jwt";
import { schema } from "./schema";

const getCurrentUser = async (context) => {
  const token = context.request.requestHeaders.authorization;
  if (!token) throw new GraphQLError("unauthorized");
  const payload = await verify(token.slice(7));
  const user = context.mirageSchema.users.findBy({ id: payload.id });
  if (!user) throw new GraphQLError("user does not exist");
  return user;
};

const DateTimeScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "Datetime string",
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    return value.toString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
  },
});

export const server = createServer({
  routes() {
    const graphQLHandler = createGraphQLHandler(schema, this.schema, {
      context: undefined,
      root: undefined,
      resolvers: {
        DateTime: DateTimeScalar,
        Query: {
          async userTodos(obj, args, context, info) {
            const { page, pageSize, searchKeyword } = args;
            const user = await getCurrentUser(context);

            console.log("USER", user);

            let userTodos = user.todos.models;

            if (searchKeyword) {
              userTodos = userTodos.filter((todo) =>
                todo.content.toLowerCase().includes(searchKeyword.toLowerCase())
              );
            }

            let sortedUserTodos = [...userTodos];

            sortedUserTodos.sort((a, b) => {
              if (a.status === "TODO" && b.status === "DONE") {
                return -1;
              } else if (a.status === "DONE" && b.status === "TODO") {
                return 1;
              }

              return b.updatedAt - a.updatedAt;
            });

            const totalCount = sortedUserTodos.length;
            const totalPage = Math.ceil(totalCount / pageSize);

            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedTodos = sortedUserTodos.slice(startIndex, endIndex);

            return {
              totalCount,
              totalPage,
              currentPage: page,
              todos: paginatedTodos,
            };
          },
        },
        Mutation: {
          createUser(obj, args, context, info) {
            const { email, password } = args;
            const oldUser = context.mirageSchema.users.findBy({ email });
            if (oldUser) {
              throw new GraphQLError("email exists");
            }
            const passwordHashed = bcrypt.hashSync(password, 8);
            const now = dayjs().valueOf();
            const user = context.mirageSchema.create("User", {
              email,
              passwordHashed,
              createdAt: now,
            });
            return user;
          },

          async createTodo(obj, args, context, info) {
            const { content } = args;
            const user = await getCurrentUser(context);
            const now = dayjs().valueOf();
            const todo = context.mirageSchema.create("Todo", {
              content,
              user,
              status: "TODO",
              createdAt: now,
              updatedAt: now,
            });
            return todo;
          },

          async updateTodo(obj, args, context, info) {
            const {
              todo: { id, content, status },
            } = args;
            const user = await getCurrentUser(context);
            const todo = user.todos.models.find((t) => t.id === id);
            if (!todo) throw new GraphQLError("todo does not exist");
            const now = dayjs().valueOf();
            if (content) todo.update({ content, updatedAt: now });
            if (status) todo.update({ status, updatedAt: now });
            return todo;
          },

          async deleteTodo(obj, args, context, info) {
            const { id } = args;
            const user = await getCurrentUser(context);
            const todo = user.todos.models.find((t) => t.id === id);
            if (!todo) throw new GraphQLError("todo does not exist");
            todo.destroy();
            return true;
          },

          async token(obj, args, context, info) {
            const { email, password } = args;
            const user = context.mirageSchema.users.findBy({ email });
            if (!user)
              throw new GraphQLError("user does not exist or wrong password");
            const match = bcrypt.compareSync(password, user.passwordHashed);
            if (!match)
              throw new GraphQLError("user does not exist or wrong password");
            return sign({ id: user.id, email: user.email });
          },
        },
      },
    });

    this.post("/graphql", graphQLHandler);
    this.passthrough();
  },

  seeds(server) {
    const now = dayjs().valueOf();
    server.create("User", {
      email: "test@example.com",
      passwordHashed: bcrypt.hashSync("password", 8),
      createdAt: now,
    });
  },
});
