import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, getProductById, updateProduct } from "../services/api";
import '../pages/styles.css'

interface Product {
  titulo: string;
  autor: string;
  anoPublicacao: number;
  genero: string;
  numeroPag: number;
}

function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    titulo: "",
    autor: "",
    anoPublicacao: 0,
    genero: "",
    numeroPag: 0
  });
  const [error, setError] = useState<string>(""); // Estado para mensagem de erro

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await getProductById(id as string);
      setProduct(response.data);
    } catch (error) {
      console.error("Error loading product data", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { titulo, autor, anoPublicacao, genero, numeroPag } = product;
    if (!titulo || !autor || !anoPublicacao || !genero || !numeroPag) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      if (id) {
        await updateProduct(id, product);
      } else {
        await createProduct(product);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>} {/* Mensagem de erro */}
      <div>
        <label>Título</label>
        <input
          type="text"
          name="titulo"
          value={product.titulo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Autor</label>
        <input
          type="text"
          name="autor"
          value={product.autor}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Ano de Publicação</label>
        <input
          type="number"
          name="anoPublicacao"
          value={product.anoPublicacao}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Genero</label>
        <input
          type="text"
          name="genero"
          value={product.genero}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Número de Páginas</label>
        <input
          type="number"
          name="numeroPag"
          value={product.numeroPag}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}

export default ProductForm;
