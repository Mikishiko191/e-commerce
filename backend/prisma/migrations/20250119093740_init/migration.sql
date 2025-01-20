-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrls" TEXT[],
    "color" TEXT,
    "stock" INTEGER,
    "category" TEXT,
    "slug" TEXT,
    "tags" TEXT[],
    "isAvailable" BOOLEAN NOT NULL,
    "viewCount" INTEGER,
    "shippingCost" DOUBLE PRECISION,
    "shippingTime" TEXT,
    "averageRating" DOUBLE PRECISION,
    "discountPrice" DOUBLE PRECISION,
    "discountPercentage" DOUBLE PRECISION,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
