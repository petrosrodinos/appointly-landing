"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import ImageModal from "./image-modal";
import type { Document } from "@/features/documents/interfaces/documents.interfaces";

interface AccountImageGalleryProps {
  images: Document[];
  providerTitle: string;
}

const AccountImageGallery = ({ images, providerTitle }: AccountImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const modalImages = images.map((image) => ({
    url: image.url,
    alt: `${providerTitle}`,
  }));

  return (
    <section className="py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <Card key={image.uuid} className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-slate-900">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={image.url} alt={`${providerTitle} portfolio image`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white text-slate-900 shadow-lg border-0 p-2 rounded-full" onClick={() => handleImageClick(index)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ImageModal images={modalImages} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialIndex={selectedImageIndex} />
    </section>
  );
};

export default AccountImageGallery;
