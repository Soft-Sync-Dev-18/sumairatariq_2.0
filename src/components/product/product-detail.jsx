"use client";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import Button from "../common/button";
import { useSearchParams } from "next/navigation";
import { useProductCart } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { useProductDrawer } from "@/store/use-drawer";
import { notify } from "@/lib/notify";
import Heading from "../common/heading";
import ProductCarousel from "../common/product-crousel";
import { API } from "@/services";
import { Skeleton } from "../ui/skeleton";

function ProductDetail({ data }) {
  const router = useRouter();
  const { addToCart, buyNow, cart } = useProductCart();
  const description = JSON.parse(data?.Description);
  const params = useSearchParams();
  const paramsColor = params.get("color");
  const paramsSize = params.get("size");
  const { isOpen, setOpen } = useProductDrawer();
  const [stock, setStock] = useState();
  const [color, setColor] = useState(paramsColor);
  const [size, setSize] = useState(paramsSize);
  const [api1, setApi1] = useState(null);
  const [api2, setApi2] = useState(null);
  const [image, setImage] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    if (api1 && api2) {
      api1.on("select", () => {
        api2.scrollTo(api1.selectedScrollSnap());
      });

      api2.on("select", () => {
        api1.scrollTo(api2.selectedScrollSnap());
      });
    }
  }, [api1, api2]);

  const handleSliderItemClick = (index) => {
    if (api1 && api2) {
      api1.scrollTo(index);
      api2.scrollTo(index);
    }
  };
  const [productId, setProductId] = useState();

  useEffect(() => {
    filterImageByColor(paramsColor);
    let item = data?.items?.filter((item) => item?.color === color);
    setStock(item[0].QuantityAvailable);
    setProductId(item[0].id);
  }, [color, data, paramsColor]);

  const filterImageByColor = (color) => {
    let newdata = data?.Images?.filter((data) => {
      return data.itemColor == color;
    });
    setImage(newdata.length > 0 ? newdata : data?.Images);
  };

  const [sliderImages, setSliderImages] = useState([]);
  const [productLoading, setLoadingProduct] = useState(true);
  const fetchData = async () => {
    setLoadingProduct(true);
    try {
      const [sliderRes] = await Promise.all([API.GetSliderProducts()]);
      setSliderImages(sliderRes?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProduct(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main className="flex xl:flex-row flex-col bg-white gap-4 items-start justify-center pt-16 container overflow-hidden">
        <div className="w-full  gap-4 lg:flex hidden ">
          <div className="flex flex-col" style={{ height: "750px" }}>
            <Carousel
              setApi={setApi1}
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              orientation="vertical"
              className="xl:w-[173px] w-[250px] "
            >
              <CarouselContent className="h-[750px]">
                {image?.map((data, index) => (
                  <CarouselItem
                    key={index}
                    className="h-full basis-1/3 cursor-pointer"
                  >
                    <div
                      onClick={() => handleSliderItemClick(index)}
                      className="h-full flex justify-center items-center"
                    >
                      <Image
                        width={500}
                        loading={data?.filename ? "lazy" : "eager"}
                        height={500}
                        alt="product image"
                        className="object-cover object-center rounded-xl"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${data?.filename}`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="h-[750px] ">
            <Carousel
              setApi={setApi2}
              className="w-[549px]"
              opts={{
                align: "start",
                loop: true,
              }}
              orientation="horizontal"
            >
              <CarouselContent className="h-[750px]">
                {image?.map((data, index) => (
                  <CarouselItem key={index} className="h-full  cursor-pointer">
                    <div onClick={() => handleSliderItemClick(index)}>
                      <Image
                        width={500}
                        loading={data?.filename ? "lazy" : "eager"}
                        height={500}
                        alt="image of a girl posing"
                        className="object-cover object-center h-full w-full rounded-xl"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${data?.filename}`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        <div className="w-full gap-4 lg:hidden flex justify-center">
          <div className="h-full w-full">
            <Carousel
              className="h-full w-full "
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              orientation="horizontal"
            >
              <CarouselContent className="">
                {image?.map((data, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div onClick={() => handleSliderItemClick(index)}>
                      <Image
                        width={500}
                        loading={data?.filename ? "lazy" : "eager"}
                        height={500}
                        alt="image of a girl posing"
                        className="object-cover object-center h-full w-full rounded-xl"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${data?.filename}`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>

        <div className=" w-[90%]  flex flex-col gap-y-5">
          <h1 className="lg:text-2xl text-xl font-semibold">{data?.name}</h1>
          <span className="lg:text-2xl text-xl font-semibold text-[#d33]">
            PKR. {data?.price}
          </span>
          <div>
            <p className="text-sm mb-1.5 font-semibold  text-slate-800 ">
              Color : <span>{color}</span>
            </p>
            <div className="flex gap-2 items-center flex-wrap  text-slate-800 ">
              {data?.Color?.split(",").map((name, index) => (
                <button
                  key={index}
                  onClick={() => {
                    filterImageByColor(name);
                    setColor(name);
                    router.replace(
                      `/product/${data.id}?color=${name}&size=${
                        size ? size : ""
                      }`
                    );
                  }}
                  className={`${
                    color == name
                      ? "bg-slate-200 text-black  hover:bg-slate-200/80"
                      : "bg-white  hover:bg-slate-50  text-black border-slate-200"
                  }  px-3 py-1.5 text-sm border  transition-opacity duration-500   rounded`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          {stock > 0 ? (
            <div className="flex items-center gap-x-2">
              <div>
                <Check className="text-[#d33] w-5 h-5"></Check>
              </div>
              <p className="font-semibold flex gap-2">
                <span>{stock}</span>
                <span>in Stock</span>
              </p>
            </div>
          ) : (
            <div>
              <p className="font-semibold flex gap-2 text-[#d33]">
                <span>Out of Stock</span>
              </p>
            </div>
          )}
          <div>
            <p className="text-sm mb-1.5 font-semibold  text-slate-800 ">
              Size : <span>{size}</span>
            </p>
            <div className="flex gap-2      items-center flex-wrap">
              {data?.size?.split(",").map((name, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSize(name);
                    router.replace(
                      `/product/${data.id}?color=${
                        color ? color : ""
                      }&size=${name}`
                    );
                  }}
                  className={`${
                    size == name
                      ? "bg-slate-200 text-black  hover:bg-slate-200/80"
                      : "bg-white  hover:bg-slate-50  text-black border-slate-200"
                  }  px-3 py-1.5 text-sm border  transition-opacity duration-500   rounded`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-4 mt-1.5 ">
            <div className="inline-flex items-center ">
              <Button
                onClick={decrement}
                disabled={quantity < 2 ? true : false || stock <= 0}
                name={<Minus width={1000} height={1000} className="w-5 h-5" />}
                newClass="bg-white rounded-l border text-gray-600 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1.5 border-r border-gray-200"
              />
              <div className="bg-slate-50 border-t border-b border-gray-100  text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1.5 select-none text-sm">
                {quantity}
              </div>
              <Button
                disabled={quantity == stock || stock <= 0}
                onClick={increment}
                name={<Plus width={1000} height={1000} className="w-5 h-5" />}
                newClass="bg-white rounded-r border text-gray-600 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1.5 border-r border-gray-200"
              />
            </div>
            <div className="flex items-center flex-wrap gap-4   ">
              <button
                disabled={!data || stock === 0 || quantity === 0}
                onClick={() => {
                  if (!data || stock === 0 || quantity === 0) {
                    return;
                  }

                  const id = `${data.id}${color}${size}`;
                  const currentProduct = cart[id];

                  if (currentProduct && currentProduct.quantity >= stock) {
                    return notify(
                      "error",
                      "Maximum available quantity reached. Review your cart"
                    );
                  }

                  addToCart({
                    id: data?.id,
                    product_id: productId,
                    title: data?.name,
                    color: color,
                    quantity: quantity,
                    size: size,
                    image: image[0]?.filename,
                    price: data?.price,
                    stock: stock,
                  });
                  setOpen();
                }}
                className="px-4 w-28 py-1.5  text-white text-sm bg-[#d33] border border-[#d33] disabled:bg-[#d33]/80 disabled:cursor-not-allowed rounded hover:bg-[#d33]/80"
              >
                Add to Cart
              </button>
              <button
                disabled={!data || stock === 0 || quantity === 0}
                onClick={() => {
                  if (!data || stock === 0 || quantity === 0) {
                    return;
                  }

                  buyNow({
                    id: data?.id,
                    product_id: productId,
                    title: data?.name,
                    color: color,
                    quantity: quantity,
                    size: size,
                    image: image[0]?.filename,
                    price: data?.price,
                    stock: stock,
                  });
                  router.push("/checkout");
                }}
                className="px-4 w-28  py-1.5  text-white text-sm bg-[#d33] disabled:bg-[#d33]/80 disabled:cursor-not-allowed  border border-[#d33] rounded hover:bg-[#d33]/80"
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex mb-4 text-slate-800 items-center gap-x-2 text-sm  ">
              <p className=" ">Tags:</p>
              {data?.Tags?.split(",").map((name, index) => (
                <span key={index}>{name + ","}</span>
              ))}
            </div>
            <div className="text-sm text-slate-800 flex flex-col gap-y-4">
              {description?.blocks.map(({ text }, index) => (
                <p key={index} className="  text-slate-800 ">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>
      <div className=" container my-20">
        <Heading title={"Recent Products"} addClass={"mb-10 font-semibold"} />

        {productLoading ? (
          <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4 w-full  py-5">
            {Array(5)
              .fill()
              .map((_, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <Skeleton
                    className="h-[310px] w-full rounded-[8px] bg-[#CCCCCC]"
                    animation="wave"
                  />
                  <Skeleton
                    className="h-7 w-full rounded-lg bg-[#CCCCCC]/90"
                    animation="wave"
                  />
                  <Skeleton
                    className="h-7 w-full rounded-lg bg-[#CCCCCC]/90"
                    animation="wave"
                  />
                </div>
              ))}
          </div>
        ) : (
          <ProductCarousel
            data={sliderImages}
            newClass={`xl:basis-1/4  md:basis-1/3  sm:basis-1/2 `}
          />
        )}
      </div>
    </>
  );
}

export default ProductDetail;
