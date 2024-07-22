import connection from "../data/database-config";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { CacheObjectManager } from "../cache/utils/cache-object-manager.model";

interface ProductInterface {
    id: number;
    name: string;
    description: string;
    price: number;
    enabled: boolean;
    maxQuantity: number;
    availableForShipping: boolean;
    categoryId: number;
    storeId: number;
    creationDate: Date;
    deletionDate: Date | null;
}

interface ProductImageInterface {
    id: number;
    productId: number;
    image: string;
}

const periodicCache = new CacheObjectManager();
periodicCache.SetResetCacheEveryDay();

class Product {
    Id: number = 0;
    Name: string = "";
    Description: string = "";
    Price: number = 0;
    Enabled: boolean = false;
    MaxQuantity: number = 0;
    AvailableForShipping: boolean = false;
    CategoryId: number = 0;
    StoreId: number = 0;
    CreationDate: Date = new Date();
    DeletionDate: Date | null = null;
    Images: string[] = [];

    constructor(data: ProductInterface) {
        this.Id = data.id;
        this.Name = data.name;
        this.Description = data.description;
        this.Price = data.price;
        this.Enabled = data.enabled;
        this.MaxQuantity = data.maxQuantity;
        this.AvailableForShipping = data.availableForShipping;
        this.CategoryId = data.categoryId;
        this.StoreId = data.storeId;
        this.CreationDate = new Date(data.creationDate);
        this.DeletionDate = data.deletionDate ? new Date(data.deletionDate) : null;
        this.Images = [];
    }

    static GetProductsAsync = async () => {
        const cacheKey = "GetAllProductsAsync";
        const cachedObject = periodicCache.TryGetCachedObject<Product[]>(cacheKey);

        if (cachedObject != null) return cachedObject;

        const query = `
            SELECT p.*, pi.image
            FROM e_commerce.products p
            LEFT JOIN e_commerce.productImages pi ON p.id = pi.productId
            WHERE p.deletionDate IS NULL
        `;

        const [rows] = await connection.query<RowDataPacket[]>(query);

        const productsMap: { [key: number]: Product } = Product.MapProducts(rows);

        const result = Object.values(productsMap);

        periodicCache.SaveObject(cacheKey, result);

        return result;
    };

    private static MapProducts = (rows: RowDataPacket[]) => {
        const productsMap: { [key: number]: Product } = {};

        rows.forEach((record) => {
            const productId = record.id;
            if (!productsMap[productId]) {
                productsMap[productId] = Product.CreateProductFromRecord(record);
            }
            if (record.image) {
                productsMap[productId].Images.push(record.image);
            }
        });

        return productsMap;
    };

    private static CreateProductFromRecord = (record: RowDataPacket) => {
        const productData: ProductInterface = {
            id: record.id,
            name: record.name,
            description: record.description,
            price: record.price,
            enabled: record.enabled,
            maxQuantity: record.maxQuantity,
            availableForShipping: record.availableForShipping,
            categoryId: record.categoryId,
            storeId: record.storeId,
            creationDate: record.creationDate,
            deletionDate: record.deletionDate
        };
        return new Product(productData);
    };

    static DeleteProductAsync = async (id: number) => {
        const query = `
            UPDATE e_commerce.products
            SET deletionDate = NOW()
            WHERE id = ?
        `;

        const [result] = await connection.query<ResultSetHeader>(query, [id]);

        if (result.affectedRows == 0) return false;

        return true;
    };
}

export {
    Product, ProductInterface, ProductImageInterface
};