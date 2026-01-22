import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    // updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const products = pgTable("products", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    image_url: text("image_url").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }), // onDelete cascade to remove products when user is deleted
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const comments = pgTable("comments", {
    id: uuid("id").primaryKey().defaultRandom(),
    content: text("content").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }), // onDelete cascade to remove comments when user is deleted
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

//RELATIONS TABLES
// a user can have many products and many comments
export const usersRelations = relations(users, ({ many }) => ({
    products: many(products),
    comments: many(comments),
}));


// A product belongs to a user and can have many comments

export const productsRelations = relations(products, ({ one, many }) => ({
    comments: many(comments),
    user: one(users, {
        fields: [products.userId], //the foreign key field in products table {products.userId}
        references: [users.id], //the primary key field in users table
    }),
})); 

// A comment belongs to a user and  one product
export const commentsRelations = relations(comments, ({ one }) => ({
    user: one(users, {
        fields: [comments.userId], //the foreign key field in comments table {comments.userId}
        references: [users.id], //the primary key field in users table
    }),
    product : one(products, {
        fields: [comments.id], //the foreign key field in comments table {comments.id}
        references: [products.id], //the primary key field in products table
    }),
}));

//TYPE INFERENCES
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;