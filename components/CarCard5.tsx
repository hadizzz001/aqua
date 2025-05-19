"use client";

import { useState } from "react";
import { TempProps } from "../types";

interface CarCardProps {
    temp: TempProps;
}

const CarCard5 = ({ temp }: CarCardProps) => {
    const { _id, title, price, discount, img, category, stock,type, color } = temp;
    const [isTouched, setIsTouched] = useState(false);

    const handleTouchStart = () => {
        setIsTouched(true);
    };

    const handleTouchEnd = () => {
        setTimeout(() => setIsTouched(false), 2000); // Reset after 2s
    };

    return (
        <a href={`/product?id=${_id}`}>
            <div className="br_grid br_grid-cols-1 supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid]">
                <div className="Layout br_contents">
                    <center>
                        <span className="br_contents br_edition-">
                            <div className="">
                                <div className="initial:br_row-span-1 br_col-start-1 br_row-start-1 br_relative">
                                    <div className="br_aspect-[1/1] sm:br_aspect-square">
                                        <div
                                        >

                                                <img className="absolute w-full h-full object-cover group-hover:opacity-0"
                                                    src={img[0]} alt="Default" />

                                                {(
                                                    // Check if single product and stock is 0
                                                    (type === 'single' && parseInt(stock) === 0) ||
                                                    // Or if collection and all colors qty are 0
                                                    (type === 'collection' && color?.every(color => parseInt(color.qty) === 0))
                                                ) && (
                                                        <div className="absolute inset-0 bg-gray-600 bg-opacity-70 text-white flex items-center justify-center text-lg font-bold z-10">
                                                            Out of Stock
                                                        </div>
                                                    )}
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-2 text-left initial:br_row-span-1 br_col-start-1 br_row-start-2 br_px-3 group-[.centered]/tile:br_justify-center group-[.centered]/tile:br_text-center">
                                    <h3 style={{ height: "100px" }} className="br_text-base-sans-spaced br_line-clamp-2 sm:br_line-clamp-none edition:br_text-grey-500 edition:br_hidden first:edition:br_inline edition:before:br_content-['_–_'] apex:edition:br_text-grey-300">
                                        <a href={`/product?id=${_id}`} className="br_text-current br_no-underline">
                                            <h2 className="text-sm font-bold myGray py-1">{title}</h2>
                                            <div className="flex items-center">
                                                <span className="font-light text-[13px] py-1 line-through text-gray-400">
                                                    ${parseFloat(price).toFixed(2)}
                                                </span>
                                                <span className="font-light text-[13px] py-1 rounded myRed ml-2">
                                                    ${parseFloat(discount).toFixed(2)}
                                                    <span className="ml-1 text-xs">
                                                        {Math.round(((price - discount) / price) * 100)}% off
                                                    </span>
                                                </span>
                                            </div>

                                        </a>
                                    </h3>
                                </div>
                            </div>
                        </span>
                    </center>
                </div>
            </div>
        </a>
    );
};

export default CarCard5;
