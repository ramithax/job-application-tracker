"use client"
import Image from "next/image";
import { useState } from "react";
import { Button } from "./button";

export default function ImageTabs() {

    const [image, setImage] = useState("organize")

    return (

        <section className="border-t bg-white py-16">
            <div className="container mx-auto px-4 ">
                <div className="mx-auto max-w-6xl">

                    <div className="flex gap-2 justify-center mb-8 ">
                        <Button onClick={() => {
                            setImage("organize")
                        }}
                            className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${image === "organize"
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}>Organize Application</Button>

                        <Button onClick={() => {
                            setImage("hired")
                        }}
                            className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${image === "hired"
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}>Get Hired</Button>

                        <Button onClick={() => {
                            setImage("boards")
                        }}
                            className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${image === "boards"
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}>Manage Boards</Button>

                    </div>
                    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">

                        {
                            image === "organize" &&
                            <Image src="/hero-section/hero1.png" alt="organize" width={1200} height={800} />
                        }

                        {
                            image === "hired" &&
                            <Image src="/hero-section/hero2.png" alt="hired" width={1200} height={800} />
                        }

                        {
                            image === "boards" &&
                            <Image src="/hero-section/hero3.png" alt="boards" width={1200} height={800} />
                        }

                    </div>
                </div>
            </div>
        </section>

    )

}