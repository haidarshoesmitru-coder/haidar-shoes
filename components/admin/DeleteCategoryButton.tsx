"use client";

import { useTransition } from "react";
import { deleteCategory } from "@/lib/actions/categories";

export default function DeleteCategoryButton({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${categoryName}"? Products in this category will become uncategorized.`)) {
      return;
    }
    startTransition(async () => {
      await deleteCategory(categoryId);
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
