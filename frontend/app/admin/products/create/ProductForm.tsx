'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Radio,
  RadioGroup,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const product = {
  name: 'Zip Tote Basket',
  price: '$140',
  rating: 4,
  images: [
    {
      id: 1,
      name: 'Angled view',
      src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-03-product-01.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    {
      id: 2,
      name: 'Angled view',
      src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-03-product-02.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    {
      id: 3,
      name: 'Angled view',
      src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-03-product-03.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    {
      id: 4,
      name: 'Angled view',
      src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-03-product-04.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
  ],
  colors: [
    {
      name: 'Washed Black',
      bgColor: 'bg-gray-700',
      selectedColor: 'ring-gray-700',
    },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    {
      name: 'Washed Gray',
      bgColor: 'bg-gray-500',
      selectedColor: 'ring-gray-500',
    },
  ],
  description: `
      <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    `,
  details: [
    {
      name: 'Features',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
    {
      name: 'Care',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
    {
      name: 'Shipping',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
    {
      name: 'Returns',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
  ],
};

export const ProductForm = () => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  return (
    <div className="bg-gray-50">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <TabGroup className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabList className="grid grid-cols-4 gap-6">
                  {product.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      <span className="sr-only">{image.name}</span>
                      <span className="absolute inset-0 overflow-hidden rounded-md">
                        <Image
                          alt=""
                          src={image.src}
                          className="h-full w-full object-cover object-center"
                          fill
                          priority
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-indigo-500"
                      />
                    </Tab>
                  ))}
                </TabList>
              </div>

              <TabPanels className="aspect-h-1 aspect-w-1 w-full">
                {product.images.map((image) => (
                  <TabPanel key={image.id}>
                    <Image
                      alt={image.alt}
                      src={image.src}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                      fill
                      priority
                    />
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {product.price}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  className="space-y-6 text-base text-gray-700"
                />
              </div>

              <form className="mt-6">
                {/* Colors */}
                <div>
                  <h3 className="text-sm text-gray-600">Color</h3>

                  <fieldset aria-label="Choose a color" className="mt-2">
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="flex items-center space-x-3"
                    >
                      {product.colors.map((color) => (
                        <Radio
                          key={color.name}
                          value={color}
                          aria-label={color.name}
                          className={cn(
                            color.selectedColor,
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1',
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              color.bgColor,
                              'h-8 w-8 rounded-full border border-black border-opacity-10',
                            )}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  {product.details.map((detail) => (
                    <Disclosure key={detail.name} as="div">
                      <h3>
                        <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                          <span className="text-sm font-medium text-gray-900 group-data-[open]:text-indigo-600">
                            {detail.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="block h-6 w-6 text-gray-400 group-hover:text-gray-500 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="hidden h-6 w-6 text-indigo-400 group-hover:text-indigo-500 group-data-[open]:block"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="prose prose-sm pb-6">
                        <ul role="list">
                          {detail.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
