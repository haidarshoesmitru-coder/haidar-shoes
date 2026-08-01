"use client";

import { useTransition } from "react";
import { deleteProduct } from "@/lib/actions/products";

export default function DeleteProductButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${productName}"? This also removes its images. This cannot be undone.`)) {
      return;
    }
    startTransition(async () => {
      await deleteProduct(productId);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-sm text-clay hover:opacity-70 underline disabled:opacity-50"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
