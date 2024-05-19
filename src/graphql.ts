
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class IngredientData {
    name?: Nullable<string>;
    quantity?: Nullable<string>;
}

export class IngredientDataEdit {
    name?: Nullable<string>;
    quantity?: Nullable<string>;
}

export class OrderProductData {
    idOrder?: Nullable<string>;
    idProduct?: Nullable<string>;
}

export class OrderProductDataEdit {
    idOrder?: Nullable<string>;
    idProduct?: Nullable<string>;
}

export class OrderData {
    client?: Nullable<string>;
    dateDelivery?: Nullable<string>;
    hourDelivery?: Nullable<string>;
    totalPrice?: Nullable<number>;
    state?: Nullable<boolean>;
    idUser?: Nullable<string>;
}

export class OrderDataEdit {
    client?: Nullable<string>;
    dateDelivery?: Nullable<string>;
    hourDelivery?: Nullable<string>;
    totalPrice?: Nullable<number>;
    state?: Nullable<boolean>;
    idUser?: Nullable<string>;
}

export class PriceSizeData {
    price?: Nullable<number>;
    size?: Nullable<string>;
    idProduct?: Nullable<string>;
}

export class PriceSizeDataEdit {
    price?: Nullable<number>;
    size?: Nullable<string>;
    idProduct?: Nullable<string>;
}

export class ProductData {
    name?: Nullable<string>;
    idRecipe?: Nullable<string>;
}

export class ProductDataEdit {
    name?: Nullable<string>;
    idRecipe?: Nullable<string>;
}

export class RecipeIngredientData {
    idRecipe?: Nullable<string>;
    idIngredient?: Nullable<string>;
}

export class RecipeIngredientDataEdit {
    idRecipe?: Nullable<string>;
    idIngredient?: Nullable<string>;
}

export class RecipeSubrecipeData {
    idRecipe?: Nullable<string>;
    idSubrecipe?: Nullable<string>;
}

export class RecipeSubrecipeDataEdit {
    idRecipe?: Nullable<string>;
    idSubrecipe?: Nullable<string>;
}

export class RecipeData {
    description?: Nullable<string>;
}

export class RecipeDataEdit {
    description?: Nullable<string>;
}

export class RoleData {
    name?: Nullable<string>;
}

export class RoleDataEdit {
    name?: Nullable<string>;
}

export class SubrecipeIngredientData {
    idSubrecipe?: Nullable<string>;
    idIngredient?: Nullable<string>;
}

export class SubrecipeIngredientDataEdit {
    idSubrecipe?: Nullable<string>;
    idIngredient?: Nullable<string>;
}

export class SubrecipeData {
    description?: Nullable<string>;
}

export class SubrecipeDataEdit {
    description?: Nullable<string>;
}

export class UserData {
    rut?: Nullable<string>;
    username?: Nullable<string>;
    password?: Nullable<string>;
    idRole?: Nullable<string>;
}

export class UserDataEdit {
    rut?: Nullable<string>;
    username?: Nullable<string>;
    idRole?: Nullable<string>;
}

export abstract class IQuery {
    abstract getIngredients(): Nullable<Nullable<Ingredient>[]> | Promise<Nullable<Nullable<Ingredient>[]>>;

    abstract getOrdersProducts(): Nullable<Nullable<OrderProduct>[]> | Promise<Nullable<Nullable<OrderProduct>[]>>;

    abstract getOrders(): Nullable<Nullable<Order>[]> | Promise<Nullable<Nullable<Order>[]>>;

    abstract getPricesSizes(): Nullable<Nullable<PriceSize>[]> | Promise<Nullable<Nullable<PriceSize>[]>>;

    abstract getProducts(): Nullable<Nullable<Product>[]> | Promise<Nullable<Nullable<Product>[]>>;

    abstract getRecipesIngredients(): Nullable<Nullable<RecipeIngredient>[]> | Promise<Nullable<Nullable<RecipeIngredient>[]>>;

    abstract getRecipesSubrecipes(): Nullable<Nullable<RecipeSubrecipe>[]> | Promise<Nullable<Nullable<RecipeSubrecipe>[]>>;

    abstract getRecipes(): Nullable<Nullable<Recipe>[]> | Promise<Nullable<Nullable<Recipe>[]>>;

    abstract getRoles(): Nullable<Nullable<Role>[]> | Promise<Nullable<Nullable<Role>[]>>;

    abstract getSubrecipesIngredients(): Nullable<Nullable<SubrecipeIngredient>[]> | Promise<Nullable<Nullable<SubrecipeIngredient>[]>>;

    abstract getSubrecipes(): Nullable<Nullable<Subrecipe>[]> | Promise<Nullable<Nullable<Subrecipe>[]>>;

    abstract getUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export abstract class IMutation {
    abstract createIngredient(input?: Nullable<IngredientData>): Nullable<Ingredient> | Promise<Nullable<Ingredient>>;

    abstract editIngredient(id?: Nullable<string>, input?: Nullable<IngredientDataEdit>): Nullable<Ingredient> | Promise<Nullable<Ingredient>>;

    abstract deleteIngredient(id?: Nullable<string>): Nullable<Ingredient> | Promise<Nullable<Ingredient>>;

    abstract createOrderProduct(input?: Nullable<OrderProductData>): Nullable<OrderProduct> | Promise<Nullable<OrderProduct>>;

    abstract editOrderProduct(id_ord?: Nullable<string>, id_pro?: Nullable<string>, input?: Nullable<OrderProductDataEdit>): Nullable<OrderProduct> | Promise<Nullable<OrderProduct>>;

    abstract deleteOrderProduct(id_ord?: Nullable<string>, id_pro?: Nullable<string>): Nullable<OrderProduct> | Promise<Nullable<OrderProduct>>;

    abstract createOrder(input?: Nullable<OrderData>): Nullable<Order> | Promise<Nullable<Order>>;

    abstract editOrder(id?: Nullable<string>, input?: Nullable<OrderDataEdit>): Nullable<Order> | Promise<Nullable<Order>>;

    abstract deleteOrder(id?: Nullable<string>): Nullable<Order> | Promise<Nullable<Order>>;

    abstract createPriceSize(input?: Nullable<PriceSizeData>): Nullable<PriceSize> | Promise<Nullable<PriceSize>>;

    abstract editPriceSize(id?: Nullable<string>, input?: Nullable<PriceSizeDataEdit>): Nullable<PriceSize> | Promise<Nullable<PriceSize>>;

    abstract deletePriceSize(id?: Nullable<string>): Nullable<PriceSize> | Promise<Nullable<PriceSize>>;

    abstract createProduct(input?: Nullable<ProductData>): Nullable<Product> | Promise<Nullable<Product>>;

    abstract editProduct(id?: Nullable<string>, input?: Nullable<ProductDataEdit>): Nullable<Product> | Promise<Nullable<Product>>;

    abstract deleteProduct(id?: Nullable<string>): Nullable<Product> | Promise<Nullable<Product>>;

    abstract createRecipeIngredient(input?: Nullable<RecipeIngredientData>): Nullable<RecipeIngredient> | Promise<Nullable<RecipeIngredient>>;

    abstract editRecipeIngredient(id_rec?: Nullable<string>, id_ing?: Nullable<string>, input?: Nullable<RecipeIngredientDataEdit>): Nullable<RecipeIngredient> | Promise<Nullable<RecipeIngredient>>;

    abstract deleteRecipeIngredient(id_rec?: Nullable<string>, id_ing?: Nullable<string>): Nullable<RecipeIngredient> | Promise<Nullable<RecipeIngredient>>;

    abstract createRecipeSubrecipe(input?: Nullable<RecipeSubrecipeData>): Nullable<RecipeSubrecipe> | Promise<Nullable<RecipeSubrecipe>>;

    abstract editRecipeSubrecipe(id_rec?: Nullable<string>, id_sub?: Nullable<string>, input?: Nullable<RecipeSubrecipeDataEdit>): Nullable<RecipeSubrecipe> | Promise<Nullable<RecipeSubrecipe>>;

    abstract deleteRecipeSubrecipe(id_rec?: Nullable<string>, id_sub?: Nullable<string>): Nullable<RecipeSubrecipe> | Promise<Nullable<RecipeSubrecipe>>;

    abstract createRecipe(input?: Nullable<RecipeData>): Nullable<Recipe> | Promise<Nullable<Recipe>>;

    abstract editRecipe(id?: Nullable<string>, input?: Nullable<RecipeDataEdit>): Nullable<Recipe> | Promise<Nullable<Recipe>>;

    abstract deleteRecipe(id?: Nullable<string>): Nullable<Recipe> | Promise<Nullable<Recipe>>;

    abstract createRole(input?: Nullable<RoleData>): Nullable<Role> | Promise<Nullable<Role>>;

    abstract editRole(id?: Nullable<string>, input?: Nullable<RoleDataEdit>): Nullable<Role> | Promise<Nullable<Role>>;

    abstract deleteRole(id?: Nullable<string>): Nullable<Role> | Promise<Nullable<Role>>;

    abstract createSubrecipeIngredient(input?: Nullable<SubrecipeIngredientData>): Nullable<SubrecipeIngredient> | Promise<Nullable<SubrecipeIngredient>>;

    abstract editSubrecipeIngredient(id_sub?: Nullable<string>, id_ing?: Nullable<string>, input?: Nullable<SubrecipeIngredientDataEdit>): Nullable<SubrecipeIngredient> | Promise<Nullable<SubrecipeIngredient>>;

    abstract deleteSubrecipeIngredient(id_sub?: Nullable<string>, id_ing?: Nullable<string>): Nullable<SubrecipeIngredient> | Promise<Nullable<SubrecipeIngredient>>;

    abstract createSubrecipe(input?: Nullable<SubrecipeData>): Nullable<Subrecipe> | Promise<Nullable<Subrecipe>>;

    abstract editSubrecipe(id?: Nullable<string>, input?: Nullable<SubrecipeDataEdit>): Nullable<Subrecipe> | Promise<Nullable<Subrecipe>>;

    abstract deleteSubrecipe(id?: Nullable<string>): Nullable<Subrecipe> | Promise<Nullable<Subrecipe>>;

    abstract createUser(input?: Nullable<UserData>): Nullable<User> | Promise<Nullable<User>>;

    abstract editUser(id?: Nullable<string>, input?: Nullable<UserDataEdit>): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export class Ingredient {
    id: string;
    name?: Nullable<string>;
    quantity?: Nullable<string>;
}

export class OrderProduct {
    order?: Nullable<Order>;
    product?: Nullable<Product>;
}

export class Order {
    id: string;
    client?: Nullable<string>;
    dateDelivery?: Nullable<string>;
    hourDelivery?: Nullable<string>;
    totalPrice?: Nullable<number>;
    state?: Nullable<boolean>;
    user?: Nullable<User>;
}

export class PriceSize {
    id: string;
    price?: Nullable<number>;
    size?: Nullable<string>;
    product?: Nullable<Product>;
}

export class Product {
    id: string;
    name?: Nullable<string>;
    recipe?: Nullable<Recipe>;
}

export class RecipeIngredient {
    recipe?: Nullable<Recipe>;
    ingredient?: Nullable<Ingredient>;
}

export class RecipeSubrecipe {
    recipe?: Nullable<Recipe>;
    subrecipe?: Nullable<Subrecipe>;
}

export class Recipe {
    id: string;
    description?: Nullable<string>;
}

export class Role {
    id: string;
    name?: Nullable<string>;
}

export class SubrecipeIngredient {
    subrecipe?: Nullable<Subrecipe>;
    ingredient?: Nullable<Ingredient>;
}

export class Subrecipe {
    id: string;
    description?: Nullable<string>;
}

export class User {
    id: string;
    rut?: Nullable<string>;
    username?: Nullable<string>;
    password?: Nullable<string>;
    state?: Nullable<boolean>;
    role?: Nullable<Role>;
}

type Nullable<T> = T | null;
