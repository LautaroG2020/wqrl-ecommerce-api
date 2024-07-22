import { Request, Response } from "express";
//import { body, validationResult } from "express-validator";
import { ObjectResult } from "../helpers/object-result";
import ProductsService from "../services/products.services";

class ProductsController {

    static GetAllProductsAsync = async (req: Request, res: Response) => {
        const products = await ProductsService.GetProductsAsync();
        return ObjectResult.SendOk(res, products);
    };

}

export default ProductsController;