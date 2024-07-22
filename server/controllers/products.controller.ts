import { Request, Response } from "express";
//import { body, validationResult } from "express-validator";
import { ObjectResult } from "../helpers/object-result";
import ProductsService from "../services/products.services";

class ProductsController {

    static GetAllProductsAsync = async (req: Request, res: Response) => {
        const products = await ProductsService.GetProductsAsync();

        if (!products) {
            return ObjectResult.SendNotFound(res, "Products not found");
        }

        return ObjectResult.SendOk(res, products);
    };

    static GetProductByIdAsync = async (req: Request, res: Response) => {
        const id = req.params.id;
        const product = await ProductsService.GetProductByIdAsync(Number(id));

        if (!product) return ObjectResult.SendNotFound(res, "Product not found");

        return ObjectResult.SendOk(res, product);
    };

    static DeleteProductAsync = async (req: Request, res: Response) => {
        const id = req.params.id;
        const product = await ProductsService.DeleteProductAsync(Number(id));

        if (!product) return ObjectResult.SendNotFound(res, "Product not found");

        return ObjectResult.SendOk(res, "Se ha eliminado el producto correctamente");
    };
}

export default ProductsController;