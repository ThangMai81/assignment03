import Product from "./Product";

export default function ListProducts({ products }) {
  console.log(products);
  const colClass = "";
  return (
    <div className="flex flex-col">
      <div className="flex border-[1px] divide-x font-semibold">
        <span className="w-[20%] px-2 py-2">ID</span>
        <span className="w-[20%] px-2 py-2">Name</span>
        <span className="w-[15%] px-2 py-2">Price</span>
        <span className="w-[10%] px-2 py-2">Image</span>
        <span className="w-[15%] px-2 py-2">Category</span>
        <span className="w-[15%] px-2 py-2">Edit</span>
      </div>
      {products.map((product, i) => (
        <div
          className={`flex border-[1px] divide-x ${
            i % 2 == 0 ? "bg-gray-200" : ""
          }`}
        >
          <span className="w-[20%] px-2 py-2">{product._id}</span>
          <span className="w-[20%] px-2 py-2">{product.name}</span>
          <span className="w-[15%] px-2 py-2">{product.price}</span>
          <img src={`${product.img1}`} className="w-[10%] px-2 py-2 h-[auto]" />
          <span className="w-[15%] px-2 py-2">{product.category}</span>
          <span className="w-[15%] px-2 py-2">Edit</span>
        </div>
      ))}
    </div>
  );
}
