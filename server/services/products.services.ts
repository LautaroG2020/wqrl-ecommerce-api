import { Product } from "../models/products.model";
class ProductsService {
    static GetProductsAsync = async () => {
        const products = await Product.GetProductsAsync();
        return products;
    };

}

export default ProductsService;