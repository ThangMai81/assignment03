import { useLoaderData } from "react-router";
import ListProducts from "../components/ListProducts";
export default function AdminPage() {
  const response = useLoaderData();
  console.log("Response: ", response.products);
  return (
    <div className="flex flex-col gap-[5px] m-[10px]">
      <div className="font-semibold">Products</div>
      <input
        type="text"
        className="p-[3px] border-[1px] border-gray-400 w-[400px]"
        placeholder="Enter Search"
      />
      <ListProducts products={response.products} />
    </div>
  );
}

export async function loader() {
  const res = await fetch(`http://localhost:5000/products`);
  if (!res.ok) {
    throw json({ message: "Something wrong with server", status: 500 });
  } else {
    return res;
  }
}
