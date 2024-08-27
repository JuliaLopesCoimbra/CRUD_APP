import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/api";
import { Link } from "react-router-dom";
import "./styles.css";

interface Product {
  id: string;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  genero: string;
  numeroPag: number;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    loadProducts();
  }, []);
  
  const loadProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };
  
  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    loadProducts();
  };
  
  return (
    <div>
      <h1>Lista de Livros</h1>
      <div className="buttonAdd">
          <Link to="/add" >
            Adicione um livro
          </Link>
      </div>
      
      <ul>
        {products.map((product) => (
          <li key={product.id} className="my-4 p-4 border rounded shadow-sm">
            <div className="mb-2">
              <p className="font-semibold">Título do Livro:</p>
              <p>{product.titulo}</p>
              <p>Autor: {product.autor}</p>
              <p>Ano: {product.anoPublicacao}</p>
              <p>Gênero: {product.genero}</p>
              <p>Páginas: {product.numeroPag}</p>
            </div>
            <div>
              <Link to={`/edit/${product.id}`} className="text-blue-500 hover:text-blue-700 mr-4">
                Editar
              </Link>
              <button onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
