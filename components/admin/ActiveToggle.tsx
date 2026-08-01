"use client";

import { useTransition } from "react";
import { toggleProductActive } from "@/lib/actions/products";

export default function ActiveToggle({
  productId,
  isActive,
}: {
  productId: string;
  isActive: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      await toggleProductActive(productId, !isActive);
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`text-xs font-medium px-2.5 py-1 border transition-colors duration-150 disabled:opacity-50 ${
        isActive ? "border-line text-graphite" : "border-line text-stone"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </button>
  );
}
