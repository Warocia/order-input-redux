
import {Product } from '../interfaces/Product';
import {configValues} from '../data/configValues';

const API_URL = configValues.apiUrl;

class ProductAPI {
    async getProductData() : Promise<Product[]> {
      try {
        const response  = await fetch(API_URL + 'products');
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const rawProducts = await response.json();
        return rawProducts;

      } catch (error) {
        console.error(error);
        return [];
      }
    }
}

export default new ProductAPI();