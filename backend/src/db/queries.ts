import { db } from "./index";
import { eq } from "drizzle-orm";
import { users, comments, products, type NewUser, type NewProduct, type NewComment } from "./schema";

//USER QUERIES
export const createUser = async (data: NewUser) => {
    const [user] = await db.insert(users).values(data).returning();
    return user;
};

export const getUserById = async (id: string) => {
    return db.query.users.findFirst({ where: eq(users.id, id) });
};

export const updateUser = async (id: string, data: Partial<NewUser>) => {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user;
};
//upsert will either create or update a user based on if the user exists
export const upsertUser = async (data: NewUser) => {
    const existingUser = await getUserById(data.id);
    if (existingUser) {
        return updateUser(data.id, data);
    } else {
        return createUser(data);
    }
};


//PRODUCT QUERIES
export const createProduct = async (data: NewProduct) => {
    const [product] = await db.insert(products).values(data).returning();
    return product;
}

export const getAllProducts = async () => {
    return db.query.products.findMany({
        with: { user: true },
        orderBy: (product, { desc }) => [desc(product.createdAt)]//desc: newest/latest products first
        // square brackets are used because Drizzle ORM expects an array, even for single column

    });
};


export const getProductById = async (id: string) => {
    return db.query.products.findFirst({
        where: eq(products.id, id),
        with: {
            user: true,
            comments: {
                with: { user: true },
                orderBy: (comment, { desc }) => [desc(comment.createdAt)]
            }
        }
    });
}

export const getProductsByUserId = async (userId: string) => {
    return db.query.products.findMany({
        where: eq(products.userId, userId),
        with: {
            user: true,
            comments: {
                with: { user: true },
                orderBy: (comment, { desc }) => [desc(comment.createdAt)]
            }
        }
    });
};

export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
    const [product] = await db.update(products).set(data).where(eq(products.id, id)).returning();
    return product;
}

export const deleteProduct = async (id: string) => {
    const [product] = await db.delete(products).where(eq(products.id, id)).returning();
    return product;
}


//COMMENT QUERIES
export const createComment = async (data: NewComment) => {
    const [comment] = await db.insert(comments).values(data).returning();
    return comment;
}

export const deleteComment = async (id: string) => {
    const [comment] = await db.delete(comments).where(eq(comments.id, id)).returning();
    return comment;
}

export const getCommentsById = async (id: string) => {
    return db.query.comments.findMany({
        where: eq(comments.id, id),
        with: { user: true },
    });
}