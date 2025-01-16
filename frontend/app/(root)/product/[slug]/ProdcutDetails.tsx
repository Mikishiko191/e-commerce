'use client';

import Image from 'next/image';

const policies = [
  {
    name: 'Free delivery all year long',
    description:
      'Name another place that offers year long free delivery? We’ll be waiting. Order now and you’ll get delivery absolutely free.',
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce/icons/icon-delivery-light.svg',
  },
  {
    name: '24/7 Customer Support',
    description:
      'Or so we want you to believe. In reality our chat widget is powered by a naive series of if/else statements that churn out canned responses. Guaranteed to irritate.',
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce/icons/icon-chat-light.svg',
  },
  {
    name: 'Fast Shopping Cart',
    description:
      "Look at the cart in that icon, there's never been a faster cart. What does this mean for the actual checkout experience? I don't know.",
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce/icons/icon-fast-checkout-light.svg',
  },
  {
    name: 'Gift Cards',
    description:
      "We sell these hoping that you will buy them for your friends and they will never actually use it. Free money for us, it's great.",
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce/icons/icon-gift-card-light.svg',
  },
];

export const ProductDetails = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
      {/* Details section */}
      <section aria-labelledby="details-heading">
        <div className="flex flex-col items-center text-center">
          <h2
            id="details-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            The Fine Details
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-gray-600">
            Our patented padded snack sleeve construction protects your favorite
            treats from getting smooshed during all-day adventures, long shifts
            at work, and tough travel schedules.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
          <div>
            <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
              <Image
                alt="Drawstring top with elastic loop closure and textured interior padding."
                src="https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg"
                className="h-full w-full object-cover object-center"
                fill
                priority
              />
            </div>
            <p className="mt-8 text-base text-gray-500">
              The 20L model has enough space for 370 candy bars, 6 cylinders of
              chips, 1,220 standard gumballs, or any combination of on-the-go
              treats that your heart desires. Yes, we did the math.
            </p>
          </div>
          <div>
            <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
              <Image
                alt="Front zipper pouch with included key ring."
                src="https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-02.jpg"
                className="h-full w-full object-cover object-center"
                fill
                priority
              />
            </div>
            <p className="mt-8 text-base text-gray-500">
              Up your snack organization game with multiple compartment options.
              The quick-access stash pouch is ready for even the most unexpected
              snack attacks and sharing needs.
            </p>
          </div>
        </div>
      </section>

      {/* Policies section */}
      <section aria-labelledby="policy-heading" className="mt-16 lg:mt-48">
        <h2 id="policy-heading" className="sr-only">
          Our policies
        </h2>
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {policies.map((policy) => (
            <div key={policy.name} className="relative">
              <Image
                alt=""
                src={policy.imageSrc}
                className="absolute h-32 -top-32"
                width={128}
                height={96}
              />
              <h3 className="mt-6 text-base font-medium text-gray-900">
                {policy.name}
              </h3>
              <p className="mt-3 text-base text-gray-500">
                {policy.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
