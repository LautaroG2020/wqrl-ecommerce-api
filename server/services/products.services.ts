import { Product } from "../models/products.model";
class ProductsService {
    static GetProductsAsync = async () => {
        const products = await Product.GetProductsAsync();
        return products;
    };

    static GetProductByIdAsync = async (id: number) => {
        const products = await Product.GetProductsAsync();

        const product = products.find(x => x.Id == id);

        return product;
    };

    static DeleteProductAsync = async (id: number) => {
        const deletedProduct = await Product.DeleteProductAsync(id);
        return deletedProduct;
    };

}

export default ProductsService;