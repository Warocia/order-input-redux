
import {Product } from '../Model/Product';
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

    async updateProduct(product: Product) : Promise<Product | null> {
      try {
          const response = await fetch(API_URL + 'products/' + product.id, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(product)
          });
  
          if (!response.ok) {
              throw new Error(response.statusText);
          }
  
          const restOrder= await response.json();
          return restOrder
  
      } catch (error) {
          console.error(error);
          return null;
      }
    }

    async createProduct(product: Product) : Promise<Product | null> {
      try {
          const response = await fetch(API_URL + 'products', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(product)
          });
          if (!response.ok) {
              throw new Error(response.statusText);
          }
  
          const restProduct= await response.json();
          return restProduct
  
      } catch (error) {
          console.error(error);
          return null;
      }
    }

    async deleteProduct(productId: number) : Promise<boolean> {
      try {
          const response = await fetch(API_URL + 'products/' + productId, {
              method: 'DELETE'
          });
          if (!response.ok) {
              throw new Error(response.statusText);
          }
      } catch (error) {
          console.error(error);
          return false;    
      }
      return true;    
  }
}

export default new ProductAPI();