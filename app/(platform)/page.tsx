
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import getProducts from "@/actions/get-products";
import { revalidateTag } from "next/cache";

const revalidate = async (tag: string) => {
  'use server'
  revalidateTag(tag)
}
const HomePage = async () => {
  const products = await getProducts()
  return (
    <Container>
      <div className="pb-10 space-y-10">
        <Billboard />
        <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} revalidateTag={revalidate} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
