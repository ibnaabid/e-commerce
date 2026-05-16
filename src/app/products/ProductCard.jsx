
import {Button, Card, CloseButton} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({product}) => {
   
    return (
        <div>
              <Card className="w-full items-stretch md:flex-row">
      <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[120px] sm:w-[120px]">
        <Image height={400}
        width={400}
          alt="products"
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover select-none"
          loading="lazy"
          src={product.imageUrl}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <Card.Header className="gap-1">
          <Card.Title className="pr-8 text-red-400">{product.productName}!</Card.Title>
          <Card.Description>
            {product.description}
          </Card.Description>
          <CloseButton aria-label="Close banner" className="absolute top-3 right-3" />
        </Card.Header>
        <Card.Footer className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{product.price}</span>
            <span className=" text-gray-900 text-2xl">{product.departureDate}.</span>
          </div>
         <div>

            <Link href={`/products/${product._id}`}>
             <Button className="w-full sm:w-auto">View Details</Button>
             </Link>
         </div>

        </Card.Footer>
      </div>
    </Card>
        </div>
    );
};

export default ProductCard;