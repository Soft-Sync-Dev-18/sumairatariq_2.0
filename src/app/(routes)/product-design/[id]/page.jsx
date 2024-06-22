import Design from "@/components/product/designe";

function page({ params, searchParams }) {
  let { category, subCategory, tags, color, minPrice, maxPrice } = searchParams;
  return (
    <Design
      id={params?.id}
      category={category || ""}
      subCategory={subCategory || ""}
      tags={tags || ""}
      color={color || ""}
      minPrice={minPrice || ""}
      maxPrice={maxPrice || ""}
    />
  );
}

export default page;
