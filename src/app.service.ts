import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <style>
        body {
          padding: 20px;
        }
        table {
          border-collapse: collapse;
        }
        table, th, td {
          border: 1px solid black;
          padding: 5px 10px;
        }
        .container { 
          columns: 200px 2;
          column-gap: 20px;
        }
        .item {
          flex: 0 0 50%;
        }
      </style>

      <h1>API</h1>

      <div class='container'>
        <div class='item'>
          <h3>Category routes:</h3>
          <table>
            <thead>
              <tr>
                <th>Method</th>
                <th>Route</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GET</td>
                <td>/categories</td>
                <td>To get all categories</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/categories/:id</td>
                <td>To get category by id</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/categories/:id/products</td>
                <td>To get category by id with products</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/categories</td>
                <td>To create new category. Can be single or array of object.</td>
              </tr>
              <tr>
                <td>PATCH</td>
                <td>/categories/:id</td>
                <td>To update category by id</td>
              </tr>
              <tr>
                <td>DELETE</td>
                <td>/categories/:id</td>
                <td>To delete category by id</td>
              </tr>
            </tbody>
          </table>

          <h3>Response data structure:</h3>
          <pre>
            {
              "id": number,
              "name": string,
              "createdAt": timestamp,
              "updatedAt": timestamp,
            }
          </pre>

          <h3>Create data structure:</h3>
          <pre>
            {
              "name": string,
            }
          </pre>

          <h3>Category list:</h3>
          <ul>
            <li>1: Electronic</li>
            <li>2: Food</li>
            <li>3: Luxuary</li>
            <li>4: Instrument</li>
        </div>

        <div class='item'>
          <h3>Product routes:</h3>
          <table>
            <thead>
              <tr>
                <th>Method</th>
                <th>Route</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GET</td>
                <td>/products</td>
                <td>To get all products</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/products/:id</td>
                <td>To get product by id</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/products?name=[name]</td>
                <td>To get products by name</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/products</td>
                <td>To create new product. Can be single or array of object.</td>
              </tr>
              <tr>
                <td>PATCH</td>
                <td>/products/:id</td>
                <td>To update product by id</td>
              </tr>
              <tr>
                <td>DELETE</td>
                <td>/products/:id</td>
                <td>To delete product by id</td>
              </tr>
            </tbody>
          </table>

          <h3>Response data structure:</h3>
          <pre>
            {
              "id": number,
              "name": string,
              "price": number,
              "cat_id": number,
              "cat_name": string
              "createdAt": timestamp,
              "updatedAt": timestamp,
              }
            }
          </pre>

          <h3>Create data structure:</h3>
          <pre>
            {
              "name": string,
              "price": number,
              "cat_id": number
            }
          </pre>
        </div>
      </div>
    `;
  }
}
